<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    // POST /api/contact
    public function store(Request $request): JsonResponse
    {
        // Support name or full_name, service or service_type for convenience
        if ($request->filled('name') && ! $request->filled('full_name')) {
            $request->merge(['full_name' => $request->input('name')]);
        }
        if ($request->filled('service') && ! $request->filled('service_type')) {
            $request->merge(['service_type' => $request->input('service')]);
        }

        $data = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'service_type' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        ContactMessage::create($data);

        return response()->json(['success' => true], 201);
    }
}
