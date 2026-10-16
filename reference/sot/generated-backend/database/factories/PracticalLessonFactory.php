<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\PracticalLesson;

class PracticalLessonFactory extends Factory
{
    protected $model = PracticalLesson::class;

    public function definition(): array
    {
        return [
            'title' => 'Practical: ' . fake()->words(3, true),
            'learning_objectives' => fake()->sentence(),
            'status' => 'draft',
        ];
    }
}
