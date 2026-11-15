<?php

namespace App\Models;

use App\Models\Concerns\HasLocalizedFields;
use App\Models\Concerns\HasMediaUrls;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MediaGroup extends Model
{
    use HasLocalizedFields, HasMediaUrls;

    protected $fillable = [
        'title', 'category', 'period_label', 'cover_image',
        'layout', 'is_published', 'sort_order',
    ];

    protected $casts = [
        'title' => 'array',
        'is_published' => 'boolean',
    ];

    protected $appends = ['cover_url'];

    // Un groupe de photos contient plusieurs photos
    public function items(): HasMany
    {
        return $this->hasMany(MediaItem::class)->orderBy('sort_order')->orderBy('id');
    }

    public function getCoverUrlAttribute(): ?string
    {
        return $this->resolveMediaUrl($this->cover_image);
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true)->orderBy('sort_order')->orderByDesc('id');
    }
}
