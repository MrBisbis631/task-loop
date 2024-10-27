<?php

namespace Database\Factories;

use App\Enums\ContactMethodEnum;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CompanyContact>
 */
class CompanyContactFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'phone' => $this->faker->e164PhoneNumber,
            'title' => $this->faker->title,
            'job_title' => $this->faker->jobTitle,
            'preferred_contact_method' => $this->faker->randomElement(ContactMethodEnum::cases()),
            'last_contacted_at' => $this->faker->dateTimeThisYear,
            'notes' => Arr::map(array_fill(0, $this->faker->numberBetween(0, 3), 1), fn() => [
                'created_at' => $this->faker->dateTimeThisYear,
                'title' => $this->faker,
                'content' => $this->faker->paragraph(2),
            ]),
        ];
    }
}
