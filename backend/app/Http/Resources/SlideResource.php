<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SlideResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'eyebrow' => $this->localized('eyebrow'),
            'title_white' => $this->localized('title_white'),
            'title_blue' => $this->localized('title_blue'),
            'subtitle' => $this->localized('subtitle'),
            'image_url' => $this->image_url,
        ];
    }
}
