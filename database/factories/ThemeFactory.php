<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Theme>
 */
class ThemeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'primary_color' => $this->faker->hexColor,
            'secondary_color' => $this->faker->hexColor,
            'trinary_color' => $this->faker->hexColor,
            'primary_text_color' => $this->faker->hexColor,
            'secondary_text_color' => $this->faker->hexColor,
            'trinary_text_color' => $this->faker->hexColor,
            'primary_background_color' => $this->faker->hexColor,
            'secondary_background_color' => $this->faker->hexColor,
            'trinary_background_color' => $this->faker->hexColor,
            'default_font' => $this->faker->word,
            'headline_font' => $this->faker->word,
            'tailwind_config' => $this->faker->text,
            'custom_css' => $this->faker->text,
            'favicon' => $this->faker->imageUrl,
            'logo' => $this->faker->imageUrl,
            'dark_logo' => $this->faker->imageUrl,
            'small_logo' => $this->faker->imageUrl,
            'dark_small_logo' => $this->faker->imageUrl,
            'icons_set' => $this->faker->word,
        ];
    }
}
