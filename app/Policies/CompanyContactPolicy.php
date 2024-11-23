<?php

namespace App\Policies;

use App\Enums\RoleEnum;
use App\Models\Company;
use App\Models\User;
use App\Traits\HasCommonUserPolicy;

class CompanyContactPolicy
{
    use HasCommonUserPolicy;

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, Company $company): bool
    {
        return $company->user()->is($user)
            && $user->hasRole([
                RoleEnum::ADMIN,
                RoleEnum::FREELANCER,
            ]);
    }
}
