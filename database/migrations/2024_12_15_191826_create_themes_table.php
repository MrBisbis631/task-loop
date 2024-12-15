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
        Schema::create('themes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->morphs('themeable');

            $table->boolean('is_default')->default(false);

            // colors
            $table->string('primary_color')->nullable();
            $table->string('secondary_color')->nullable();
            $table->string('trinary_color')->nullable();
            $table->string('primary_text_color')->nullable();
            $table->string('secondary_text_color')->nullable();
            $table->string('trinary_text_color')->nullable();
            $table->string('primary_background_color')->nullable();
            $table->string('secondary_background_color')->nullable();
            $table->string('trinary_background_color')->nullable();

            // fonts
            $table->string('default_font')->nullable();
            $table->string('headline_font')->nullable();

            // configurations
            $table->text('tailwind_config')->nullable();
            $table->text('custom_css')->nullable();

            // images
            $table->string('favicon')->nullable();
            $table->string('logo')->nullable();
            $table->string('dark_logo')->nullable();
            $table->string('small_logo')->nullable();
            $table->string('dark_small_logo')->nullable();

            // resources
            $table->string('icons_set')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('themes');
    }
};
