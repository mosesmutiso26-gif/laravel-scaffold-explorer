<?php

namespace App\Jobs;

use App\Models\LibraryLoan;
use App\Models\Notification;
use App\Enums\LoanStatus;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendOverdueLibraryReminderJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;

    public function handle(): void
    {
        $overdueLoans = LibraryLoan::with(['student.guardians.user', 'copy.book'])
            ->where('status', LoanStatus::OnLoan)
            ->where('due_date', '<', now()->toDateString())
            ->get();
        foreach ($overdueLoans as $loan) {
            foreach ($loan->student->guardians as $guardian) {
                if ($guardian->user_id) {
                    Notification::create([
                        'user_id' => $guardian->user_id,
                        'type' => 'library.overdue',
                        'data' => [
                            'book' => $loan->copy->book->title,
                            'due_date' => $loan->due_date?->toDateString(),
                            'student' => $loan->student->fullName(),
                        ],
                    ]);
                }
            }
        }
    }
}
