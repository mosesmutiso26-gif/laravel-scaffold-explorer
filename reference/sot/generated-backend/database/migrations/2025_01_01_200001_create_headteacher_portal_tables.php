<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('executive_tasks', function (Blueprint $table): void {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('category')->nullable();
            $table->string('priority')->default('medium');
            $table->string('status')->default('pending');
            $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('created_by')->constrained('users');
            $table->date('due_date')->nullable();
            $table->text('notes')->nullable();
            $table->string('source_reference_type')->nullable();
            $table->unsignedInteger('source_reference_id')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->text('completion_evidence')->nullable();
            $table->foreignId('delegated_from')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('approval_requests', function (Blueprint $table): void {
            $table->id();
            $table->string('reference')->unique();
            $table->string('approval_type');
            $table->string('status')->default('pending');
            $table->foreignId('requester_id')->constrained('users');
            $table->text('reason')->nullable();
            $table->string('source_reference_type')->nullable();
            $table->unsignedInteger('source_reference_id')->nullable();
            $table->json('supporting_evidence')->nullable();
            $table->json('validation_warnings')->nullable();
            $table->text('decision_reason')->nullable();
            $table->foreignId('decided_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('decided_at')->nullable();
            $table->timestamps();
        });

        Schema::create('daily_briefing_items', function (Blueprint $table): void {
            $table->id();
            $table->date('briefing_date');
            $table->string('category');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('status')->default('new');
            $table->string('source_reference_type')->nullable();
            $table->unsignedInteger('source_reference_id')->nullable();
            $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('reviewed_at')->nullable();
            $table->text('follow_up_notes')->nullable();
            $table->timestamps();
        });

        Schema::create('academic_interventions', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('student_id')->nullable()->constrained();
            $table->foreignId('class_id')->nullable()->constrained('classes')->nullOnDelete();
            $table->foreignId('subject_id')->nullable()->constrained();
            $table->text('concern_description');
            $table->text('supporting_evidence')->nullable();
            $table->foreignId('responsible_teacher_id')->nullable()->constrained('staff')->nullOnDelete();
            $table->text('goals')->nullable();
            $table->text('actions')->nullable();
            $table->date('review_date')->nullable();
            $table->text('success_criteria')->nullable();
            $table->text('progress_notes')->nullable();
            $table->string('status')->default('proposed');
            $table->text('closure_outcome')->nullable();
            $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
        });

        Schema::create('lesson_observations', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('teacher_id')->constrained('staff');
            $table->foreignId('observer_id')->constrained('users');
            $table->foreignId('class_id')->nullable()->constrained('classes')->nullOnDelete();
            $table->foreignId('subject_id')->nullable()->constrained();
            $table->date('observation_date');
            $table->text('lesson_objectives')->nullable();
            $table->json('rubric_scores')->nullable();
            $table->text('feedback')->nullable();
            $table->text('strengths')->nullable();
            $table->text('improvement_areas')->nullable();
            $table->text('teacher_response')->nullable();
            $table->text('follow_up_actions')->nullable();
            $table->string('status')->default('scheduled');
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lesson_observations');
        Schema::dropIfExists('academic_interventions');
        Schema::dropIfExists('daily_briefing_items');
        Schema::dropIfExists('approval_requests');
        Schema::dropIfExists('executive_tasks');
    }
};
