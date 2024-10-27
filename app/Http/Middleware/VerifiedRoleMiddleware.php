<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifiedRoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$acceptedRoles): Response
    {
        if (auth()->check() && auth()->user()->role_verified_at != null && in_array(auth()->user()->role->value, $acceptedRoles)) {
            return $next($request);
        }

        return response(status: Response::HTTP_UNAUTHORIZED);
    }
}
