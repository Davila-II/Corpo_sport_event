<?php

namespace App\Filament\Resources\MediaGroups\Pages;

use App\Filament\Resources\MediaGroups\MediaGroupResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListMediaGroups extends ListRecords
{
    protected static string $resource = MediaGroupResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
