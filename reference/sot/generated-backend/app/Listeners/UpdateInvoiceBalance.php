<?php

namespace App\Listeners;

use App\Events\PaymentVerified;
use App\Models\Invoice;
use App\Models\PaymentAllocation;
use App\Enums\InvoiceStatus;

class UpdateInvoiceBalance
{
    public function handle(PaymentVerified $event): void
    {
        $payment = $event->payment;
        $invoice = $payment->invoice;
        if (!$invoice) return;
        \DB::transaction(function () use ($payment, $invoice): void {
            $existingAllocation = PaymentAllocation::where('payment_id', $payment->id)
                ->where('invoice_id', $invoice->id)->first();
            if (!$existingAllocation) {
                PaymentAllocation::create([
                    'payment_id' => $payment->id,
                    'invoice_id' => $invoice->id,
                    'amount' => min($payment->amount, $invoice->balance),
                ]);
            }
            $totalAllocated = PaymentAllocation::where('invoice_id', $invoice->id)->sum('amount');
            $invoice->paid = $totalAllocated;
            $invoice->balance = $invoice->total - $totalAllocated;
            if ($invoice->balance <= 0) {
                $invoice->status = InvoiceStatus::Paid;
            } elseif ($invoice->paid > 0) {
                $invoice->status = InvoiceStatus::PartiallyPaid;
            }
            $invoice->save();
        });
    }
}
