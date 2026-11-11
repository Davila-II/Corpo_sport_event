<?php

namespace App\Filament\Resources\Events\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class EventsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('cover_image')
                    ->label('Image')
                    ->disk('public'),
                TextColumn::make('title')
                    ->label('Titre')
                    // "title" est un tableau FR/EN : on affiche la version française
                    ->getStateUsing(fn ($record) => $record->localized('title', 'fr'))
                    ->searchable(query: fn (Builder $query, string $search): Builder => $query
                        ->where('title->fr', 'like', "%{$search}%")),
                TextColumn::make('category')
                    ->label('Catégorie')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'football' => 'Football',
                        'basketball' => 'Basketball',
                        'futsal' => 'Futsal',
                        'culture' => 'Culture',
                        default => $state,
                    }),
                TextColumn::make('status')
                    ->label('Statut')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'ongoing' => 'En cours',
                        'upcoming' => 'Non débuté',
                        'finished' => 'Terminé',
                        default => $state,
                    })
                    ->color(fn (string $state): string => match ($state) {
                        'ongoing' => 'success',
                        'upcoming' => 'info',
                        'finished' => 'gray',
                        default => 'gray',
                    }),
                TextColumn::make('city')
                    ->label('Ville'),
                TextColumn::make('period_label')
                    ->label('Période'),
                IconColumn::make('show_on_home')
                    ->label('Accueil')
                    ->boolean(),
                IconColumn::make('is_published')
                    ->label('Publié')
                    ->boolean(),
            ])
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->filters([
                SelectFilter::make('category')
                    ->label('Catégorie')
                    ->options([
                        'football' => 'Football',
                        'basketball' => 'Basketball',
                        'futsal' => 'Futsal',
                        'culture' => 'Culture',
                    ]),
                SelectFilter::make('status')
                    ->label('Statut')
                    ->options([
                        'ongoing' => 'En cours',
                        'upcoming' => 'Non débuté',
                        'finished' => 'Terminé',
                    ]),
            ])
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
