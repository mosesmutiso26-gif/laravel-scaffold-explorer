<?php

// generated_not_executed

use App\Models\User;
use App\Services\PaymentService;
use App\Enums\PaymentStatus;
use App\Exceptions\BusinessRuleException;

test('payment service verify requires pending status', function () {
    $payment = \App\Models\Payment::factory()->create(['status' => PaymentStatus::Verified, 'verified_at' => now()]);
    $service = app(PaymentService::class);
    expect(fn() => $service->verifyPayment($payment))->toThrow(BusinessRuleException::class);
});

test('payment service reverse requires verified status', function () {
    $payment = \App\Models\Payment::factory()->create(['status' => PaymentStatus::Pending]);
    $service = app(PaymentService::class);
    expect(fn() => $service->reversePayment($payment))->toThrow(BusinessRuleException::class);
});
