<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Assessment;
use App\Models\Grade;
use App\Enums\AssessmentStatus;
use App\Enums\GradeStatus;
use Illuminate\Http\Request;
use App\Exceptions\BusinessRuleException;

class AssessmentController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = Assessment::query()->with(['subject', 'schoolClass', 'term']);
        if ($request->filled('class_id')) $query->where('class_id', $request->class_id);
        if ($request->filled('term_id')) $query->where('term_id', $request->term_id);
        if ($request->filled('subject_id')) $query->where('subject_id', $request->subject_id);
        $assessments = $query->paginate($request->per_page ?? 20);
        return $this->success($assessments->items());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'subject_id' => ['required', 'exists:subjects,id'],
            'class_id' => ['required', 'exists:classes,id'],
            'term_id' => ['required', 'exists:terms,id'],
            'name' => ['required', 'string'],
            'type' => ['required', 'in:Quiz,CAT,Exam,Project,Assignment'],
            'max_score' => ['nullable', 'numeric', 'min:1'],
            'weight' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'date' => ['required', 'date'],
        ]);
        $validated['created_by'] = auth()->user()->staff?->id ?? 1;
        $validated['status'] = AssessmentStatus::Draft->value;
        $assessment = Assessment::create($validated);
        return $this->success($assessment, 'Assessment created', 201);
    }

    public function show(Assessment $assessment)
    {
        $assessment->load(['subject', 'schoolClass', 'term', 'grades.student']);
        return $this->success($assessment);
    }

    public function storeGrades(Request $request, Assessment $assessment)
    {
        if ($assessment->status === AssessmentStatus::Draft) {
            throw new BusinessRuleException('Cannot enter grades for a draft assessment. Publish it first.');
        }
        $validated = $request->validate([
            'grades' => ['required', 'array'],
            'grades.*.student_id' => ['required', 'exists:students,id'],
            'grades.*.score' => ['required', 'numeric', 'min:0', 'max:' . $assessment->max_score],
            'grades.*.remark' => ['nullable', 'string'],
        ]);
        foreach ($validated['grades'] as $grade) {
            Grade::updateOrCreate(
                ['assessment_id' => $assessment->id, 'student_id' => $grade['student_id']],
                [
                    'score' => $grade['score'],
                    'remark' => $grade['remark'] ?? null,
                    'entered_by' => auth()->user()->staff?->id ?? 1,
                    'status' => GradeStatus::Entered,
                ]
            );
        }
        return $this->success(null, 'Grades saved');
    }

    public function publish(Assessment $assessment)
    {
        if ($assessment->status !== AssessmentStatus::Draft) {
            throw new BusinessRuleException('Only draft assessments can be published.');
        }
        $assessment->update(['status' => AssessmentStatus::Published]);
        return $this->success($assessment, 'Assessment published');
    }

    public function update(Request $request, Assessment $assessment)
    {
        $assessment->update($request->only(['name', 'type', 'max_score', 'weight', 'date']));
        return $this->success($assessment, 'Assessment updated');
    }

    public function destroy(Assessment $assessment)
    {
        $assessment->delete();
        return $this->success(null, 'Assessment deleted', 204);
    }
}
