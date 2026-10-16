<?php

// generated_not_executed — Copilot must run these tests in a real Laravel installation

use App\Models\User;
use App\Models\Student;
use App\Models\Invoice;
use App\Models\Payment;
use App\Services\PaymentService;
use App\Enums\PaymentStatus;
use App\Enums\InvoiceStatus;
use App\Exceptions\BusinessRuleException;

test('login returns token and user', function () {
    $user = User::factory()->create(['password' => bcrypt('password')]);
    $response = $this->postJson('/api/v1/auth/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);
    $response->assertStatus(200)->assertJsonStructure(['success', 'data' => ['token', 'user']]);
});

test('login fails with wrong password', function () {
    $user = User::factory()->create();
    $response = $this->postJson('/api/v1/auth/login', [
        'email' => $user->email,
        'password' => 'wrongpassword',
    ]);
    $response->assertStatus(422);
});

test('me endpoint returns authenticated user', function () {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->getJson('/api/v1/auth/me');
    $response->assertStatus(200)->assertJsonPath('data.email', $user->email);
});

test('parent can only view their own children', function () {
    $parent = User::factory()->create();
    $parent->assignRole('Parent');
    $myStudent = Student::factory()->create();
    $otherStudent = Student::factory()->create();
    $guardian = \App\Models\Guardian::factory()->create(['user_id' => $parent->id]);
    $myStudent->guardians()->attach($guardian->id, ['relationship' => 'Father', 'is_primary' => true]);
    $response = $this->actingAs($parent)->getJson("/api/v1/students/{$myStudent->id}");
    $response->assertStatus(200);
    $response2 = $this->actingAs($parent)->getJson("/api/v1/students/{$otherStudent->id}");
    $response2->assertStatus(403);
});

test('payment verification updates invoice balance', function () {
    $student = Student::factory()->create();
    $term = \App\Models\Term::factory()->create();
    $invoice = Invoice::factory()->create(['student_id' => $student->id, 'term_id' => $term->id, 'total' => 50000, 'paid' => 0, 'balance' => 50000]);
    $payment = Payment::factory()->create(['student_id' => $student->id, 'invoice_id' => $invoice->id, 'amount' => 20000, 'status' => PaymentStatus::Pending]);
    $service = app(PaymentService::class);
    $service->verifyPayment($payment);
    expect($payment->fresh()->status)->toBe(PaymentStatus::Verified);
    expect((float) $invoice->fresh()->paid)->toBe(20000.0);
    expect($invoice->fresh()->status)->toBe(InvoiceStatus::PartiallyPaid);
});

test('payment reversal restores invoice balance', function () {
    $student = Student::factory()->create();
    $term = \App\Models\Term::factory()->create();
    $invoice = Invoice::factory()->create(['student_id' => $student->id, 'term_id' => $term->id, 'total' => 50000, 'paid' => 20000, 'balance' => 30000, 'status' => InvoiceStatus::PartiallyPaid]);
    $payment = Payment::factory()->create(['student_id' => $student->id, 'invoice_id' => $invoice->id, 'amount' => 20000, 'status' => PaymentStatus::Verified, 'verified_at' => now()]);
    $service = app(PaymentService::class);
    $service->reversePayment($payment);
    expect($payment->fresh()->status)->toBe(PaymentStatus::Reversed);
    expect((float) $invoice->fresh()->paid)->toBe(0.0);
});

test('cannot verify already verified payment', function () {
    $payment = Payment::factory()->create(['status' => PaymentStatus::Verified, 'verified_at' => now()]);
    $service = app(PaymentService::class);
    expect(fn() => $service->verifyPayment($payment))->toThrow(BusinessRuleException::class);
});

test('admin can list all students', function () {
    $admin = User::factory()->create();
    $admin->assignRole('Administrator');
    Student::factory()->count(5)->create();
    $response = $this->actingAs($admin)->getJson('/api/v1/students');
    $response->assertStatus(200);
});

test('student store validates admission number uniqueness', function () {
    $admin = User::factory()->create();
    $admin->assignRole('Administrator');
    $existing = Student::factory()->create();
    $response = $this->actingAs($admin)->postJson('/api/v1/students', [
        'admission_number' => $existing->admission_number,
        'first_name' => 'Test',
        'last_name' => 'Student',
        'date_of_birth' => '2010-01-01',
        'gender' => 'Male',
        'mode' => 'Day',
        'admission_date' => '2026-01-06',
    ]);
    $response->assertStatus(422);
});
