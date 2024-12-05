<?php

namespace App\Models;

use App\Enums\CompanyActivityStatusEnum;
use App\Enums\CompanyTypeEnum;
use App\Enums\PaymentMethodEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
    /** @use HasFactory<\Database\Factories\CompanyFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'phone_1',
        'phone_2',
        'email',
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

    public function companyContacts(): HasMany
    {
        return $this->hasMany(CompanyContact::class);
    }
}
