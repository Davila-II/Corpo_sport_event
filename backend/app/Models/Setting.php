<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = ['key', 'value'];

    // "value" est stocké en JSON, Laravel le convertit en tableau PHP
    protected $casts = [
        'value' => 'array',
    ];

    // Lire un réglage : Setting::get('stats', [])
    public static function get(string $key, mixed $default = null): mixed
    {
        return static::where('key', $key)->first()?->value ?? $default;
    }

    // Écrire un réglage : Setting::set('stats', [...])
    public static function set(string $key, mixed $value): void
    {
        static::updateOrCreate(['key' => $key], ['value' => $value]);
    }
}
