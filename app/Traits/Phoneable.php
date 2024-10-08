<?php

namespace App\Traits;

use App\Models\Phone;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait Phoneable
{
    /**
     * Get all of the phones for the phoneable model.
     */
    public function phones(): MorphMany
    {
        return $this->morphMany(Phone::class, "phoneable");
    }

    /**
     * Get the default phone for the phoneable model.
     */
    public function defaultPhone(): ?Phone
    {
        return $this->phones()->where("is_default", true)->first();
    }

    /** 
     * Create a default phone for the phoneable model.
     */
    public function createDefaultPhone(array $validated): ?Phone
    {
        $this->defaultPhone()?->update(["is_default" => false]);
        return $this->phones()->create([...$validated, "is_default" => true]);
    }
}
