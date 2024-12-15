<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Spatie\TypeScriptTransformer\Attributes\LiteralTypeScriptType;

#[LiteralTypeScriptType([
    'primary_color' => 'string|null',
    'secondary_color' => 'string|null',
    'trinary_color' => 'string|null',
    'primary_text_color' => 'string|null',
    'secondary_text_color' => 'string|null',
    'trinary_text_color' => 'string|null',
    'primary_background_color' => 'string|null',
    'secondary_background_color' => 'string|null',
    'trinary_background_color' => 'string|null',
    'default_font' => 'string|null',
    'headline_font' => 'string|null',
    'tailwind_config' => 'string|null',
    'custom_css' => 'string|null',
    'favicon' => 'string|null',
    'logo' => 'string|null',
    'dark_logo' => 'string|null',
    'small_logo' => 'string|null',
    'dark_small_logo' => 'string|null',
    'icons_set' => 'string|null',
])]
class ThemeResource extends JsonResource
{
    public static $wrap = null;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return parent::toArray($request);
    }
}
