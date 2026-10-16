<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\HrLeaveRequest;
use App\Models\HrPayrollRun;
use App\Enums\LeaveRequestStatus;
use Illuminate\Http\Request;

class HrController extends BaseApiController
{
    public function index(Request $request)
    {
        if ($request->route()->named('hr-leave-requests.index')) {
            return $this->leaveIndex($request);
        }
        return $this->payrollIndex($request);
    }

    protected function leaveIndex(Request $request)
    {
        $query = HrLeaveRequest::query()->with(['staff', 'approvedBy']);
        if ($request->filled('staff_id')) $query->where('staff_id', $request->staff_id);
        if ($request->filled('status')) $query->where('status', $request->status);
        $leaves = $query->paginate($request->per_page ?? 20);
        return $this->success($leaves->items());
    }

    protected function payrollIndex(Request $request)
    {
        $runs = HrPayrollRun::query()->with(['payslips.staff'])->paginate($request->per_page ?? 20);
        return $this->success($runs->items());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'staff_id' => ['required', 'exists:staff,id'],
            'type' => ['required', 'in:Annual,Sick,Personal,Maternity,Compassionate'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'reason' => ['nullable', 'string'],
        ]);
        $validated['days'] = now()->parse($validated['start_date'])->diffInDays($validated['end_date']) + 1;
        $validated['status'] = LeaveRequestStatus::Pending->value;
        $leave = HrLeaveRequest::create($validated);
        return $this->success($leave, 'Leave request created', 201);
    }

    public function approveLeave(Request $request, HrLeaveRequest $leave)
    {
        if ($leave->status !== LeaveRequestStatus::Pending) {
            return $this->error('Only pending requests can be approved.', 409);
        }
        $leave->update([
            'status' => LeaveRequestStatus::Approved,
            'approved_by' => auth()->user()->staff?->id ?? 1,
            'approved_at' => now(),
        ]);
        return $this->success($leave, 'Leave approved');
    }

    public function show($id)
    {
        $leave = HrLeaveRequest::with(['staff', 'approvedBy'])->findOrFail($id);
        return $this->success($leave);
    }

    public function update(Request $request, $id)
    {
        $leave = HrLeaveRequest::findOrFail($id);
        $leave->update($request->only(['type', 'start_date', 'end_date', 'reason', 'status']));
        return $this->success($leave, 'Leave updated');
    }

    public function destroy($id)
    {
        HrLeaveRequest::findOrFail($id)->delete();
        return $this->success(null, 'Leave deleted', 204);
    }
}
