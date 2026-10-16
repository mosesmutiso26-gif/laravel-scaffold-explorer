<?php

namespace App\Services;

use App\Models\Payment;
use App\Models\PaymentAllocation;
use App\Enums\PaymentStatus;
use App\Enums\InvoiceStatus;
use App\Events\PaymentVerified;
use Illuminate\Support\Facades\DB;
use App\Exceptions\BusinessRuleException;

class PaymentService
{
    public function recordPayment(array $data): Payment
    {
        return DB::transaction(function () use ($data): Payment {
            $payment = Payment::create([
                'student_id' => $data['student_id'],
                'invoice_id' => $data['invoice_id'] ?? null,
                'reference' => $data['reference'],
                'amount' => $data['amount'],
                'method' => $data['method'],
                'status' => PaymentStatus::Pending,
                'idempotency_key' => $data['idempotency_key'] ?? null,
                'note' => $data['note'] ?? null,
                'received_by' => auth()->id(),
            ]);
            return $payment;
        });
    }

    public function verifyPayment(Payment $payment): Payment
    {
        if ($payment->status !== PaymentStatus::Pending) {
            throw new BusinessRuleException('Only pending payments can be verified.');
        }
        DB::transaction(function () use ($payment): void {
            $payment->update([
                'status' => PaymentStatus::Verified,
                'verified_at' => now(),
            ]);
            event(new PaymentVerified($payment));
        });
        return $payment->fresh();
    }

    public function reversePayment(Payment $payment): Payment
    {
        if ($payment->status !== PaymentStatus::Verified) {
            throw new BusinessRuleException('Only verified payments can be reversed.');
        }
        DB::transaction(function () use ($payment): void {
            PaymentAllocation::where('payment_id', $payment->id)->delete();
            $invoice = $payment->invoice;
            if ($invoice) {
                $invoice->paid = max(0, $invoice->paid - $payment->amount);
                $invoice->balance = $invoice->total - $invoice->paid;
                if ($invoice->paid == 0) {
                    $invoice->status = InvoiceStatus::Issued;
                } elseif ($invoice->balance > 0) {
                    $invoice->status = InvoiceStatus::PartiallyPaid;
                }
                $invoice->save();
            }
            $payment->update(['status' => PaymentStatus::Reversed]);
        });
        return $payment->fresh();
    }
}
