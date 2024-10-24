<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ExternApiDetailController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Dashboard for all kind of users
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])
    ->get('/dashboard', fn() => Inertia::render('Dashboard'))
    ->name('dashboard');


// Freelancer's authenticated routes 
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
    'role:super-admin|freelancer',
])
    ->prefix('/freelancer-space')
    ->name('freelancer-space.')
    ->group(function () {
        Route::resource('/external-api-details', ExternApiDetailController::class, [
            "parameters" => [
                'external-api-details' => 'externApiDetail',
            ],
        ]);

        Route::resource('company', CompanyController::class);
    });

// Client's authenticated routes
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
    'role:super-admin|client',
])
    ->prefix('/client-space')
    ->name('client-space.')
    ->group(function () {});

// Admin's authenticated routes
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
    'role:super-admin|admin',
])
    ->prefix('/admin-space')
    ->name('admin-space.')
    ->group(function () {});
