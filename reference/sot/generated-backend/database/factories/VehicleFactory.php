<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class VehicleFactory extends Factory
{
    public function definition(): array
    {
        return [
            'registration' => 'K' . fake()->unique()->regexify('[A-Z]{3}[0-9]{3}'),
            'make' => fake()->randomElement(['Toyota', 'Nissan', 'Isuzu', 'Mitsubishi']),
            'model' => fake()->word(),
            'capacity' => fake()->numberBetween(14, 45),
            'type' => fake()->randomElement(['Bus', 'Van', 'Minibus']),
            'status' => 'Active',
        ];
    }
}
