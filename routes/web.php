<?php

use App\Http\Controllers\CompanyContactController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ExternApiDetailController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\EncryptHistoryMiddleware;
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
    'verified_role:super-admin,freelancer',
])
    ->prefix('/freelancer-space')
    ->name('freelancer-space.')
    ->group(function () {
        Route::resource('external-api-details', ExternApiDetailController::class)
            ->middleware([EncryptHistoryMiddleware::class])
            ->parameter('external-api-details', 'externApiDetail')
            ->only(['index', 'store', 'update', 'destroy', 'show']);

        Route::resource('company', CompanyController::class)
            ->only(['index', 'show', 'store', 'update', 'destroy']);

        Route::resource('company.company-contact', CompanyContactController::class)
            ->parameter('company-contact', 'companyContact')
            ->only(['index', 'store', 'update', 'destroy']);


        Route::get("/test", fn() => "Hello freelancer");
    });

// Client's authenticated routes
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
    'verified_role:super-admin,client',
])
    ->prefix('/client-space')
    ->name('client-space.')
    ->group(function () {
        Route::get("/test", fn() => "Hello client");
    });

// Admin's authenticated routes
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
    'verified_role:super-admin,admin',
])
    ->prefix('/admin-space')
    ->name('admin-space.')
    ->group(function () {
        Route::get("/test", fn() => "Hello admin");
    });
