<?php

namespace App\Services;

use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Enums\InvoiceStatus;
use App\Events\InvoiceIssued;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class InvoiceService
{
    public function createInvoice(array $data): Invoice
    {
        return DB::transaction(function () use ($data): Invoice {
            $total = collect($data['items'])->sum('amount');
            $invoice = Invoice::create([
                'student_id' => $data['student_id'],
                'term_id' => $data['term_id'],
                'invoice_number' => 'INV-' . date('Y') . '-' . Str::padLeft(Invoice::count() + 1, 6, '0'),
                'total' => $total,
                'paid' => 0,
                'balance' => $total,
                'status' => InvoiceStatus::Issued,
                'issue_date' => now(),
                'due_date' => $data['due_date'],
                'created_by' => auth()->id(),
            ]);
            foreach ($data['items'] as $item) {
                InvoiceItem::create([
                    'invoice_id' => $invoice->id,
                    'description' => $item['description'],
                    'amount' => $item['amount'],
                    'fee_component' => $item['fee_component'] ?? null,
                ]);
            }
            event(new InvoiceIssued($invoice));
            return $invoice;
        });
    }
}
