<?php

namespace App\Jobs;

use App\Models\ReportCard;
use App\Models\Grade;
use App\Models\Assessment;
use App\Enums\AssessmentStatus;
use App\Enums\GradeStatus;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class GenerateReportCardJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 1;
    public int $timeout = 120;

    public function __construct(
        public int $studentId,
        public int $termId,
        public int $classId,
        public int $generatedBy
    ) {}

    public function handle(): void
    {
        $assessments = Assessment::where('class_id', $this->classId)
            ->where('term_id', $this->termId)
            ->where('status', AssessmentStatus::Published)
            ->get();
        $totalScore = 0;
        $maxScore = 0;
        foreach ($assessments as $assessment) {
            $grade = Grade::where('assessment_id', $assessment->id)
                ->where('student_id', $this->studentId)
                ->whereIn('status', [GradeStatus::Entered, GradeStatus::Moderated, GradeStatus::Published])
                ->first();
            if ($grade) {
                $totalScore += $grade->score;
                $maxScore += $assessment->max_score;
            }
        }
        $overallScore = $maxScore > 0 ? ($totalScore / $maxScore) * 100 : 0;
        $overallGrade = $this->scoreToGrade($overallScore);
        ReportCard::updateOrCreate(
            ['student_id' => $this->studentId, 'term_id' => $this->termId],
            [
                'class_id' => $this->classId,
                'overall_score' => round($overallScore, 2),
                'overall_grade' => $overallGrade,
                'generated_by' => $this->generatedBy,
                'status' => 'Draft',
            ]
        );
    }

    private function scoreToGrade(float $score): string
    {
        return match(true) {
            $score >= 80 => 'A',
            $score >= 70 => 'B',
            $score >= 60 => 'C',
            $score >= 50 => 'D',
            default => 'E',
        };
    }
}
