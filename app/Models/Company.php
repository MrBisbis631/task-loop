<?php

namespace App\Models;

use App\Enums\CompanyActivityStatusEnum;
use App\Enums\CompanyTypeEnum;
use App\Enums\PaymentMethodEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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
])]
class Company extends Model
{
    /** @use HasFactory<\Database\Factories\CompanyFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'phone_1',
        'phone_2',
        'last_contacted_at',
        'activity_status',
        'company_type',
        'flags',
        'website_url',
        'linkedin_url',
        'facebook_url',
        'instagram_url',
        'country',
        'state',
        'zip_code',
        'address_1',
        'address_2',
        'tax_identification_number',
        'vat_number',
        'tax_region_country',
        'tax_filing_category',
        'tax_documentation_url',
        'preferred_payment_method',
        'bank_account_details',
        'billing_address',
        'payment_terms',
        'preferred_currency',
    ];

    protected $cast = [
        'activity_status' => CompanyActivityStatusEnum::class,
        'company_type' => CompanyTypeEnum::class,
        'preferred_payment_method' => PaymentMethodEnum::class,
        'last_contacted_at' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
