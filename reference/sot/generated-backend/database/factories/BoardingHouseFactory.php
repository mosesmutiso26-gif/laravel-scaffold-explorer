<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BoardingHouseFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement(['Cedar House', 'Acacia House', 'Baobab House', 'Tamarind House']),
            'capacity' => fake()->numberBetween(40, 120),
            'gender' => fake()->randomElement(['Boys', 'Girls', 'Mixed']),
        ];
    }
}
