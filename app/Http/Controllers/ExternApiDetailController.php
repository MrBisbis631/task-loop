<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExternApiDetailRequest;
use App\Http\Requests\UpdateExternApiDetailRequest;
use App\Models\ExternApiDetail;
use App\Models\User;
use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ExternApiDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = request("query", "");

        return Inertia::render("FreelancerSpace/ExternApiDetails/Index", [
            "query" => $query,
            "externApiDetails" => ExternApiDetail::search($query)
                ->options(['query_by' => 'api_name, label, description, api_username',])
                ->where('user_id', 1)
                ->paginate(8)
                ->onEachSide(1)
                ->withQueryString(),
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
    public function store(StoreExternApiDetailRequest $request, #[CurrentUser] User $user)
    {
        $user->externApiDetails()->create($request->validated());

        return to_route('freelancer-space.external-api-details.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(ExternApiDetail $externApiDetail)
    {
        Gate::authorize('view', $externApiDetail);

        return $externApiDetail->toArray();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ExternApiDetail $externApiDetail, Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExternApiDetailRequest $request, ExternApiDetail $externApiDetail)
    {
        Gate::authorize("update", $externApiDetail);

        $externApiDetail->update($request->validated());

        return to_route('freelancer-space.external-api-details.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExternApiDetail $externApiDetail)
    {
        Gate::authorize("delete", $externApiDetail);

        $externApiDetail->delete();

        return to_route('freelancer-space.external-api-details.index');
    }
}
