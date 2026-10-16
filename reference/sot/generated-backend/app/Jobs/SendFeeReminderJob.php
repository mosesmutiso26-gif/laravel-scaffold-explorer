<?php

namespace App\Jobs;

use App\Models\Invoice;
use App\Models\Notification;
use App\Enums\InvoiceStatus;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendFeeReminderJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;

    public function handle(): void
    {
        $overdueInvoices = Invoice::with(['student.guardians.user'])
            ->whereIn('status', [InvoiceStatus::Issued, InvoiceStatus::PartiallyPaid, InvoiceStatus::Overdue])
            ->where('due_date', '<', now()->addDays(7)->toDateString())
            ->get();
        foreach ($overdueInvoices as $invoice) {
            foreach ($invoice->student->guardians as $guardian) {
                if ($guardian->user_id) {
                    Notification::create([
                        'user_id' => $guardian->user_id,
                        'type' => 'fee.reminder',
                        'data' => [
                            'invoice_number' => $invoice->invoice_number,
                            'balance' => (float) $invoice->balance,
                            'due_date' => $invoice->due_date?->toDateString(),
                        ],
                    ]);
                }
            }
        }
    }
}
