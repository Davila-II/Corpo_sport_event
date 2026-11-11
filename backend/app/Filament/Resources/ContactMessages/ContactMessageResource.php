<?php

namespace App\Filament\Resources\ContactMessages;

use App\Filament\Resources\ContactMessages\Pages\CreateContactMessage;
use App\Filament\Resources\ContactMessages\Pages\EditContactMessage;
use App\Filament\Resources\ContactMessages\Pages\ListContactMessages;
use App\Filament\Resources\ContactMessages\Schemas\ContactMessageForm;
use App\Filament\Resources\ContactMessages\Tables\ContactMessagesTable;
use App\Models\ContactMessage;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ContactMessageResource extends Resource
{
    protected static ?string $model = ContactMessage::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedEnvelope;

    protected static ?string $recordTitleAttribute = 'full_name';

    protected static ?string $modelLabel = 'message';

    protected static ?string $pluralModelLabel = 'messages reçus';

    protected static ?string $navigationLabel = 'Messages reçus';

    protected static ?int $navigationSort = 7;

    // Les messages viennent du site, on ne les crée pas à la main
    public static function canCreate(): bool
    {
        return false;
    }

    // Badge dans le menu : nombre de messages non lus
    public static function getNavigationBadge(): ?string
    {
        $count = static::getModel()::whereNull('read_at')->count();

        return $count > 0 ? (string) $count : null;
    }

    public static function form(Schema $schema): Schema
    {
        return ContactMessageForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ContactMessagesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListContactMessages::route('/'),
            'create' => CreateContactMessage::route('/create'),
            'edit' => EditContactMessage::route('/{record}/edit'),
        ];
    }
}
