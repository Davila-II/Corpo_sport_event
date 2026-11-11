<?php

namespace App\Models;

use App\Models\Concerns\HasLocalizedFields;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Slide extends Model
{
    use HasLocalizedFields;

    protected $fillable = [
        'eyebrow', 'title_white', 'title_blue', 'subtitle',
        'image', 'is_active', 'sort_order',
    ];

    protected $casts = [
        'eyebrow' => 'array',
        'title_white' => 'array',
        'title_blue' => 'array',
        'subtitle' => 'array',
        'is_active' => 'boolean',
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute(): ?string
    {
        return $this->image
            ? Storage::disk('public')->url($this->image)
            : null;
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true)->orderBy('sort_order')->orderBy('id');
    }
}
