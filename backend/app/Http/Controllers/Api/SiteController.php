<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EventResource;
use App\Http\Resources\MediaGroupResource;
use App\Http\Resources\PartnerResource;
use App\Http\Resources\ServiceResource;
use App\Http\Resources\SlideResource;
use App\Http\Resources\TestimonialResource;
use App\Models\Event;
use App\Models\MediaGroup;
use App\Models\Partner;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Slide;
use App\Models\Testimonial;
use App\Support\Localizer;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class SiteController extends Controller
{
    // Page d'accueil
    public function home(): JsonResponse
    {
        $locale = app()->getLocale();

        // Bloc "Notre impact" : on transforme le chemin de l'image en lien complet
        $rawImpact = Setting::get('impact', []);
        $impact = Localizer::localize($rawImpact, $locale);
        $impact['image_url'] = ! empty($rawImpact['image'])
            ? Storage::disk('public')->url($rawImpact['image'])
            : null;
        unset($impact['image']);

        return response()->json([
            'slides' => SlideResource::collection(Slide::active()->get()),
            'stats' => Localizer::localize(Setting::get('stats', []), $locale),
            'impact' => $impact,
            'events' => EventResource::collection(
                Event::published()->where('show_on_home', true)->limit(3)->get()
            ),
            'testimonials' => TestimonialResource::collection(Testimonial::published()->get()),
            'partners' => PartnerResource::collection(Partner::published()->get()),
        ]);
    }

    // Page À propos
    public function about(): JsonResponse
    {
        $locale = app()->getLocale();

        $rawPresident = Setting::get('president', []);
        $president = Localizer::localize($rawPresident, $locale);
        $president['photo_url'] = ! empty($rawPresident['photo'])
            ? Storage::disk('public')->url($rawPresident['photo'])
            : null;
        unset($president['photo']);

        return response()->json([
            'president' => $president,
            'goals' => Localizer::localize(Setting::get('goals', []), $locale),
            'values' => Localizer::localize(Setting::get('values', []), $locale),
        ]);
    }

    // Page Domaines d'activités
    public function services(): JsonResponse
    {
        return response()->json([
            'services' => ServiceResource::collection(Service::published()->get()),
            // La liste "Des éditions qui construisent une histoire"
            'editions' => EventResource::collection(Event::published()->get()),
        ]);
    }

    // Page Médiathèque
    public function media(): JsonResponse
    {
        return response()->json([
            'groups' => MediaGroupResource::collection(
                MediaGroup::published()->with('items')->get()
            ),
        ]);
    }

    // Coordonnées et infos générales (contact, pied de page)
    public function settings(): JsonResponse
    {
        $locale = app()->getLocale();

        return response()->json([
            'site' => Localizer::localize(Setting::get('site', []), $locale),
            'contact' => Localizer::localize(Setting::get('contact', []), $locale),
        ]);
    }
}
