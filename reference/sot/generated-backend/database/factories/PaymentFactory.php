<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Student;
use App\Models\Invoice;
use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;

class PaymentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'student_id' => Student::factory(),
            'invoice_id' => Invoice::factory(),
            'reference' => 'PAY-' . fake()->unique()->numberBetween(10000, 99999),
            'amount' => fake()->numberBetween(5000, 50000),
            'method' => fake()->randomElement(PaymentMethod::cases())->value,
            'status' => PaymentStatus::Pending->value,
            'received_by' => 1,
        ];
    }
}
