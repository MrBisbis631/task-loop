<?php

namespace App\Policies;

use App\Models\Email;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class EmailPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        // TODO allow admin to view all emails
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Email $email): Response
    {
        return $email->emailable->is($user) ?
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
    public function update(User $user, Email $email): Response
    {
        return $email->emailable->is($user) ?
            Response::allow()
            : Response::deny();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Email $email): Response
    {
        return $email->emailable->is($user) ?
            Response::allow()
            : Response::deny();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Email $email): Response
    {
        return $email->emailable->is($user) ?
            Response::allow()
            : Response::deny();
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Email $email): Response
    {
        return $email->emailable->is($user) ?
            Response::allow()
            : Response::deny();
    }
}
