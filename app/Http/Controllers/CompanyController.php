<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;
use App\Models\Company;
use App\Models\User;
use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, #[CurrentUser] User $user)
    {
        return Inertia::render("FreelancerSpace/Company/Index", [
            "companies" => $user->companies()->get(),
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
    public function store(StoreCompanyRequest $request, #[CurrentUser] User $user)
    {
        $user->companies()->create($request->validated());

        return to_route('freelancer-space.company.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        Gate::authorize("view", $company);

        return response()->json($company->toArray());
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCompanyRequest $request, Company $company)
    {
        Gate::authorize("update", $company);

        $company->updateOrFail($request->validated());

        return to_route('freelancer-space.company.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        Gate::authorize("delete", $company);

        $company->deleteOrFail();

        return to_route('freelancer-space.company.index');
    }
}
