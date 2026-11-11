<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    public function handle(Request $request, Closure $next): Response
    {
        $lang = $request->query('lang') ?? substr((string) $request->header('Accept-Language'), 0, 2);

        app()->setLocale(in_array($lang, ['fr', 'en'], true) ? $lang : 'fr');

        return $next($request);
    }
}
