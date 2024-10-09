<?php

namespace App\Providers\Providers;

use App\Services\GithubService;
use Illuminate\Support\ServiceProvider;

class GithubServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(GithubService::class, fn () => new GithubService(
            user: auth()->user(),
            endpoint: config('services.github.endpoint'),
        ));
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
