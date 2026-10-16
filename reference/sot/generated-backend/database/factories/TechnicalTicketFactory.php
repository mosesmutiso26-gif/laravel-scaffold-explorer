<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\TechnicalTicket;

class TechnicalTicketFactory extends Factory
{
    protected $model = TechnicalTicket::class;

    public function definition(): array
    {
        return [
            'workstation_id' => \App\Models\Workstation::factory(),
            'reported_by' => \App\Models\User::factory(),
            'description' => fake()->sentence(),
            'priority' => fake()->randomElement(['low', 'medium', 'high', 'critical']),
            'status' => 'open',
        ];
    }
}
