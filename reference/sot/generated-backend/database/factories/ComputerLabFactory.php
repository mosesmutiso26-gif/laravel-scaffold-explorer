<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ComputerLab;

class ComputerLabFactory extends Factory
{
    protected $model = ComputerLab::class;

    public function definition(): array
    {
        return [
            'name' => 'ICT Lab ' . fake()->unique()->numberBetween(1, 99),
            'code' => 'ICT-' . fake()->unique()->numberBetween(100, 999),
            'building' => 'ICT Block',
            'capacity' => fake()->numberBetween(20, 40),
            'status' => 'active',
        ];
    }
}
