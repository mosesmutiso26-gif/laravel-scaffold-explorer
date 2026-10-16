<?php

namespace App\Listeners;

use App\Events\PaymentVerified;
use App\Models\AuditEntry;

class RecordPaymentAudit
{
    public function handle(PaymentVerified $event): void
    {
        AuditEntry::create([
            'actor_id' => $event->payment->received_by,
            'action' => 'payment.verified',
            'auditable_type' => get_class($event->payment),
            'auditable_id' => $event->payment->id,
            'after' => ['status' => 'Verified', 'amount' => $event->payment->amount],
        ]);
    }
}
