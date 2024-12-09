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
            if (Schema::hasColumn('company_contacts', 'last_name')) {
                $table->index('last_name', 'company_contacts_last_name_index');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('company_contacts', function (Blueprint $table) {
            if (Schema::hasIndex('company_contacts', 'company_contacts_last_name_index')) {
                $table->dropIndex('company_contacts_last_name_index');
            }
        });
    }
};
