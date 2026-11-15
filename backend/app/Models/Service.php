<?php

namespace App\Models;

use App\Models\Concerns\HasLocalizedFields;
use App\Models\Concerns\HasMediaUrls;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasLocalizedFields, HasMediaUrls;

    // "bullets" = les puces, saisies une par ligne dans l'admin (FR et EN)
    protected $fillable = [
        'title', 'description', 'bullets', 'image', 'is_published', 'sort_order',
    ];

    protected $casts = [
        'title' => 'array',
        'description' => 'array',
        'bullets' => 'array',
        'is_published' => 'boolean',
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute(): ?string
    {
        return $this->resolveMediaUrl($this->image);
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true)->orderBy('sort_order')->orderBy('id');
    }
}
