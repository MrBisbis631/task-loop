<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateExternApiDetailRequest extends FormRequest
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
            'api_name' => 'required|string',
            'api_username' => 'required|string',
            'expires_at' => 'nullable|date',

            // at least one of these two fields is required
            'label' => 'string|nullable|max:100|required_without:description',
            'description' => 'string|nullable|max:512|required_without:label',
        ];
    }
}
