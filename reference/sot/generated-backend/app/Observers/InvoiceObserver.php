<?php

namespace App\Observers;

use App\Models\Invoice;
use App\Enums\InvoiceStatus;

class InvoiceObserver
{
    public function saving(Invoice $invoice): void
    {
        $balance = $invoice->total - $invoice->paid;
        $invoice->balance = $balance;
        if ($invoice->paid > 0 && $balance > 0) {
            $invoice->status = InvoiceStatus::PartiallyPaid;
        } elseif ($balance <= 0 && $invoice->paid > 0) {
            $invoice->status = InvoiceStatus::Paid;
        }
    }
}
