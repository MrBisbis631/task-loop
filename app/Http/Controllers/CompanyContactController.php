<?php

namespace App\Http\Controllers;

use App\Enums\CompanyContactActivityStatusEnum;
use App\Enums\ContactMethodEnum;
use App\Http\Requests\StoreCompanyContactRequest;
use App\Http\Requests\UpdateCompanyContactRequest;
use App\Http\Resources\CompanyContactResource;
use App\Http\Resources\CompanyResource;
use App\Models\Company;
use App\Models\CompanyContact;
use App\Models\User;
use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class CompanyContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Company $company, Request $request)
    {
        Gate::authorize("view", $company);

        $query = $request->get("query", "");
        $activityStatus = $request->input('activityStatus', "");

        return Inertia::render("FreelancerSpace/Company/CompanyContact/Index", [
            "query" => $query ?? "",
            "activityStatus" => $activityStatus ?? null,

            "contactMethodEnumAsArray" => ContactMethodEnum::toArray(),
            "companyContactActivityStatusEnumAsArray" => CompanyContactActivityStatusEnum::toArray(),

            "company" => CompanyResource::make($company),
            "companyContacts" => CompanyContactResource::collection(
                $company->companyContacts()
                    ->when($query != "", function ($q) use ($query) {
                        $q->where("first_name", "like", "$query%")
                            ->orWhere("last_name", "like", "$query%")
                            ->orWhere("email", "like", "$query%");

                        return $q;
                    })
                    ->when($activityStatus != "", fn($query) => $query->where("activity_status", $activityStatus))
                    ->paginate(10)
                    ->withQueryString(),
            ),
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
    public function store(StoreCompanyContactRequest $request, Company $company)
    {
        Gate::authorize('view', $company);
        Gate::authorize('create', CompanyContact::class);

        $company->companyContacts()->create($request->validated());

        return to_route("freelancer-space.company.company-contact.index", [$company]);
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
    public function update(UpdateCompanyContactRequest $request, Company $company, CompanyContact $companyContact)
    {
        Gate::authorize('update', $companyContact);

        $companyContact->updateOrFail($request->validated());

        return to_route("freelancer-space.company.company-contact.index", [$company->getKey()]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company, CompanyContact $companyContact)
    {
        Gate::authorize('delete', $companyContact);

        $companyContact->deleteOrFail();

        return to_route("freelancer-space.company.company-contact.index", [$company->getKey()]);
    }
}
