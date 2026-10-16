<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Student;
use App\Models\Term;
use App\Enums\InvoiceStatus;

class InvoiceFactory extends Factory
{
    public function definition(): array
    {
        $total = fake()->numberBetween(10000, 80000);
        return [
            'student_id' => Student::factory(),
            'term_id' => Term::factory(),
            'invoice_number' => 'INV-' . fake()->unique()->numberBetween(10000, 99999),
            'total' => $total,
            'paid' => 0,
            'balance' => $total,
            'status' => InvoiceStatus::Issued->value,
            'issue_date' => now()->format('Y-m-d'),
            'due_date' => now()->addDays(30)->format('Y-m-d'),
            'created_by' => 1,
        ];
    }
}
