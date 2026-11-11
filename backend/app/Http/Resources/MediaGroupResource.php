<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MediaGroupResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->localized('title'),
            'category' => $this->category,
            'period_label' => $this->period_label,
            'layout' => $this->layout,
            'cover_url' => $this->cover_url,
            'items_count' => $this->items->count(),
            'items' => MediaItemResource::collection($this->whenLoaded('items')),
        ];
    }
}
