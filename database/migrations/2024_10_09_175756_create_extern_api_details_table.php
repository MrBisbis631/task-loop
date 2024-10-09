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
        Schema::create('extern_api_details', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->timestamp('expires_at')->nullable();

            $table->string('api_token')->nullable();
            $table->string('api_secret')->nullable();
            $table->string('api_name')->nullable();

            $table->string('label')->nullable();
            $table->string('description')->nullable();

            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->index(['user_id', 'api_name'], 'user_api_name_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('extern_api_details');
    }
};
