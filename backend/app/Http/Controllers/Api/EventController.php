<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    // GET /api/events?category=football&status=ongoing
    public function index(Request $request)
    {
        $events = Event::published()
            ->when($request->query('category'), fn ($q, $category) => $q->where('category', $category))
            ->when($request->query('status'), fn ($q, $status) => $q->where('status', $status))
            ->get();

        return EventResource::collection($events);
    }

    // GET /api/events/corpo-foot
    public function show(string $slug)
    {
        $event = Event::published()->where('slug', $slug)->firstOrFail();

        return new EventResource($event);
    }
}
