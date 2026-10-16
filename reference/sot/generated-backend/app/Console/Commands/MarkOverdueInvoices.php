<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Invoice;
use App\Enums\InvoiceStatus;

class MarkOverdueInvoices extends Command
{
    protected $signature = 'mark-overdue-invoices';
    protected $description = 'Mark invoices past due date as overdue';

    public function handle(): int
    {
        $count = Invoice::whereIn('status', [InvoiceStatus::Issued, InvoiceStatus::PartiallyPaid])
            ->where('due_date', '<', now()->toDateString())
            ->update(['status' => InvoiceStatus::Overdue]);
        $this->info("Marked {$count} invoice(s) as overdue.");
        return self::SUCCESS;
    }
}
