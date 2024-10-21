<?php

namespace Database\Factories;

use App\Enums\CompanyActivityStatusEnum;
use App\Enums\CompanyTypeEnum;
use App\Enums\PaymentMethodEnum;
use App\Enums\PaymentTermEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company,
            'phone_1' => $this->faker->phoneNumber,
            'phone_2' => $this->faker->phoneNumber,
            'last_contacted_at' => $this->faker->dateTime,
            'activity_status' => $this->faker->randomElement(CompanyActivityStatusEnum::cases()),
            'company_type' => $this->faker->randomElement(CompanyTypeEnum::cases()),
            'flags' => $this->faker->randomDigit,
            'website_url' => $this->faker->url,
            'linkedin_url' => $this->faker->url,
            'facebook_url' => $this->faker->url,
            'instagram_url' => $this->faker->url,
            'country' => $this->faker->countryCode,
            'state' => $this->faker->state,
            'zip_code' => $this->faker->postcode,
            'address_1' => $this->faker->streetAddress,
            'address_2' => $this->faker->secondaryAddress,
            'tax_identification_number' => $this->faker->regexify('[A-Z0-9]{10}'),
            'vat_number' => $this->faker->regexify('[A-Z0-9]{12}'),
            'tax_region_country' => $this->faker->countryCode,
            'tax_filing_category' => $this->faker->randomElement(['standard', 'reduced', 'exempt']),
            'tax_documentation_url' => $this->faker->url,
            'preferred_payment_method' => $this->faker->randomElement(PaymentMethodEnum::cases()),
            'bank_account_details' => $this->faker->bankAccountNumber,
            'billing_address' => $this->faker->address,
            'payment_terms' => $this->faker->randomElement(PaymentTermEnum::cases()),
            'preferred_currency' => $this->faker->currencyCode,
        ];
    }
}
