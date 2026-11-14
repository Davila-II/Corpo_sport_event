<?php

namespace App\Models;

use App\Models\Concerns\HasLocalizedFields;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Event extends Model
{
    use HasLocalizedFields;

    protected $fillable = [
        'slug', 'title', 'description', 'category', 'status', 'city',
        'period_label', 'edition_label', 'editions', 'distinctions', 'dossier',
        'cover_image', 'show_on_home', 'is_published', 'sort_order',
    ];

    protected $casts = [
        'title' => 'array',
        'description' => 'array',
        'edition_label' => 'array',
        'editions' => 'array',
        'distinctions' => 'array',
        'show_on_home' => 'boolean',
        'is_published' => 'boolean',
    ];

    protected $appends = ['cover_url', 'dossier_url'];

    public function getCoverUrlAttribute(): ?string
    {
        return $this->cover_image
            ? Storage::disk('public')->url($this->cover_image)
            : null;
    }

    public function getDossierUrlAttribute(): ?string
    {
        return $this->dossier
            ? Storage::disk('public')->url($this->dossier)
            : null;
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true)->orderBy('sort_order')->orderByDesc('id');
    }
}
