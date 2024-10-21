<?php

use App\Enums\CompanyActivityStatusEnum;
use App\Enums\CompanyTypeEnum;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            
            // general information
            $table->string('name');
            $table->string('phone_1')->nullable();
            $table->string('phone_2')->nullable();
            $table->timestamp('last_contacted_at');
            $table->string('activity_status')->default(CompanyActivityStatusEnum::ACTIVE->value);
            $table->string('company_type')->default(CompanyTypeEnum::SOLE_PROPRIETORSHIP->value)->comment('Type of legal situation of the company or define a private person (not a company)');
            $table->unsignedBigInteger('flags')->default(0);
            $table->string('website_url')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->string('facebook_url')->nullable();
            $table->string('instagram_url')->nullable();

            // localization
            $table->string('country', 2)->nullable()->comment('ISO 3166-1 alpha-2 country code');
            $table->string('state')->nullable();
            $table->string('zip_code')->nullable();
            $table->string('address_1')->nullable();
            $table->string('address_2')->nullable();

            // tax
            $table->string('tax_identification_number')->nullable()->comment('Tax Identification Number (TIN) - For invoicing and tax reporting.');
            $table->string('vat_number')->nullable()->comment('VAT Number (If applicable) - For value-added tax in countries that use it.');
            $table->string('tax_region_country')->nullable()->comment("Tax Region/Country - The location for determining tax rules (different countries/states may have different tax rates).");
            $table->string('tax_filing_category')->nullable()->comment('Tax Filing Category - Business, Individual, or other tax categories relevant to your freelance work.');
            $table->string('tax_documentation_url')->nullable()->comment('Tax Documentation - Links to references to uploaded tax forms, if required.');

            // payments
            $table->string('preferred_payment_method')->nullable()->comment('Preferred Payment Method - Bank transfer, PayPal, credit card, etc.');
            $table->string('bank_account_details')->nullable()->comment('Bank Account Details - IBAN, SWIFT, etc.');
            $table->string('billing_address')->nullable()->comment('Billing Address - If different from the company\'s main address');
            $table->string('payment_terms')->nullable()->comment('Payment Terms - Net 30, Net 60, etc. - standard time given for payment after the invoice date');
            $table->string('preferred_currency', 3)->nullable()->comment('CurrencyAlpha3 - ISO 4217 three-letter currency code');

            // relationships
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
