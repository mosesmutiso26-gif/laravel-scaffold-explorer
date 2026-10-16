<?php

namespace App\Observers;

use App\Models\Payment;
use App\Enums\PaymentStatus;
use App\Events\PaymentVerified;

class PaymentObserver
{
    public function updated(Payment $payment): void
    {
        if ($payment->wasChanged('status') && $payment->status === PaymentStatus::Verified) {
            event(new PaymentVerified($payment));
        }
    }
}
