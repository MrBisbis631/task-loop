<?php

namespace App\Http\Requests;

use App\Enums\ContactMethodEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCompanyContactRequest extends FormRequest
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
            'first_name' => 'string|max:255',
            'last_name' => 'string|max:255',
            'email' => 'sometimes|string|max:255|required_without:phone',
            'phone' => 'sometimes|string|phone|required_without:email',
            'title' => 'sometimes|string|max:255',
            'job_title' => 'sometimes|string|max:255',
            'preferred_contact_method' => ['sometimes', Rule::enum(ContactMethodEnum::class)],
            
            'notes' => 'array|sometimes',
            'notes.*.created_at' => 'date', 
            'notes.*.title' => 'string|max:255', 
            'notes.*.content' => 'string|max:255', 
        ];
    }
}
