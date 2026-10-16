<?php

namespace App\Services;

use App\Models\LibraryLoan;
use App\Models\LibraryCopy;
use App\Models\LibraryFine;
use App\Enums\LibraryCopyStatus;
use App\Enums\LoanStatus;
use App\Events\LibraryItemIssued;
use App\Events\LibraryItemReturned;
use Illuminate\Support\Facades\DB;
use App\Exceptions\BusinessRuleException;

class LibraryCirculationService
{
    public function issueLoan(int $copyId, int $studentId, int $issuedBy, string $dueDate): LibraryLoan
    {
        $copy = LibraryCopy::findOrFail($copyId);
        if ($copy->status !== LibraryCopyStatus::Available) {
            throw new BusinessRuleException('Copy is not available for loan.');
        }
        return DB::transaction(function () use ($copyId, $studentId, $issuedBy, $dueDate): LibraryLoan {
            $loan = LibraryLoan::create([
                'copy_id' => $copyId,
                'student_id' => $studentId,
                'issued_by' => $issuedBy,
                'issued_at' => now(),
                'due_date' => $dueDate,
                'status' => LoanStatus::OnLoan,
            ]);
            event(new LibraryItemIssued($loan));
            return $loan;
        });
    }

    public function returnLoan(int $loanId, int $receivedBy): LibraryLoan
    {
        $loan = LibraryLoan::findOrFail($loanId);
        if ($loan->status === LoanStatus::Returned) {
            throw new BusinessRuleException('Loan already returned.');
        }
        return DB::transaction(function () use ($loan, $receivedBy): LibraryLoan {
            $isOverdue = $loan->due_date < now()->toDateString();
            $loan->update([
                'status' => $isOverdue ? LoanStatus::Returned : LoanStatus::Returned,
                'returned_at' => now(),
                'received_by' => $receivedBy,
            ]);
            if ($isOverdue) {
                $daysLate = now()->diffInDays($loan->due_date);
                $fineAmount = $daysLate * 10; // KES 10 per day
                LibraryFine::create([
                    'loan_id' => $loan->id,
                    'student_id' => $loan->student_id,
                    'amount' => $fineAmount,
                    'status' => 'Unpaid',
                ]);
            }
            event(new LibraryItemReturned($loan));
            return $loan->fresh();
        });
    }
}
