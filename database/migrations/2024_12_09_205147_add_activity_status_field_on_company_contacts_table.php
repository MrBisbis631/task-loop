<?php

use App\Enums\CompanyContactActivityStatusEnum;
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
        Schema::table('company_contacts', function (Blueprint $table) {
            $table->string('activity_status')->default(CompanyContactActivityStatusEnum::ACTIVE->value);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('company_contacts', function (Blueprint $table) {
            $table->dropColumn('activity_status');
        });
    }
};
