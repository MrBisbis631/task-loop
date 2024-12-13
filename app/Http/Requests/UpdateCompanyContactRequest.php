<?php

namespace App\Http\Requests;

use App\Enums\CompanyContactActivityStatusEnum;
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
            'first_name' => 'sometimes|nullable|string|max:255',
            'last_name' => 'sometimes|nullable|string|max:255',
            'email' => 'sometimes|nullable|string|max:255',
            'phone' => 'sometimes|nullable|string|phone',
            'title' => 'sometimes|nullable|sometimes|string|max:255',
            'job_title' => 'sometimes|nullable|string|max:255',

            'preferred_contact_method' => ['sometimes', 'nullable', Rule::enum(ContactMethodEnum::class)],
            'activity_status' => ['sometimes', 'nullable', Rule::enum(CompanyContactActivityStatusEnum::class)],

            'notes' => 'array|sometimes|nullable',
            'notes.*.created_at' => 'date',
            'notes.*.title' => 'string|max:255',
            'notes.*.content' => 'string|max:255',
        ];
    }
}
