<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        // Les puces sont saisies une par ligne dans l'admin : on les transforme en liste
        $bullets = preg_split('/\r\n|\r|\n/', (string) $this->localized('bullets'));
        $bullets = array_values(array_filter(array_map('trim', $bullets)));

        return [
            'id' => $this->id,
            'title' => $this->localized('title'),
            'description' => $this->localized('description'),
            'bullets' => $bullets,
            'image_url' => $this->image_url,
        ];
    }
}
