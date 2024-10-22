<?php

namespace App\Policies;

use App\Enums\RoleEnum;
use App\Models\CompanyContact;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CompanyContactPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, CompanyContact $companyContact): Response
    {
        return $companyContact->company()->user()->is($user) ?
            Response::allow() :
            Response::denyAsNotFound();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasRole(RoleEnum::FREELANCER);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, CompanyContact $companyContact): bool
    {
        return $companyContact->company()->user()->is($user);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, CompanyContact $companyContact): bool
    {
        return $companyContact->company()->user()->is($user);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, CompanyContact $companyContact): bool
    {
        return $companyContact->company()->user()->is($user);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, CompanyContact $companyContact): bool
    {
        return $companyContact->company()->user()->is($user);
    }
}
