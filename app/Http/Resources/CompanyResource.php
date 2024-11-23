<?php

namespace App\Http\Resources;

use App\Enums\PaymentMethodEnum;
use App\Enums\PaymentTermEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Propaganistas\LaravelPhone\PhoneNumber;
use libphonenumber\PhoneNumberFormat;
use Spatie\TypeScriptTransformer\Attributes\LiteralTypeScriptType;

#[LiteralTypeScriptType([
    'id' => 'string',
    'created_at' => 'string',
    'updated_at' => 'string',
    'name' => 'string',
    'phone_1' => 'string',
    'phone_2' => 'string',
    'last_contacted_at' => 'string',
    'activity_status' => 'string',
    'company_type' => 'string',
    'flags' => 'string',
    'website_url' => 'string',
    'linkedin_url' => 'string',
    'facebook_url' => 'string',
    'instagram_url' => 'string',
    'country' => 'string',
    'state' => 'string',
    'zip_code' => 'string',
    'address_1' => 'string',
    'address_2' => 'string',
    'tax_identification_number' => 'string',
    'vat_number' => 'string',
    'tax_region_country' => 'string',
    'tax_filing_category' => 'string',
    'tax_documentation_url' => 'string',
    'preferred_payment_method' => 'string',
    'bank_account_details' => 'string',
    'billing_address' => 'string',
    'payment_terms' => 'string',
    'preferred_currency' => 'string',
    'phone_1_readable' => 'string',
    'phone_2_readable' => 'string',
    'phone_1_rfc3966' => 'string',
    'phone_2_rfc3966' => 'string',
    'company_term_readable' => 'string',
    'preferred_payment_method_readable' => 'string',

    'companyContacts' => 'CompanyContact[]',
])]
class CompanyResource extends JsonResource
{
    public static $wrap = null;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            ...parent::toArray($request),

            'phone_1_readable' => (new PhoneNumber($this->phone_1, "INTERNATIONAL"))->format(PhoneNumberFormat::NATIONAL),
            'phone_2_readable' => (new PhoneNumber($this->phone_2, "INTERNATIONAL"))->format(PhoneNumberFormat::NATIONAL),

            'phone_1_rfc3966' => (new PhoneNumber($this->phone_1, "INTERNATIONAL"))->format(PhoneNumberFormat::RFC3966),
            'phone_2_rfc3966' => (new PhoneNumber($this->phone_2, "INTERNATIONAL"))->format(PhoneNumberFormat::RFC3966),

            'company_term_readable' => PaymentTermEnum::from($this->payment_terms)->readable(),
            'preferred_payment_method_readable' => PaymentMethodEnum::from($this->preferred_payment_method)->readable(),
        ];
    }
}
