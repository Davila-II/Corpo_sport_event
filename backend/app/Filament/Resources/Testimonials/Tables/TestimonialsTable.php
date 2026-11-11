<?php

namespace App\Filament\Resources\Testimonials\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class TestimonialsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('quote')
                    ->label('Témoignage')
                    ->getStateUsing(fn ($record) => Str::limit($record->localized('quote', 'fr') ?? '', 80)),
                TextColumn::make('author_role')
                    ->label('Auteur')
                    ->getStateUsing(fn ($record) => $record->localized('author_role', 'fr')),
                IconColumn::make('is_published')
                    ->label('Publié')
                    ->boolean(),
            ])
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
