<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$acceptedRoles): Response
    {
        if (auth()->check() && in_array(auth()->user()->role->value, $acceptedRoles)) {
            return $next($request);
        }
        
        return response(status: Response::HTTP_UNAUTHORIZED);
    }
}
