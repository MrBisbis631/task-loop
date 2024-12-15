<?php

namespace App\Traits;

use App\Models\Theme;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait Themeable
{

    public function themes(): MorphMany
    {
        return $this->morphMany(Theme::class, "themeable");
    }

    public function defaultTheme(): ?Theme
    {
        return $this->themes()->where("is_default", true)->first();
    }

    public function createDefaultTheme(array $validated): ?Theme
    {
        $this->defaultTheme()?->update(["is_default" => false]);

        $validated["is_default"] = true;

        return $this->phones()->create($validated);
    }
}
