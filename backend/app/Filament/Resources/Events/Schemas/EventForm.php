<?php

namespace App\Filament\Resources\Events\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class EventForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Contenu')
                    ->columnSpanFull()
                    ->schema([
                        Tabs::make('Langues')
                            ->tabs([
                                Tab::make('Français')
                                    ->schema([
                                        TextInput::make('title.fr')
                                            ->label('Titre')
                                            ->required()
                                            ->maxLength(255)
                                            ->live(onBlur: true)
                                            ->afterStateUpdated(function (Set $set, ?string $state, string $operation) {
                                                // Le slug se génère seulement à la création
                                                if ($operation === 'create') {
                                                    $set('slug', Str::slug($state ?? ''));
                                                }
                                            }),
                                        Textarea::make('description.fr')
                                            ->label('Description')
                                            ->rows(4),
                                        TextInput::make('edition_label.fr')
                                            ->label('Édition (ex : 9e édition)')
                                            ->maxLength(100),
                                    ]),
                                Tab::make('English')
                                    ->schema([
                                        TextInput::make('title.en')
                                            ->label('Title')
                                            ->maxLength(255),
                                        Textarea::make('description.en')
                                            ->label('Description')
                                            ->rows(4),
                                        TextInput::make('edition_label.en')
                                            ->label('Edition (e.g. 9th edition)')
                                            ->maxLength(100),
                                    ]),
                            ]),
                    ]),

                Section::make('Informations')
                    ->columnSpanFull()
                    ->columns(2)
                    ->schema([
                        TextInput::make('slug')
                            ->label('Identifiant dans l\'URL')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255),
                        Select::make('category')
                            ->label('Catégorie')
                            ->options([
                                'football' => 'Football',
                                'basketball' => 'Basketball',
                                'futsal' => 'Futsal',
                                'culture' => 'Culture',
                            ])
                            ->required(),
                        Select::make('status')
                            ->label('Statut')
                            ->options([
                                'ongoing' => 'En cours',
                                'upcoming' => 'Non débuté',
                                'finished' => 'Terminé',
                            ])
                            ->default('upcoming')
                            ->required(),
                        Select::make('city')
                            ->label('Ville')
                            ->options([
                                'Douala' => 'Douala',
                                'Yaoundé' => 'Yaoundé',
                                'National' => 'National',
                            ])
                            ->placeholder('Choisir une ville'),
                        TextInput::make('period_label')
                            ->label('Période (ex : Saison 2025)')
                            ->maxLength(100),
                        TextInput::make('sort_order')
                            ->label('Ordre d\'affichage')
                            ->numeric()
                            ->default(0),
                    ]),

                Section::make('Éditions répertoriées (page Événements et page de la compétition)')
                    ->columnSpanFull()
                    ->schema([
                        Repeater::make('editions')
                            ->label('Éditions')
                            ->addActionLabel('Ajouter une édition')
                            ->collapsible()
                            ->defaultItems(0)
                            ->itemLabel(fn (array $state): ?string => trim(
                                ($state['period'] ?? '') . ' — ' . ($state['title']['fr'] ?? '')
                            ))
                            ->columns(3)
                            ->schema([
                                TextInput::make('period')
                                    ->label('Année ou période (ex : 2018 ou 2022-23)')
                                    ->required()
                                    ->maxLength(30),
                                TextInput::make('title.fr')
                                    ->label('Intitulé (FR)')
                                    ->required()
                                    ->maxLength(255),
                                TextInput::make('title.en')
                                    ->label('Title (EN)')
                                    ->maxLength(255),
                            ]),
                    ]),

                Section::make('Page de la compétition')
                    ->columnSpanFull()
                    ->schema([
                        Repeater::make('distinctions')
                            ->label('Distinctions (carte à droite de la page)')
                            ->addActionLabel('Ajouter une distinction')
                            ->defaultItems(0)
                            ->maxItems(8)
                            ->itemLabel(fn (array $state): ?string => $state['fr'] ?? null)
                            ->columns(2)
                            ->schema([
                                TextInput::make('fr')
                                    ->label('Français')
                                    ->required()
                                    ->maxLength(120),
                                TextInput::make('en')
                                    ->label('English')
                                    ->maxLength(120),
                            ]),
                        FileUpload::make('dossier')
                            ->label('Dossier à télécharger (PDF, optionnel : sans fichier, le bouton télécharge la présentation générale)')
                            ->acceptedFileTypes(['application/pdf'])
                            ->disk('public')
                            ->directory('dossiers')
                            ->visibility('public'),
                    ]),

                Section::make('Image et publication')
                    ->columnSpanFull()
                    ->schema([
                        FileUpload::make('cover_image')
                            ->label('Image de couverture')
                            ->image()
                            ->disk('public')
                            ->directory('events')
                            ->visibility('public'),
                        Toggle::make('show_on_home')
                            ->label('Afficher sur la page d\'accueil')
                            ->default(true),
                        Toggle::make('is_published')
                            ->label('Publié')
                            ->default(true),
                    ]),
            ]);
    }
}
