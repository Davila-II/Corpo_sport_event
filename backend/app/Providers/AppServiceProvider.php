<?php

namespace App\Providers;

use Filament\Forms\Components\FileUpload;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (app()->environment('production')) {
            URL::forceScheme('https');
        }

        // Enregistrement des images envoyées depuis l'admin (tous les champs FileUpload).
        // Même résultat que Filament par défaut, mais explicite et avec des traces
        // dans storage/logs/laravel.log pour voir la taille à chaque étape.
        FileUpload::configureUsing(function (FileUpload $component): void {
            $component->saveUploadedFileUsing(function (FileUpload $component, TemporaryUploadedFile $file): ?string {
                $diskName = $component->getDiskName();
                $path = trim($component->getDirectory() . '/' . $component->getUploadedFileNameForStorage($file), '/');
                $source = $file->getRealPath();
                $sourceSize = is_file($source) ? filesize($source) : null;
                $options = ['visibility' => $component->getVisibility()];

                if (is_file($source)) {
                    $stream = fopen($source, 'rb');

                    try {
                        Storage::disk($diskName)->put($path, $stream, $options);
                    } finally {
                        if (is_resource($stream)) {
                            fclose($stream);
                        }
                    }
                } else {
                    // Fichier temporaire qui n'est pas sur le disque local
                    Storage::disk($diskName)->put($path, $file->get(), $options);
                }

                Log::info('Upload admin', [
                    'disque' => $diskName,
                    'chemin' => $path,
                    'taille_source' => $sourceSize,
                    'taille_destination' => Storage::disk($diskName)->size($path),
                ]);

                return $path;
            });
        });

        // Page de test, uniquement sur ton ordinateur (jamais en ligne)
        if (app()->environment('local')) {
            Route::get('/diag-upload', function () {
                $disk = Storage::disk(config('filesystems.default'));
                $tmp = tempnam(sys_get_temp_dir(), 'diag');
                file_put_contents($tmp, random_bytes(300000));

                $stream = fopen($tmp, 'rb');
                $disk->put('diag/web.jpg', $stream);
                fclose($stream);

                $result = [
                    'taille_source' => filesize($tmp),
                    'taille_sur_le_disque' => $disk->size('diag/web.jpg'),
                    'sapi' => PHP_SAPI,
                ];

                $disk->delete('diag/web.jpg');
                unlink($tmp);

                return response()->json($result);
            });
        }
    }
}
