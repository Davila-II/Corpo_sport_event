<?php

namespace App\Http\Resources;

use App\Support\Localizer;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();

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
            // Éditions répertoriées, déjà traduites dans la langue demandée
            'editions' => array_values(
                Localizer::localize($this->editions ?? [], $locale)
            ),
            // Distinctions : simple liste de textes
            'distinctions' => array_values(array_filter(
                Localizer::localize($this->distinctions ?? [], $locale),
                fn ($item) => filled($item)
            )),
            // Dossier PDF propre à la compétition (null s'il n'y en a pas)
            'dossier_url' => $this->dossier_url,
        ];
    }
}
