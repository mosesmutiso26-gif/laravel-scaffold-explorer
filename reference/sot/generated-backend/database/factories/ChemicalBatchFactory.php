<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ChemicalBatch;

class ChemicalBatchFactory extends Factory
{
    protected $model = ChemicalBatch::class;

    public function definition(): array
    {
        return [
            'science_equipment_id' => \App\Models\ScienceEquipment::factory(),
            'batch_number' => 'BATCH-' . fake()->unique()->numberBetween(1000, 99999),
            'quantity' => fake()->numberBetween(1, 50),
            'unit_of_measure' => 'ml',
            'expiry_date' => fake()->dateTimeBetween('-1 month', '+2 years')->format('Y-m-d'),
            'hazard_level' => fake()->randomElement(['low', 'medium', 'high']),
            'disposal_status' => 'not_required',
        ];
    }
}
