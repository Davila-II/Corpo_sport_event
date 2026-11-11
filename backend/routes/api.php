<?php

use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\SiteController;
use App\Http\Middleware\SetLocale;
use Illuminate\Support\Facades\Route;

Route::middleware(SetLocale::class)->group(function () {
    Route::get('/home', [SiteController::class, 'home']);
    Route::get('/about', [SiteController::class, 'about']);
    Route::get('/services', [SiteController::class, 'services']);
    Route::get('/media', [SiteController::class, 'media']);
    Route::get('/settings', [SiteController::class, 'settings']);

    Route::get('/events', [EventController::class, 'index']);
    Route::get('/events/{slug}', [EventController::class, 'show']);

    // Maximum 5 envois par minute et par visiteur (anti-spam)
    Route::post('/contact', [ContactController::class, 'store'])->middleware('throttle:5,1');
});
