<?php

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
            if (Schema::hasColumn('company_contacts', 'last_contacted_at')) {
                $table->timestamp('last_contacted_at')->nullable()->change();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('company_contacts', function (Blueprint $table) {
            if (Schema::hasColumn('company_contacts', 'last_contacted_at')) {
                $table->timestamp('last_contacted_at')->change();
            }
        });
    }
};
