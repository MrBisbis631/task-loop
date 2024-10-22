<?php

use App\Models\Company;
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
        Schema::create('company_contacts', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('title')->nullable();
            $table->string('job_title')->nullable();
            $table->string('preferred_contact_method')->nullable();

            $table->json('notes')->nullable();
            $table->timestamp('last_contacted_at');

            // relationships
            $table->foreignIdFor(Company::class)->constrained()->cascadeOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_contacts');
    }
};
