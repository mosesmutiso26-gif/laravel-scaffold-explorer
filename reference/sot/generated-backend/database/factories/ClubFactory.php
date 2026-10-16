<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Club;

class ClubFactory extends Factory
{
    protected $model = Club::class;

    public function definition(): array
    {
        return [
            'name' => fake()->unique()->words(2, true) . ' Club',
            'code' => 'CLB-' . fake()->unique()->numberBetween(100, 999),
            'activity_category_id' => \App\Models\ActivityCategory::factory(),
            'academic_year_id' => 1,
            'membership_capacity' => fake()->numberBetween(20, 50),
            'status' => 'active',
        ];
    }
}
