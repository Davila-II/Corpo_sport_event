<?php

namespace App\Filament\Resources\ContactMessages\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ContactMessageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Message reçu')
                    ->columnSpanFull()
                    ->columns(2)
                    ->schema([
                        TextInput::make('full_name')
                            ->label('Nom complet')
                            ->disabled(),
                        TextInput::make('company')
                            ->label('Entreprise')
                            ->disabled(),
                        TextInput::make('email')
                            ->label('Email')
                            ->disabled(),
                        TextInput::make('phone')
                            ->label('Téléphone')
                            ->disabled(),
                        TextInput::make('service_type')
                            ->label('Type de besoin')
                            ->disabled()
                            ->columnSpanFull(),
                        Textarea::make('message')
                            ->label('Projet')
                            ->rows(8)
                            ->disabled()
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
