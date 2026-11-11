<?php

namespace App\Filament\Resources\Services\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;

class ServiceForm
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
                                            ->maxLength(255),
                                        Textarea::make('description.fr')
                                            ->label('Description')
                                            ->rows(4),
                                        Textarea::make('bullets.fr')
                                            ->label('Puces (une par ligne)')
                                            ->rows(4),
                                    ]),
                                Tab::make('English')
                                    ->schema([
                                        TextInput::make('title.en')
                                            ->label('Title')
                                            ->maxLength(255),
                                        Textarea::make('description.en')
                                            ->label('Description')
                                            ->rows(4),
                                        Textarea::make('bullets.en')
                                            ->label('Bullet points (one per line)')
                                            ->rows(4),
                                    ]),
                            ]),
                    ]),

                Section::make('Image et affichage')
                    ->columnSpanFull()
                    ->columns(2)
                    ->schema([
                        FileUpload::make('image')
                            ->label('Image')
                            ->image()
                            ->disk('public')
                            ->directory('services')
                            ->visibility('public')
                            ->columnSpanFull(),
                        TextInput::make('sort_order')
                            ->label('Ordre d\'affichage')
                            ->numeric()
                            ->default(0),
                        Toggle::make('is_published')
                            ->label('Publié')
                            ->default(true),
                    ]),
            ]);
    }
}
