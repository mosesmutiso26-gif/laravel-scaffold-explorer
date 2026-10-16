<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ScienceLab;

class ScienceLabFactory extends Factory
{
    protected $model = ScienceLab::class;

    public function definition(): array
    {
        return [
            'name' => 'Lab ' . fake()->unique()->word(),
            'code' => 'LAB-' . fake()->unique()->numberBetween(100, 999),
            'building' => 'Science Block',
            'type' => fake()->randomElement(['chemistry', 'biology', 'physics', 'general_science']),
            'capacity' => fake()->numberBetween(20, 40),
            'status' => 'active',
        ];
    }
}
