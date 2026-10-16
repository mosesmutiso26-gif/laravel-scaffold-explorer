<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class TrackRequestCorrelation
{
    public function handle(Request $request, Closure $next): Response
    {
        $correlationId = $request->header('X-Correlation-ID') ?? Str::uuid()->toString();
        $request->attributes->set('correlation_id', $correlationId);
        $response = $next($request);
        $response->headers->set('X-Correlation-ID', $correlationId);
        return $response;
    }
}
