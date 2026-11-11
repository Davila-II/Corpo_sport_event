<?php

namespace App\Filament\Resources\MediaGroups;

use App\Filament\Resources\MediaGroups\Pages\CreateMediaGroup;
use App\Filament\Resources\MediaGroups\Pages\EditMediaGroup;
use App\Filament\Resources\MediaGroups\Pages\ListMediaGroups;
use App\Filament\Resources\MediaGroups\Schemas\MediaGroupForm;
use App\Filament\Resources\MediaGroups\Tables\MediaGroupsTable;
use App\Models\MediaGroup;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class MediaGroupResource extends Resource
{
    protected static ?string $model = MediaGroup::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedPhoto;

    protected static ?string $recordTitleAttribute = 'category';

    protected static ?string $modelLabel = 'galerie photos';

    protected static ?string $pluralModelLabel = 'galeries photos';

    protected static ?string $navigationLabel = 'Galeries photos';

    protected static ?int $navigationSort = 3;

    public static function form(Schema $schema): Schema
    {
        return MediaGroupForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return MediaGroupsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListMediaGroups::route('/'),
            'create' => CreateMediaGroup::route('/create'),
            'edit' => EditMediaGroup::route('/{record}/edit'),
        ];
    }
}
