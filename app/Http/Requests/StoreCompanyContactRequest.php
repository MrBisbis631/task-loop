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
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'company_id' => 'exists:companies,id',

            'first_name' => 'optional|string|max:255',
            'last_name' => 'optional|string|max:255',
            'email' => 'optional|string|max:255',
            'phone' => 'optional|string|phone',
            'title' => 'optional|string|max:255',
            'job_title' => 'optional|string|max:255',
            'preferred_contact_method' => Rule::enum(ContactMethodEnum::cases()),
            
            'notes' => 'array|optional',
            'notes.*.created_at' => 'date', 
            'notes.*.title' => 'string|max:255', 
            'notes.*.content' => 'string|max:255', 
        ];
    }
}
