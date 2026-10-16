<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AcademicYearFactory extends Factory
{
    public function definition(): array
    {
        $startYear = fake()->numberBetween(2024, 2028);
        return [
            'year' => "{$startYear}/" . ($startYear + 1),
            'start_date' => "{$startYear}-01-01",
            'end_date' => "{$startYear}-12-31",
            'is_current' => false,
        ];
    }
}
