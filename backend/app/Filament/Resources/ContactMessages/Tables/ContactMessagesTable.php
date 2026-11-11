<?php

namespace App\Filament\Resources\ContactMessages\Tables;

use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ContactMessagesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                IconColumn::make('read_at')
                    ->label('Lu')
                    ->boolean()
                    ->getStateUsing(fn ($record) => $record->read_at !== null),
                TextColumn::make('full_name')
                    ->label('Nom')
                    ->searchable(),
                TextColumn::make('company')
                    ->label('Entreprise'),
                TextColumn::make('email')
                    ->label('Email')
                    ->searchable(),
                TextColumn::make('phone')
                    ->label('Téléphone'),
                TextColumn::make('service_type')
                    ->label('Besoin')
                    ->badge(),
                TextColumn::make('created_at')
                    ->label('Reçu le')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                TernaryFilter::make('read')
                    ->label('Lu')
                    ->placeholder('Tous')
                    ->trueLabel('Lus')
                    ->falseLabel('Non lus')
                    ->queries(
                        true: fn (Builder $query) => $query->whereNotNull('read_at'),
                        false: fn (Builder $query) => $query->whereNull('read_at'),
                        blank: fn (Builder $query) => $query,
                    ),
            ])
            ->recordActions([
                EditAction::make()
                    ->label('Ouvrir'),
                Action::make('markRead')
                    ->label('Marquer comme lu')
                    ->icon(Heroicon::OutlinedCheck)
                    ->visible(fn ($record) => $record->read_at === null)
                    ->action(fn ($record) => $record->update(['read_at' => now()])),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
