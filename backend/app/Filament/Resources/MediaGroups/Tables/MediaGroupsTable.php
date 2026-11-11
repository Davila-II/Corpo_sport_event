<?php

namespace App\Filament\Resources\MediaGroups\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class MediaGroupsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('cover_image')
                    ->label('Couverture')
                    ->disk('public'),
                TextColumn::make('title')
                    ->label('Titre')
                    ->getStateUsing(fn ($record) => $record->localized('title', 'fr'))
                    ->searchable(query: fn (Builder $query, string $search): Builder => $query
                        ->where('title->fr', 'like', "%{$search}%")),
                TextColumn::make('category')
                    ->label('Catégorie')
                    ->badge(),
                TextColumn::make('period_label')
                    ->label('Période'),
                TextColumn::make('layout')
                    ->label('Taille')
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'large' => 'Grande',
                        'medium' => 'Moyenne',
                        'tall' => 'Haute',
                        default => $state,
                    }),
                TextColumn::make('items_count')
                    ->label('Photos')
                    ->counts('items'),
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
