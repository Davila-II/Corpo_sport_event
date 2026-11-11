<?php

namespace App\Filament\Resources\MediaGroups\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;

class MediaGroupForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Titre')
                    ->columnSpanFull()
                    ->schema([
                        Tabs::make('Langues')
                            ->tabs([
                                Tab::make('Français')
                                    ->schema([
                                        TextInput::make('title.fr')
                                            ->label('Titre')
                                            ->required()
                                            ->maxLength(255),
                                    ]),
                                Tab::make('English')
                                    ->schema([
                                        TextInput::make('title.en')
                                            ->label('Title')
                                            ->maxLength(255),
                                    ]),
                            ]),
                    ]),

                Section::make('Informations')
                    ->columnSpanFull()
                    ->columns(2)
                    ->schema([
                        TextInput::make('category')
                            ->label('Catégorie (ex : Corpo Foot, VECUP)')
                            ->maxLength(100),
                        TextInput::make('period_label')
                            ->label('Période (ex : 2011–2012)')
                            ->maxLength(100),
                        Select::make('layout')
                            ->label('Taille dans la grille de la médiathèque')
                            ->options([
                                'large' => 'Grande',
                                'medium' => 'Moyenne',
                                'tall' => 'Haute',
                            ])
                            ->default('medium')
                            ->required(),
                        TextInput::make('sort_order')
                            ->label('Ordre d\'affichage')
                            ->numeric()
                            ->default(0),
                        FileUpload::make('cover_image')
                            ->label('Image de couverture')
                            ->image()
                            ->disk('public')
                            ->directory('media-groups')
                            ->visibility('public')
                            ->columnSpanFull(),
                        Toggle::make('is_published')
                            ->label('Publié')
                            ->default(true),
                    ]),

                Section::make('Photos du groupe')
                    ->columnSpanFull()
                    ->schema([
                        Repeater::make('items')
                            ->relationship('items')
                            ->label('Photos')
                            ->orderColumn('sort_order')
                            ->addActionLabel('Ajouter une photo')
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['caption']['fr'] ?? 'Photo')
                            ->schema([
                                FileUpload::make('image')
                                    ->label('Photo')
                                    ->image()
                                    ->required()
                                    ->disk('public')
                                    ->directory('media-items')
                                    ->visibility('public')
                                    ->columnSpanFull(),
                                TextInput::make('caption.fr')
                                    ->label('Légende (FR)')
                                    ->maxLength(255),
                                TextInput::make('caption.en')
                                    ->label('Caption (EN)')
                                    ->maxLength(255),
                            ])
                            ->columns(2),
                    ]),
            ]);
    }
}
