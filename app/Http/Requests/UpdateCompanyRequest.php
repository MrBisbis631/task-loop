<?php

namespace App\Http\Requests;

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
                'name' => 'string|required|sometimes',
                'phone_1' => 'string|sometimes|phone',
                'phone_2' => 'string|required_with:phone_1|phone',
                'company_type' => ['sometimes', Rule::enum(CompanyTypeEnum::class)],
                'website_url' => 'string|active_url|sometimes',
                'linkedin_url' => 'string|url:linkedin|sometimes',
                'facebook_url' => 'string|url:facebook|sometimes',
                'instagram_url' => 'string|url:instagram|sometimes',
                'country' => ['sometimes', Rule::enum(CountryAlpha2::class), 'required_with:state,zip_code,address_1,address_2'],
                'state' => 'sometimes|string',
                'zip_code' => 'sometimes|string',
                'address_1' => 'sometimes|string',
                'address_2' => 'sometimes|string|required_with:address_1',
                'tax_identification_number' => 'sometimes|string',
                'vat_number' => 'sometimes|string',
                'tax_region_country' => 'sometimes|string',
                'tax_filing_category' => 'sometimes|string',
                'tax_documentation_url' => 'sometimes|string',
                'preferred_payment_method' => ['sometimes', Rule::enum(PaymentMethodEnum::class)],
                'bank_account_details' => 'sometimes|string',
                'billing_address' => 'sometimes|string',
                'payment_terms' => ['sometimes', Rule::enum(PaymentTermEnum::class)],
                'preferred_currency' => ['sometimes', Rule::enum(CurrencyAlpha3::class)],
        ];
    }
}
