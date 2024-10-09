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
        Schema::table('extern_api_details', function (Blueprint $table) {
            $table->text('api_token')->nullable()->change();
            $table->text('api_secret')->nullable()->change();
            $table->text('description')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('extern_api_details', function (Blueprint $table) {
            $table->string('api_token')->nullable()->change();
            $table->string('api_secret')->nullable()->change();
            $table->string('description')->nullable()->change();
        });
    }
};
