<?php

namespace App\Policies;

use App\Models\Phone;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PhonePolicy
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
    public function view(User $user, Phone $phone): Response
    {
        return $phone->phoneable->is($user) ?
            Response::allow()
            : Response::denyAsNotFound();
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
    public function update(User $user, Phone $phone): bool
    {
        return $phone->phoneable->is($user);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Phone $phone): bool
    {
        return $phone->phoneable->is($user);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Phone $phone): bool
    {
        return $phone->phoneable->is($user);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Phone $phone): bool
    {
        return $phone->phoneable->is($user);
    }
}
