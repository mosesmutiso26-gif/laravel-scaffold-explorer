<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Workstation;

class WorkstationFactory extends Factory
{
    protected $model = Workstation::class;

    public function definition(): array
    {
        return [
            'computer_lab_id' => ComputerLab::factory(),
            'workstation_number' => 'WS-' . fake()->unique()->numberBetween(1, 999),
            'device_status' => 'operational',
            'workstation_status' => 'available',
        ];
    }
}
