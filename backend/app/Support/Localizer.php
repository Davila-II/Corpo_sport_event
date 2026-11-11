<?php

namespace App\Support;

class Localizer
{
    // Parcourt un tableau et remplace chaque ['fr' => .., 'en' => ..]
    // par le texte dans la langue demandée.
    public static function localize(mixed $value, string $locale): mixed
    {
        if (! is_array($value)) {
            return $value;
        }

        if (self::isTranslation($value)) {
            $text = $value[$locale] ?? null;

            return filled($text) ? $text : ($value['fr'] ?? null);
        }

        return array_map(fn ($item) => self::localize($item, $locale), $value);
    }

    private static function isTranslation(array $value): bool
    {
        return $value !== []
            && array_key_exists('fr', $value)
            && count(array_diff(array_keys($value), ['fr', 'en'])) === 0;
    }
}
