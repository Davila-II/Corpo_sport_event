<?php

namespace App\Models;

use App\Models\Concerns\HasLocalizedFields;
use App\Models\Concerns\HasMediaUrls;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MediaItem extends Model
{
    use HasLocalizedFields, HasMediaUrls;

    protected $fillable = ['media_group_id', 'image', 'caption', 'sort_order'];

    protected $casts = [
        'caption' => 'array',
    ];

    protected $appends = ['image_url'];

    // Chaque photo appartient à un groupe
    public function group(): BelongsTo
    {
        return $this->belongsTo(MediaGroup::class, 'media_group_id');
    }

    public function getImageUrlAttribute(): ?string
    {
        return $this->resolveMediaUrl($this->image);
    }
}
