<?php

namespace App\Listeners;

use App\Events\InvoiceIssued;

class SendInvoiceNotification
{
    public function handle(InvoiceIssued $event): void
    {
        // Queue a notification job to inform guardians of the new invoice
        // \App\Jobs\SendInvoiceNotificationJob::dispatch($event->invoice);
    }
}
