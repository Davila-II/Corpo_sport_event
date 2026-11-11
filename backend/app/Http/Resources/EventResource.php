<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->localized('title'),
            'description' => $this->localized('description'),
            'category' => $this->category,
            'status' => $this->status,
            'city' => $this->city,
            'period_label' => $this->period_label,
            'edition_label' => $this->localized('edition_label'),
            'cover_url' => $this->cover_url,
        ];
    }
}
