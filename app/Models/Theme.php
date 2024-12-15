<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Theme extends Model
{
    /** @use HasFactory<\Database\Factories\ThemeFactory> */
    use HasFactory;

    protected $fillable = [
        'is_default',
        'primary_color',
        'secondary_color',
        'trinary_color',
        'primary_text_color',
        'secondary_text_color',
        'trinary_text_color',
        'primary_background_color',
        'secondary_background_color',
        'trinary_background_color',
        'default_font',
        'headline_font',
        'tailwind_config',
        'custom_css',
        'favicon',
        'logo',
        'dark_logo',
        'small_logo',
        'dark_small_logo',
        'icons_set',
    ];

    public function themeable(): MorphTo
    {
        return $this->morphTo();
    }
}
