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
        Schema::create('phones', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->numericMorphs('phoneable', 'phoneable_index');

            $table->string('phone_number');
            $table->string('label')->nullable();

            $table->timestamp('verified_at')->nullable();
            $table->boolean('is_default')->default(false);

            // used for flagging "do not call" or "do not text" or "has whatsapp"
            $table->unsignedInteger('flags')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('phones');
    }
};
