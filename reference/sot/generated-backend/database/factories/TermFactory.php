<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\AcademicYear;

class TermFactory extends Factory
{
    public function definition(): array
    {
        return [
            'academic_year_id' => AcademicYear::factory(),
            'name' => fake()->randomElement(['Term 1', 'Term 2', 'Term 3']),
            'start_date' => fake()->dateTimeBetween('-6 months', 'now')->format('Y-m-d'),
            'end_date' => fake()->dateTimeBetween('now', '+3 months')->format('Y-m-d'),
            'is_current' => false,
        ];
    }
}
