<?php

namespace App\Console\Commands;

use App\Models\Event;
use App\Models\MediaGroup;
use App\Models\Service;
use App\Models\Slide;
use Illuminate\Console\Command;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImportCorpoImages extends Command
{
    protected $signature = 'corpo:import-images {--force : Remplace aussi les images déjà enregistrées}';

    protected $description = 'Importe les images de frontend/public dans l\'admin (slides, événements, services, galeries)';

    private string $source = '';

    public function handle(): int
    {
        $this->source = realpath(base_path('../frontend/public')) ?: '';

        if ($this->source === '' || ! is_dir($this->source)) {
            $this->error('Dossier introuvable : frontend/public (à côté du dossier backend).');

            return self::FAILURE;
        }

        $this->importSlides();
        $this->importEvents();
        $this->importServices();
        $this->importGroups();

        $this->info('Terminé.');

        return self::SUCCESS;
    }

    // Copie un fichier de frontend/public vers le stockage public de Laravel.
    // Renvoie le chemin enregistré (ex : "slides/accueil-1.jpg") ou null.
    // $suffix permet de donner à chaque contenu sa propre copie du fichier.
    private function store(string $relative, string $directory, ?string $suffix = null): ?string
    {
        $path = $this->source . '/' . $relative;

        if (! is_file($path)) {
            $this->warn("  Fichier absent : {$relative}");

            return null;
        }

        $info = pathinfo($relative);
        $name = Str::slug($info['filename'])
            . ($suffix ? '-' . $suffix : '')
            . '.' . strtolower($info['extension'] ?? 'jpg');

        return Storage::disk('public')->putFileAs($directory, new File($path), $name) ?: null;
    }

    // Faut-il mettre à jour ce champ ? Oui s'il est vide, ou avec --force.
    private function shouldSet(?string $current): bool
    {
        return blank($current) || $this->option('force');
    }

    private function importSlides(): void
    {
        $this->line('Slides du carrousel');

        $files = ['accueil-1.jpg', 'accueil-2.jpg', 'accueil-3.png'];
        $slides = Slide::orderBy('sort_order')->orderBy('id')->get();

        foreach ($slides as $i => $slide) {
            if (! isset($files[$i]) || ! $this->shouldSet($slide->image)) {
                continue;
            }

            if ($path = $this->store($files[$i], 'slides')) {
                $slide->update(['image' => $path]);
                $this->line("  Slide {$slide->id} <- {$files[$i]}");
            }
        }
    }

    private function importEvents(): void
    {
        $this->line('Événements');

        $files = [
            'corpo-basket' => 'accueil-1.jpg',
            'corpo-foot' => 'accueil-2.jpg',
            'veterans-champions-cup' => 'accueil-4.jpeg',
        ];

        foreach ($files as $slug => $file) {
            $event = Event::where('slug', $slug)->first();

            if (! $event || ! $this->shouldSet($event->cover_image)) {
                continue;
            }

            if ($path = $this->store($file, 'events')) {
                $event->update(['cover_image' => $path]);
                $this->line("  {$slug} <- {$file}");
            }
        }
    }

    private function importServices(): void
    {
        $this->line('Services (domaines d\'activités)');

        // Même correspondance que le secours de Services.jsx :
        // 1er service = accueil-1, 2e = accueil-2, 3e = accueil-3.png, 4e = accueil-4.jpeg, puis on recommence
        $files = ['accueil-1.jpg', 'accueil-2.jpg', 'accueil-3.png', 'accueil-4.jpeg'];
        $services = Service::orderBy('sort_order')->orderBy('id')->get();

        foreach ($services as $i => $service) {
            if (! $this->shouldSet($service->image)) {
                continue;
            }

            $file = $files[$i % count($files)];
            $title = $service->localized('title', 'fr');

            if ($path = $this->store($file, 'services', 'service-' . $service->id)) {
                $service->update(['image' => $path]);
                $this->line("  {$title} <- {$file}");
            }
        }
    }

    private function importGroups(): void
    {
        $this->line('Galeries photos');

        // Les fichiers de mediatheque/, indexés par nom en minuscules
        $files = collect(glob($this->source . '/mediatheque/*.*') ?: [])
            ->keyBy(fn ($path) => Str::lower(pathinfo($path, PATHINFO_FILENAME)));

        foreach (MediaGroup::all() as $group) {
            $title = Str::lower((string) $group->localized('title', 'fr'));
            $file = $files->get($title);

            if (! $file) {
                $this->warn("  Aucune image trouvée pour « {$title} »");

                continue;
            }

            if (! $this->shouldSet($group->cover_image)) {
                continue;
            }

            if ($path = $this->store('mediatheque/' . basename($file), 'media-groups')) {
                $group->update(['cover_image' => $path]);
                $this->line("  {$title} <- " . basename($file));
            }
        }
    }
}
