<?php

namespace App\Models\Concerns;

use Illuminate\Support\Facades\Storage;

trait HasMediaUrls
{
    /**
     * Résout proprement l'URL publique d'un média (image, couverture, logo, document).
     * - Si c'est déjà une URL complète (ex: https://...), on la renvoie directement.
     * - Si le disque est Supabase/S3, utilise l'URL publique S3 ou le endpoint public Supabase.
     * - Sinon, passe par le Storage classique Laravel.
     */
    protected function resolveMediaUrl(?string $path, ?string $disk = null): ?string
    {
        if (blank($path)) {
            return null;
        }

        // Si le chemin est déjà une URL absolue complète
        if (filter_var($path, FILTER_VALIDATE_URL) || str_starts_with($path, 'data:')) {
            return $path;
        }

        $diskName = $disk ?? config('filesystems.default', 'public');

        try {
            return Storage::disk($diskName)->url($path);
        } catch (\Throwable $e) {
            // En secours si l'adapter S3 n'est pas instanciable : URL directe Supabase Storage
            $supabaseUrl = config('filesystems.disks.supabase.url');
            if ($diskName === 'supabase' && filled($supabaseUrl)) {
                return rtrim($supabaseUrl, '/') . '/' . ltrim($path, '/');
            }

            return null;
        }
    }
}
