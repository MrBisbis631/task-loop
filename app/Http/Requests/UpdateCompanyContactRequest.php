<?php

namespace App\Http\Requests;

use App\Enums\ContactMethodEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCompanyContactRequest extends FormRequest
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
            'company_id' => 'exists:companies,id',

            'first_name' => 'string|max:255',
            'last_name' => 'string|max:255',
            'email' => 'string|max:255|required_without:phone',
            'phone' => 'string|phone|required_without:email',
            'title' => 'optional|string|max:255',
            'job_title' => 'optional|string|max:255',
            'preferred_contact_method' => ['optional', Rule::enum(ContactMethodEnum::cases())],
            
            'notes' => 'array|optional',
            'notes.*.created_at' => 'date', 
            'notes.*.title' => 'string|max:255', 
            'notes.*.content' => 'string|max:255', 
        ];
    }
}
