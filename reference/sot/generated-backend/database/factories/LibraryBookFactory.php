<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class LibraryBookFactory extends Factory
{
    public function definition(): array
    {
        return [
            'isbn' => fake()->unique()->isbn13(),
            'title' => fake()->sentence(4),
            'author' => fake()->name(),
            'publisher' => fake()->company(),
            'category' => fake()->randomElement(['Fiction', 'Science', 'Mathematics', 'History', 'Language']),
            'publication_year' => fake()->numberBetween(2000, 2025),
            'total_copies' => fake()->numberBetween(1, 10),
            'shelf_location' => 'S-' . fake()->numberBetween(1, 50),
        ];
    }
}
