<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\Api\V1\InvoiceResource;
use App\Models\Invoice;
use App\Services\InvoiceService;
use Illuminate\Http\Request;

class InvoiceController extends BaseApiController
{
    public function __construct(private InvoiceService $invoiceService) {}

    public function index(Request $request)
    {
        $this->authorize('viewAny', Invoice::class);
        $query = Invoice::query()->with(['student', 'term', 'items']);
        if ($request->filled('student_id')) $query->where('student_id', $request->student_id);
        if ($request->filled('status')) $query->where('status', $request->status);
        if ($request->filled('term_id')) $query->where('term_id', $request->term_id);
        $invoices = $query->paginate($request->per_page ?? 20);
        return $this->paginated(InvoiceResource::class, $invoices);
    }

    public function show(Invoice $invoice)
    {
        $this->authorize('view', $invoice);
        $invoice->load(['student', 'term', 'items', 'payments']);
        return $this->success(new InvoiceResource($invoice));
    }

    public function store(Request $request)
    {
        $this->authorize('create', Invoice::class);
        $validated = $request->validate([
            'student_id' => ['required', 'exists:students,id'],
            'term_id' => ['required', 'exists:terms,id'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.description' => ['required', 'string'],
            'items.*.amount' => ['required', 'numeric', 'min:0'],
            'items.*.fee_component' => ['nullable', 'string'],
            'due_date' => ['required', 'date'],
        ]);
        $invoice = $this->invoiceService->createInvoice($validated);
        return $this->success(new InvoiceResource($invoice), 'Invoice created', 201);
    }
}
