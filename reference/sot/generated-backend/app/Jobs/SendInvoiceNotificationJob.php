<?php

namespace App\Jobs;

use App\Models\Invoice;
use App\Models\Notification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendInvoiceNotificationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $backoff = 30;

    public function __construct(public int $invoiceId) {}

    public function handle(): void
    {
        $invoice = Invoice::with('student.guardians.user')->find($this->invoiceId);
        if (!$invoice) return;
        foreach ($invoice->student->guardians as $guardian) {
            if ($guardian->user_id) {
                Notification::create([
                    'user_id' => $guardian->user_id,
                    'type' => 'invoice.issued',
                    'data' => [
                        'invoice_number' => $invoice->invoice_number,
                        'amount' => (float) $invoice->total,
                        'due_date' => $invoice->due_date?->toDateString(),
                    ],
                ]);
            }
        }
    }
}
