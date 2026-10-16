<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SportFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement(['Football', 'Basketball', 'Rugby', 'Athletics', 'Swimming', 'Volleyball']),
            'season' => fake()->randomElement(['Term 1', 'Term 2', 'Term 3', 'Year-round']),
            'status' => 'Active',
        ];
    }
}
