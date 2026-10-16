<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\Api\V1\UserResource;
use App\Models\Staff;
use Illuminate\Http\Request;

class StaffController extends BaseApiController
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Staff::class);
        $query = Staff::query()->with(['department', 'teacher']);
        if ($request->filled('type')) $query->where('type', $request->type);
        if ($request->filled('status')) $query->where('status', $request->status);
        $staff = $query->paginate($request->per_page ?? 20);
        return $this->success($staff->items(), 'Staff list', 200);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Staff::class);
        $validated = $request->validate([
            'user_id' => ['nullable', 'exists:users,id'],
            'department_id' => ['nullable', 'exists:departments,id'],
            'employee_number' => ['required', 'string', 'unique:staff,employee_number'],
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'phone' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'email'],
            'type' => ['required', 'in:Teaching,Support,Administrative'],
            'hire_date' => ['required', 'date'],
            'salary' => ['nullable', 'numeric', 'min:0'],
        ]);
        $staff = Staff::create($validated);
        return $this->success($staff, 'Staff created', 201);
    }

    public function show(Staff $staff)
    {
        $this->authorize('view', $staff);
        $staff->load(['department', 'teacher']);
        return $this->success($staff);
    }

    public function update(Request $request, Staff $staff)
    {
        $this->authorize('update', $staff);
        $staff->update($request->only(['first_name', 'last_name', 'phone', 'email', 'type', 'status', 'salary', 'department_id']));
        return $this->success($staff, 'Staff updated');
    }

    public function destroy(Staff $staff)
    {
        $this->authorize('delete', $staff);
        $staff->delete();
        return $this->success(null, 'Staff deleted', 204);
    }
}
