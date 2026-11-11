<?php

namespace App\Models;

use App\Models\Concerns\HasLocalizedFields;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class MediaItem extends Model
{
    use HasLocalizedFields;

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
        return $this->image
            ? Storage::disk('public')->url($this->image)
            : null;
    }
}
