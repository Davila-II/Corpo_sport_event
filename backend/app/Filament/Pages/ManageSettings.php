<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use BackedEnum;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class ManageSettings extends Page
{
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCog6Tooth;

    protected static ?string $navigationLabel = 'Réglages du site';

    protected static ?string $title = 'Réglages du site';

    protected static ?int $navigationSort = 8;

    // Le fichier Blade qui affiche cette page
    protected string $view = 'filament.pages.manage-settings';

    // Contient les valeurs du formulaire
    public ?array $data = [];

    // Les réglages gérés par cette page (clés de la table "settings")
    private const KEYS = ['stats', 'impact', 'president', 'goals', 'values', 'contact', 'site'];

    // Au chargement : on remplit le formulaire avec ce qui est en base
    public function mount(): void
    {
        $data = [];

        foreach (self::KEYS as $key) {
            $data[$key] = Setting::get($key, []);
        }

        $this->form->fill($data);
    }

    // Bouton "Enregistrer"
    public function save(): void
    {
        $state = $this->form->getState();

        foreach (self::KEYS as $key) {
            $value = $state[$key] ?? [];

            // Les listes doivent être enregistrées sans clés techniques
            if (in_array($key, ['stats', 'values'], true)) {
                $value = array_values($value);
            }

            if ($key === 'impact') {
                $value['pillars'] = array_values($value['pillars'] ?? []);
            }

            Setting::set($key, $value);
        }

        Notification::make()
            ->title('Réglages enregistrés')
            ->success()
            ->send();
    }

    // Deux champs côte à côte : français et anglais
    private static function bi(string $name, string $label, bool $textarea = false, int $rows = 3): Grid
    {
        $make = function (string $lang) use ($name, $label, $textarea, $rows) {
            $full = $label . ' (' . strtoupper($lang) . ')';

            return $textarea
                ? Textarea::make("{$name}.{$lang}")->label($full)->rows($rows)
                : TextInput::make("{$name}.{$lang}")->label($full)->maxLength(255);
        };

        return Grid::make(2)->schema([$make('fr'), $make('en')]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Réglages')
                    ->columnSpanFull()
                    ->tabs([
                        Tab::make('Accueil')->schema($this->homeTab()),
                        Tab::make('À propos')->schema($this->aboutTab()),
                        Tab::make('Contact et pied de page')->schema($this->contactTab()),
                    ]),
            ])
            ->statePath('data');
    }

    private function homeTab(): array
    {
        return [
            Section::make('Chiffres clés (sous le carrousel)')
                ->schema([
                    Repeater::make('stats')
                        ->label('Chiffres')
                        ->addActionLabel('Ajouter un chiffre')
                        ->maxItems(6)
                        ->itemLabel(fn (array $state): ?string => $state['value'] ?? null)
                        ->schema([
                            TextInput::make('value')
                                ->label('Valeur (ex : 14 ou 1 500+)')
                                ->required()
                                ->maxLength(30),
                            self::bi('label', 'Intitulé'),
                        ]),
                ]),

            Section::make('Bloc « Notre impact »')
                ->schema([
                    self::bi('impact.eyebrow', 'Petit texte'),
                    self::bi('impact.title_white', 'Titre, ligne blanche'),
                    self::bi('impact.title_blue', 'Titre, ligne bleue'),
                    self::bi('impact.text', 'Texte', true, 3),
                    Repeater::make('impact.pillars')
                        ->label('Les 3 piliers')
                        ->addActionLabel('Ajouter un pilier')
                        ->maxItems(5)
                        ->itemLabel(fn (array $state): ?string => $state['fr'] ?? null)
                        ->schema([
                            Grid::make(2)->schema([
                                TextInput::make('fr')->label('Français')->maxLength(100),
                                TextInput::make('en')->label('English')->maxLength(100),
                            ]),
                        ]),
                    FileUpload::make('impact.image')
                        ->label('Image du bloc')
                        ->image()
                        ->disk('public')
                        ->directory('settings')
                        ->visibility('public'),
                ]),
        ];
    }

    private function aboutTab(): array
    {
        return [
            Section::make('Mot du président')
                ->schema([
                    TextInput::make('president.name')
                        ->label('Nom')
                        ->maxLength(255),
                    self::bi('president.role', 'Fonction'),
                    self::bi('president.title_white', 'Titre, ligne marine'),
                    self::bi('president.title_blue', 'Titre, ligne bleue'),
                    self::bi('president.text', 'Texte', true, 8),
                    FileUpload::make('president.photo')
                        ->label('Photo du président')
                        ->image()
                        ->disk('public')
                        ->directory('settings')
                        ->visibility('public'),
                ]),

            Section::make('Ambition, mission et objectif')
                ->schema([
                    self::bi('goals.ambition', 'Ambition', true, 3),
                    self::bi('goals.mission', 'Mission', true, 3),
                    self::bi('goals.objective', 'Objectif', true, 3),
                ]),

            Section::make('Nos valeurs')
                ->schema([
                    Repeater::make('values')
                        ->label('Valeurs')
                        ->addActionLabel('Ajouter une valeur')
                        ->maxItems(8)
                        ->itemLabel(fn (array $state): ?string => $state['title']['fr'] ?? null)
                        ->schema([
                            self::bi('title', 'Titre'),
                            self::bi('text', 'Texte', true, 2),
                        ]),
                ]),
        ];
    }

    private function contactTab(): array
    {
        return [
            Section::make('Coordonnées (page Contact)')
                ->schema([
                    TextInput::make('contact.company')
                        ->label('Nom de la structure')
                        ->maxLength(255),
                    TagsInput::make('contact.phones')
                        ->label('Téléphones (Entrée pour en ajouter un)'),
                    TextInput::make('contact.email')
                        ->label('Email')
                        ->email(),
                    TextInput::make('contact.whatsapp')
                        ->label('WhatsApp'),
                    TextInput::make('contact.facebook_label')
                        ->label('Facebook, nom affiché'),
                    TextInput::make('contact.facebook_url')
                        ->label('Facebook, lien de la page')
                        ->url(),
                    self::bi('contact.location', 'Implantation'),
                ]),

            Section::make('Pied de page')
                ->schema([
                    TextInput::make('site.name')
                        ->label('Nom du site')
                        ->maxLength(255),
                    self::bi('site.tagline', 'Slogan'),
                    TagsInput::make('site.cities')
                        ->label('Villes (Entrée pour en ajouter une)'),
                    self::bi('site.membership', 'Mention d\'appartenance'),
                    TextInput::make('site.legal')
                        ->label('Mention légale (en bas à droite)')
                        ->maxLength(255),
                ]),
        ];
    }
}
