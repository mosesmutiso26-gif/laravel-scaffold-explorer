<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class InventoryItemFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'sku' => 'SKU-' . fake()->unique()->numberBetween(1000, 99999),
            'category' => fake()->randomElement(['Stationery', 'Cleaning', 'Lab Supplies', 'Sports', 'Office']),
            'unit' => 'pcs',
            'quantity_on_hand' => fake()->numberBetween(0, 500),
            'reorder_level' => fake()->numberBetween(10, 50),
            'unit_price' => fake()->numberBetween(50, 5000),
            'location' => 'WH-' . fake()->numberBetween(1, 10),
            'status' => 'Active',
        ];
    }
}
