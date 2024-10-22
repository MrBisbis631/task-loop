<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCompanyContactRequest;
use App\Http\Requests\UpdateCompanyContactRequest;
use App\Models\CompanyContact;
use App\Models\User;
use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Support\Facades\Gate;

class CompanyContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreCompanyContactRequest $request, #[CurrentUser] User $user)
    {
        $validated = $request->validated();

        $user->companies()->findOrFail($validated['company_id'])->companyContacts()->create($validated);

        return to_route("freelance-space.company.index", [$validated['company_id']]);
    }

    /**
     * Display the specified resource.
     */
    public function show(CompanyContact $companyContact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CompanyContact $companyContact)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCompanyContactRequest $request, CompanyContact $companyContact)
    {
        Gate::authorize('update', $companyContact);

        $companyContact->updateOrFail($request->validated());

        return to_route("freelance-space.company.index", [$companyContact->company()->getKey()]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CompanyContact $companyContact)
    {
        Gate::authorize('delete', $companyContact);

        $companyContact->deleteOrFail();

        return to_route("freelance-space.company.index", [$companyContact->company()->getKey()]);
    }
}
