<?php

namespace App\Filament\Resources\Partners\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class PartnerForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Partenaire')
                    ->columnSpanFull()
                    ->columns(2)
                    ->schema([
                        TextInput::make('name')
                            ->label('Nom')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('sort_order')
                            ->label('Ordre d\'affichage')
                            ->numeric()
                            ->default(0),
                        FileUpload::make('logo')
                            ->label('Logo (optionnel : sans logo, le nom s\'affiche en texte)')
                            ->image()
                            ->disk('public')
                            ->directory('partners')
                            ->visibility('public')
                            ->columnSpanFull(),
                        Toggle::make('is_published')
                            ->label('Publié')
                            ->default(true),
                    ]),
            ]);
    }
}
