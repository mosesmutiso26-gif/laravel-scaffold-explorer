<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class StaffFactory extends Factory
{
    public function definition(): array
    {
        return [
            'employee_number' => 'EMP-' . fake()->unique()->numberBetween(100, 99999),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'phone' => fake()->phoneNumber(),
            'email' => fake()->safeEmail(),
            'type' => fake()->randomElement(['Teaching', 'Support', 'Administrative']),
            'status' => 'Active',
            'hire_date' => fake()->dateTimeBetween('-10 years', 'now')->format('Y-m-d'),
            'salary' => fake()->numberBetween(30000, 150000),
        ];
    }
}
