<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Student;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\Enrolment;
use App\Enums\InvoiceStatus;
use App\Enums\PaymentStatus;
use Illuminate\Http\Request;

class ReportController extends BaseApiController
{
    public function attendance(Request $request)
    {
        $validated = $request->validate([
            'class_id' => ['nullable', 'exists:classes,id'],
            'from' => ['nullable', 'date'],
            'to' => ['nullable', 'date'],
        ]);
        // Returns attendance summary — Copilot should add charting aggregation
        return $this->success(['report' => 'attendance', 'filters' => $validated]);
    }

    public function finance(Request $request)
    {
        $totalInvoiced = Invoice::sum('total');
        $totalCollected = Payment::where('status', PaymentStatus::Verified)->sum('amount');
        $outstanding = Invoice::whereNotIn('status', [InvoiceStatus::Paid, InvoiceStatus::Cancelled])->sum('balance');
        $overdue = Invoice::where('status', InvoiceStatus::Overdue)->sum('balance');
        return $this->success([
            'total_invoiced' => (float) $totalInvoiced,
            'total_collected' => (float) $totalCollected,
            'outstanding' => (float) $outstanding,
            'overdue' => (float) $overdue,
        ]);
    }

    public function enrollment(Request $request)
    {
        $totalStudents = Student::where('status', 'Active')->count();
        $byClass = Enrolment::where('status', 'Active')->with('schoolClass')->get()
            ->groupBy(fn($e) => $e->schoolClass?->name)
            ->map(fn($g) => $g->count());
        return $this->success([
            'total_students' => $totalStudents,
            'by_class' => $byClass,
        ]);
    }
}
