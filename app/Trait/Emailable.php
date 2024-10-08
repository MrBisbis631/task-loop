<?php

namespace App\Trait;

use App\Models\Email;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait Emailable
{
    /**
     * Get all of the emails for the emailable model.
     */
    public function emails(): MorphMany
    {
        return $this->morphMany(Email::class, "emailable");
    }

    /**
     * Get the default email for the emailable model.
     */
    public function defaultEmail(): Email
    {
        return $this->emails()->where("is_default", true)->first();
    }

    /**
     * Create a default email for the emailable model.
     */
    public function createDefaultEmail(array $validated): Email
    {
        $this->emails()->update(["is_default" => false]);

        $email = $this->emails()->create([...$validated, "is_default" => true]);
        $this->emails()->save($email);

        return $email;
    }
}
