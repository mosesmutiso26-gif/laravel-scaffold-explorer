<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class StudentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'admission_number' => 'ADM-' . fake()->unique()->numberBetween(1000, 99999),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'date_of_birth' => fake()->dateTimeBetween('-18 years', '-5 years')->format('Y-m-d'),
            'gender' => fake()->randomElement(['Male', 'Female']),
            'nationality' => 'Kenyan',
            'mode' => fake()->randomElement(['Day', 'Boarding']),
            'status' => 'Active',
            'admission_date' => fake()->dateTimeBetween('-3 years', 'now')->format('Y-m-d'),
        ];
    }
}
