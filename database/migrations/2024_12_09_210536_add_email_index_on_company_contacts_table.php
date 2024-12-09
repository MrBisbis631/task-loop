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
            if (Schema::hasColumn('company_contacts', 'email')) {
                $table->index('email', 'company_contacts_email_index');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('company_contacts', function (Blueprint $table) {
            if (Schema::hasIndex('company_contacts', 'company_contacts_email_index')) {
                $table->dropIndex('company_contacts_email_index');
            }
        });
    }
};
