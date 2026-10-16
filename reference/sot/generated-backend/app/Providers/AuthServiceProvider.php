<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\Student;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\Staff;
use App\Policies\StudentPolicy;
use App\Policies\InvoicePolicy;
use App\Policies\PaymentPolicy;
use App\Policies\StaffPolicy;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Student::class => StudentPolicy::class,
        Invoice::class => InvoicePolicy::class,
        Payment::class => PaymentPolicy::class,
        Staff::class => StaffPolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();
    }
}
