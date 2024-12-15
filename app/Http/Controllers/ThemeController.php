<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreThemeRequest;
use App\Http\Requests\UpdateThemeRequest;
use App\Models\Theme;
use App\Models\User;
use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ThemeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(#[CurrentUser] User $user)
    {
        return Inertia::render("FreelancerSpace/Theme/Index", [
            "theme" => $user->defaultTheme(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreThemeRequest $request, #[CurrentUser] User $user)
    {
        Gate::authorize("store", Theme::class);

        $user->createDefaultTheme($request->validated());

        return to_route("freelancer-space.theme.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(Theme $theme)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Theme $theme)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateThemeRequest $request, Theme $theme)
    {
        Gate::authorize("update", $theme);

        $theme->update($request->validated());

        return to_route("freelancer-space.theme.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Theme $theme)
    {
        Gate::authorize("delete", $theme);

        $theme->delete();

        return to_route("freelancer-space.theme.index");
    }
}
