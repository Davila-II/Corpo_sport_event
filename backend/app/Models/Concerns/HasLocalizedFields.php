<?php

namespace App\Models\Concerns;

trait HasLocalizedFields
{
    // Renvoie le texte d'un champ bilingue dans la langue demandée.
    // Si la langue demandée est vide, on retombe sur le français.
    public function localized(string $field, ?string $locale = null): ?string
    {
        $locale ??= app()->getLocale();
        $value = $this->{$field};

        if (! is_array($value)) {
            return $value;
        }

        return $value[$locale] ?? $value['fr'] ?? (collect($value)->filter()->first());
    }
}
