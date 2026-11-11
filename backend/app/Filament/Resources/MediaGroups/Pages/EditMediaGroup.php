<?php

namespace App\Filament\Resources\MediaGroups\Pages;

use App\Filament\Resources\MediaGroups\MediaGroupResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditMediaGroup extends EditRecord
{
    protected static string $resource = MediaGroupResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
