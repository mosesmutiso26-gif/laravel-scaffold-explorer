<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use App\Events\PaymentVerified;
use App\Events\StudentAdmitted;
use App\Events\InvoiceIssued;
use App\Events\LibraryItemIssued;
use App\Events\LibraryItemReturned;
use App\Listeners\RecordPaymentAudit;
use App\Listeners\NotifyStudentGuardians;
use App\Listeners\UpdateInvoiceBalance;
use App\Listeners\MarkCopyAsOnLoan;
use App\Listeners\MarkCopyAsAvailable;
use App\Listeners\SendInvoiceNotification;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        PaymentVerified::class => [
            RecordPaymentAudit::class,
            UpdateInvoiceBalance::class,
        ],
        StudentAdmitted::class => [
            NotifyStudentGuardians::class,
        ],
        InvoiceIssued::class => [
            SendInvoiceNotification::class,
        ],
        LibraryItemIssued::class => [
            MarkCopyAsOnLoan::class,
        ],
        LibraryItemReturned::class => [
            MarkCopyAsAvailable::class,
        ],
    ];

    public function boot(): void
    {
        //
    }
}
