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
            'name' => 'string|required|optional',
            'phone_1' => 'string|optional|phone',
            'phone_2' => 'string|required_with:phone_1|phone',
            'company_type' => ['optional', Rule::enum(CompanyTypeEnum::class)],
            'website_url' => 'string|active_url|optional',
            'linkedin_url' => 'string|url:linkedin|optional',
            'facebook_url' => 'string|url:facebook|optional',
            'instagram_url' => 'string|url:instagram|optional',
            'country' => ['optional', Rule::enum(CountryAlpha2::class), 'required_with:state,zip_code,address_1,address_2'],
            'state' => 'optional|string',
            'zip_code' => 'optional|string',
            'address_1' => 'optional|string',
            'address_2' => 'optional|string|required_with:address_1',
            'tax_identification_number' => 'optional|string',
            'vat_number' => 'optional|string',
            'tax_region_country' => 'optional|string',
            'tax_filing_category' => 'optional|string',
            'tax_documentation_url' => 'optional|string',
            'preferred_payment_method' => ['optional', Rule::enum(PaymentMethodEnum::class)],
            'bank_account_details' => 'optional|string',
            'billing_address' => 'optional|string',
            'payment_terms' => ['optional', Rule::enum(PaymentTermEnum::class)],
            'preferred_currency' => ['optional', Rule::enum(CurrencyAlpha3::class)],
        ];
    }
}
