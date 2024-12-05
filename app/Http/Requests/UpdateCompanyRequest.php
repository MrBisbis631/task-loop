<?php

namespace App\Http\Requests;

use App\Enums\CompanyActivityStatusEnum;
use App\Enums\CompanyTypeEnum;
use App\Enums\PaymentMethodEnum;
use App\Enums\PaymentTermEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use PrinsFrank\Standards\Country\CountryAlpha2;
use PrinsFrank\Standards\Currency\CurrencyAlpha3;

class UpdateCompanyRequest extends FormRequest
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
            'name' => 'string|sometimes',
            'email' => 'string|email|sometimes',
            'phone_1' => 'string|sometimes|phone|required_with:phone_2',
            'phone_2' => 'string|phone|sometimes|nullable',
            'company_type' => ['sometimes', Rule::enum(CompanyTypeEnum::class)],
            'website_url' => 'string|active_url|sometimes|nullable',
            'linkedin_url' => 'string|url:linkedin|sometimes|nullable',
            'facebook_url' => 'string|url:facebook|sometimes|nullable',
            'instagram_url' => 'string|url:instagram|sometimes|nullable',
            'country' => ['sometimes', Rule::enum(CountryAlpha2::class), 'required_with:state,zip_code,address_1,address_2'],
            'state' => 'sometimes|nullable|string|required_with:country,zip_code,address_1,address_2',
            'zip_code' => 'sometimes|string|required_with:country,state,address_1,address_2',
            'address_1' => 'sometimes|string|required_with:country,state,zip_code',
            'address_2' => 'sometimes|string|required_with:address_1',
            'tax_identification_number' => 'sometimes|string|nullable',
            'vat_number' => 'sometimes|string|nullable',
            'tax_region_country' => 'sometimes|string|nullable',
            'tax_filing_category' => 'sometimes|string|nullable',
            'tax_documentation_url' => 'sometimes|string|nullable',
            'preferred_payment_method' => ['sometimes', Rule::enum(PaymentMethodEnum::class)],
            'bank_account_details' => 'sometimes|string|nullable',
            'billing_address' => 'sometimes|string',
            'payment_terms' => ['sometimes', Rule::enum(PaymentTermEnum::class)],
            'preferred_currency' => ['sometimes', Rule::enum(CurrencyAlpha3::class)],
            'activity_status' => ['sometimes', Rule::enum(CompanyActivityStatusEnum::class)],
        ];
    }
}
