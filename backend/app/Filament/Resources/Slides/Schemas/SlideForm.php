<?php

namespace App\Filament\Resources\Slides\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;

class SlideForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Texte du slide')
                    ->columnSpanFull()
                    ->schema([
                        Tabs::make('Langues')
                            ->tabs([
                                Tab::make('Français')
                                    ->schema([
                                        TextInput::make('eyebrow.fr')
                                            ->label('Petit texte au-dessus (ex : Compétitions interentreprises)')
                                            ->maxLength(120),
                                        TextInput::make('title_white.fr')
                                            ->label('Titre, ligne blanche (ex : Des équipes.)')
                                            ->required()
                                            ->maxLength(120),
                                        TextInput::make('title_blue.fr')
                                            ->label('Titre, ligne bleue en italique (ex : Une même passion.)')
                                            ->required()
                                            ->maxLength(120),
                                        Textarea::make('subtitle.fr')
                                            ->label('Sous-titre')
                                            ->rows(3),
                                    ]),
                                Tab::make('English')
                                    ->schema([
                                        TextInput::make('eyebrow.en')
                                            ->label('Small text above')
                                            ->maxLength(120),
                                        TextInput::make('title_white.en')
                                            ->label('Title, white line')
                                            ->maxLength(120),
                                        TextInput::make('title_blue.en')
                                            ->label('Title, blue italic line')
                                            ->maxLength(120),
                                        Textarea::make('subtitle.en')
                                            ->label('Subtitle')
                                            ->rows(3),
                                    ]),
                            ]),
                    ]),

                Section::make('Image et affichage')
                    ->columnSpanFull()
                    ->columns(2)
                    ->schema([
                        FileUpload::make('image')
                            ->label('Image de fond')
                            ->image()
                            ->disk('public')
                            ->directory('slides')
                            ->visibility('public')
                            ->columnSpanFull(),
                        TextInput::make('sort_order')
                            ->label('Ordre d\'affichage')
                            ->numeric()
                            ->default(0),
                        Toggle::make('is_active')
                            ->label('Actif')
                            ->default(true),
                    ]),
            ]);
    }
}
