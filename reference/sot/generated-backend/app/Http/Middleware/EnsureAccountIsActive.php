<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAccountIsActive
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        if ($user && !$user->isActive()) {
            return response()->json([
                'success' => false,
                'message' => 'Your account is not active. Contact the administrator.',
            ], 403);
        }
        return $next($request);
    }
}
