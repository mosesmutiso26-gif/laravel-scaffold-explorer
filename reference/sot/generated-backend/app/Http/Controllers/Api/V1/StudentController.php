<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\Api\V1\StoreStudentRequest;
use App\Http\Requests\Api\V1\UpdateStudentRequest;
use App\Http\Resources\Api\V1\StudentResource;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends BaseApiController
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Student::class);
        $query = Student::query()->with(['guardians', 'currentEnrolment.schoolClass']);
        if ($request->filled('status')) $query->where('status', $request->status);
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('admission_number', 'like', "%{$search}%");
            });
        }
        $students = $query->paginate($request->per_page ?? 20);
        return $this->paginated(StudentResource::class, $students);
    }

    public function store(StoreStudentRequest $request)
    {
        $this->authorize('create', Student::class);
        $student = Student::create($request->validated());
        return $this->success(new StudentResource($student), 'Student created', 201);
    }

    public function show(Student $student)
    {
        $this->authorize('view', $student);
        $student->load(['guardians', 'enrolments.schoolClass', 'invoices']);
        return $this->success(new StudentResource($student));
    }

    public function update(UpdateStudentRequest $request, Student $student)
    {
        $this->authorize('update', $student);
        $student->update($request->validated());
        return $this->success(new StudentResource($student), 'Student updated');
    }

    public function destroy(Student $student)
    {
        $this->authorize('delete', $student);
        $student->delete();
        return $this->success(null, 'Student deleted', 204);
    }

    public function invoices(Student $student)
    {
        $this->authorize('view', $student);
        return $this->success(\App\Http\Resources\Api\V1\InvoiceResource::collection($student->invoices));
    }

    public function attendance(Student $student)
    {
        $this->authorize('view', $student);
        return $this->success($student->attendanceRecords()->with('session')->get());
    }

    public function grades(Student $student)
    {
        $this->authorize('view', $student);
        return $this->success($student->grades()->with('assessment')->get());
    }
}
