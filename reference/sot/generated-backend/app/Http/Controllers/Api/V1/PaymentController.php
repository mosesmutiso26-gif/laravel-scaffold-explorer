<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\Api\V1\PaymentResource;
use App\Models\Payment;
use App\Services\PaymentService;
use Illuminate\Http\Request;

class PaymentController extends BaseApiController
{
    public function __construct(private PaymentService $paymentService) {}

    public function index(Request $request)
    {
        $this->authorize('viewAny', Payment::class);
        $query = Payment::query()->with(['student', 'invoice', 'receivedBy']);
        if ($request->filled('student_id')) $query->where('student_id', $request->student_id);
        if ($request->filled('status')) $query->where('status', $request->status);
        $payments = $query->paginate($request->per_page ?? 20);
        return $this->paginated(PaymentResource::class, $payments);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Payment::class);
        $validated = $request->validate([
            'student_id' => ['required', 'exists:students,id'],
            'invoice_id' => ['nullable', 'exists:invoices,id'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'method' => ['required', 'in:M-Pesa,Bank Transfer,Cash,Cheque'],
            'reference' => ['required', 'string', 'unique:payments,reference'],
            'idempotency_key' => ['nullable', 'string', 'unique:payments,idempotency_key'],
            'note' => ['nullable', 'string'],
        ]);
        $payment = $this->paymentService->recordPayment($validated);
        return $this->success(new PaymentResource($payment), 'Payment recorded', 201);
    }

    public function verify(Payment $payment)
    {
        $this->authorize('verify', $payment);
        $verified = $this->paymentService->verifyPayment($payment);
        return $this->success(new PaymentResource($verified), 'Payment verified');
    }

    public function reverse(Payment $payment)
    {
        $this->authorize('reverse', $payment);
        $reversed = $this->paymentService->reversePayment($payment);
        return $this->success(new PaymentResource($reversed), 'Payment reversed');
    }
}
