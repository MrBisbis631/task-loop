<?php

namespace App\Providers;

use App\Enums\RoleEnum;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Laravel\Pennant\Feature;
use Typesense\Client;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // singleton for typesense client connection
        $this->app->singleton(Client::class, fn() => (new Client(config('scout.typesense.client-settings'))));
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Allow Super Admin to access all permissions
        Gate::before(
            fn($user, $ability) => $user->role === RoleEnum::SUPER_ADMIN->value ? true : null
        );


        // active `search-engine` flag if search engine is enabled
        Feature::define('search-engine', fn() => Arr::get(app(Client::class)->health->retrieve(), 'ok', false));
    }
}
