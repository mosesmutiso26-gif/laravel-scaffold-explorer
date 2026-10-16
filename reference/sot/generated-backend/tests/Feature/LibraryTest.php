<?php

// generated_not_executed — Copilot must run these tests in a real Laravel installation

use App\Models\LibraryBook;
use App\Models\LibraryCopy;
use App\Models\Student;
use App\Services\LibraryCirculationService;
use App\Enums\LibraryCopyStatus;
use App\Enums\LoanStatus;
use App\Exceptions\BusinessRuleException;

test('can issue available copy to student', function () {
    $book = LibraryBook::factory()->create(['total_copies' => 1, 'available_copies' => 1]);
    $copy = $book->copies()->create(['copy_number' => 'C-001', 'status' => LibraryCopyStatus::Available->value]);
    $student = Student::factory()->create();
    $service = app(LibraryCirculationService::class);
    $loan = $service->issueLoan($copy->id, $student->id, 1, now()->addDays(14)->toDateString());
    expect($loan->status)->toBe(LoanStatus::OnLoan);
    expect($copy->fresh()->status)->toBe(LibraryCopyStatus::OnLoan);
});

test('cannot issue unavailable copy', function () {
    $book = LibraryBook::factory()->create();
    $copy = $book->copies()->create(['copy_number' => 'C-001', 'status' => LibraryCopyStatus::OnLoan->value]);
    $student = Student::factory()->create();
    $service = app(LibraryCirculationService::class);
    expect(fn() => $service->issueLoan($copy->id, $student->id, 1, now()->addDays(14)->toDateString()))
        ->toThrow(BusinessRuleException::class);
});

test('returning a loan marks copy as available', function () {
    $book = LibraryBook::factory()->create(['total_copies' => 1, 'available_copies' => 0]);
    $copy = $book->copies()->create(['copy_number' => 'C-001', 'status' => LibraryCopyStatus::OnLoan->value]);
    $student = Student::factory()->create();
    $loan = \App\Models\LibraryLoan::create([
        'copy_id' => $copy->id, 'student_id' => $student->id, 'issued_by' => 1,
        'issued_at' => now(), 'due_date' => now()->addDays(14), 'status' => LoanStatus::OnLoan,
    ]);
    $service = app(LibraryCirculationService::class);
    $service->returnLoan($loan->id, 1);
    expect($copy->fresh()->status)->toBe(LibraryCopyStatus::Available);
});

test('returning overdue loan creates fine', function () {
    $book = LibraryBook::factory()->create();
    $copy = $book->copies()->create(['copy_number' => 'C-001', 'status' => LibraryCopyStatus::OnLoan->value]);
    $student = Student::factory()->create();
    $loan = \App\Models\LibraryLoan::create([
        'copy_id' => $copy->id, 'student_id' => $student->id, 'issued_by' => 1,
        'issued_at' => now()->subDays(20), 'due_date' => now()->subDays(5), 'status' => LoanStatus::OnLoan,
    ]);
    $service = app(LibraryCirculationService::class);
    $service->returnLoan($loan->id, 1);
    $fine = \App\Models\LibraryFine::where('loan_id', $loan->id)->first();
    expect($fine)->not->toBeNull();
    expect((float) $fine->amount)->toBeGreaterThan(0);
});
