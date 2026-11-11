<?php

namespace App\Filament\Resources\Testimonials\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;

class TestimonialForm
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
                                        Textarea::make('quote.fr')
                                            ->label('Témoignage')
                                            ->required()
                                            ->rows(4),
                                        TextInput::make('author_role.fr')
                                            ->label('Auteur / fonction (ex : Responsable des ressources humaines — Entreprise partenaire)')
                                            ->required()
                                            ->maxLength(255),
                                    ]),
                                Tab::make('English')
                                    ->schema([
                                        Textarea::make('quote.en')
                                            ->label('Testimonial')
                                            ->rows(4),
                                        TextInput::make('author_role.en')
                                            ->label('Author / role')
                                            ->maxLength(255),
                                    ]),
                            ]),
                    ]),

                Section::make('Affichage')
                    ->columnSpanFull()
                    ->columns(2)
                    ->schema([
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
