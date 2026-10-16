<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\Student;
use App\Observers\InvoiceObserver;
use App\Observers\PaymentObserver;
use App\Observers\StudentObserver;

class ObserverServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Invoice::observe(InvoiceObserver::class);
        Payment::observe(PaymentObserver::class);
        Student::observe(StudentObserver::class);
    }
}
