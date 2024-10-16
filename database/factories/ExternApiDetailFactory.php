<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ExternApiDetail>
 */
class ExternApiDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'expires_at' => now()->addDays(rand(-50, 100)),
            'api_name' => $this->faker->word,
            'api_username' => $this->faker->userName,
            'label' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'api_token' => $this->faker->sha256,
            'api_secret' => $this->faker->sha256,
        ];
    }
}
