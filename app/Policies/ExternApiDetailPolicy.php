<?php

namespace App\Policies;

use App\Models\ExternApiDetail;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use LDAP\Result;

class ExternApiDetailPolicy
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
    public function view(User $user, ExternApiDetail $externApiDetail): Response
    {
        return $user->id === $externApiDetail->user_id ? 
            Response::allow() : 
            Response::denyAsNotFound();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, ExternApiDetail $externApiDetail): bool
    {
        return $externApiDetail->user()->is($user);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, ExternApiDetail $externApiDetail): bool
    {
        return $externApiDetail->user()->is($user);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, ExternApiDetail $externApiDetail): bool
    {
        return $externApiDetail->user()->is($user);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, ExternApiDetail $externApiDetail): bool
    {
        return $externApiDetail->user()->is($user);
    }

    // Enable the user to view the secret of the API
    public function viewSecret(User $user, ExternApiDetail $externApiDetail): bool
    {
        return $externApiDetail->user()->is($user);
    }
}
