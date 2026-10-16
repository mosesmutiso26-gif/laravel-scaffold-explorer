<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ScienceEquipment;

class ScienceEquipmentFactory extends Factory
{
    protected $model = ScienceEquipment::class;

    public function definition(): array
    {
        return [
            'science_lab_id' => ScienceLab::factory(),
            'item_code' => 'EQ-' . fake()->unique()->numberBetween(1000, 99999),
            'name' => fake()->word() . ' apparatus',
            'category' => fake()->randomElement(['Glassware', 'Instruments', 'Chemicals', 'Tools']),
            'quantity_available' => fake()->numberBetween(5, 100),
            'quantity_reserved' => 0,
            'quantity_damaged' => 0,
            'condition' => 'good',
            'reorder_threshold' => 5,
        ];
    }
}
