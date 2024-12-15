<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreThemeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'primary_color' => 'sometimes|hex_color|string|nullable',
            'secondary_color' => 'sometimes|hex_color|string|nullable',
            'trinary_color' => 'sometimes|hex_color|string|nullable',
            'primary_text_color' => 'sometimes|hex_color|string|nullable',
            'secondary_text_color' => 'sometimes|hex_color|string|nullable',
            'trinary_text_color' => 'sometimes|hex_color|string|nullable',
            'primary_background_color' => 'sometimes|hex_color|string|nullable',
            'secondary_background_color' => 'sometimes|hex_color|string|nullable',
            'trinary_background_color' => 'sometimes|hex_color|string|nullable',

            'default_font' => 'sometimes|string|max:255|nullable',
            'headline_font' => 'sometimes|string|max:255|nullable',

            'tailwind_config' => 'sometimes|string|nullable',
            'custom_css' => 'sometimes|string|nullable',

            'favicon' => 'sometimes|image|max:8192|string|max:255|nullable',
            'logo' => 'sometimes|image|max:8192|string|max:255|nullable',
            'dark_logo' => 'sometimes|image|max:8192|string|max:255|nullable',
            'small_logo' => 'sometimes|image|max:8192|string|max:255|nullable',
            'dark_small_logo' => 'sometimes|image|max:8192|string|max:255|nullable',

            'icons_set' => 'sometimes|string|max:255|nullable',
        ];
    }
}
