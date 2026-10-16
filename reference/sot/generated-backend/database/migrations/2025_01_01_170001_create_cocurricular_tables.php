<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('activity_categories', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('clubs', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->foreignId('activity_category_id')->constrained()->cascadeOnDelete();
            $table->text('description')->nullable();
            $table->text('educational_objectives')->nullable();
            $table->text('eligibility_rules')->nullable();
            $table->unsignedInteger('membership_capacity')->default(50);
            $table->foreignId('teacher_patron_id')->nullable()->constrained('staff')->nullOnDelete();
            $table->json('assistant_patron_ids')->nullable();
            $table->string('meeting_venue')->nullable();
            $table->string('meeting_schedule')->nullable();
            $table->foreignId('academic_year_id')->constrained();
            $table->foreignId('term_id')->nullable()->constrained();
            $table->string('status')->default('draft');
            $table->text('constitution_document_path')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('club_memberships', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('club_id')->constrained()->cascadeOnDelete();
            $table->foreignId('student_id')->constrained();
            $table->string('status')->default('applied');
            $table->text('application_reason')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->date('applied_at');
            $table->date('approved_at')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
            $table->unique(['club_id', 'student_id', 'status']);
        });

        Schema::create('club_leaderships', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('club_id')->constrained()->cascadeOnDelete();
            $table->foreignId('student_id')->constrained();
            $table->string('position');
            $table->date('appointed_at');
            $table->date('ends_at')->nullable();
            $table->foreignId('appointed_by')->constrained('users');
            $table->string('approval_status')->default('pending');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('activity_events', function (Blueprint $table): void {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->foreignId('club_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('organizer_id')->constrained('users');
            $table->foreignId('supervising_staff_id')->nullable()->constrained('staff')->nullOnDelete();
            $table->date('event_date');
            $table->time('start_time');
            $table->time('end_time');
            $table->string('venue')->nullable();
            $table->foreignId('room_id')->nullable()->constrained()->nullOnDelete();
            $table->json('target_class_ids')->nullable();
            $table->unsignedInteger('expected_attendance')->nullable();
            $table->text('equipment_requirements')->nullable();
            $table->string('status')->default('draft');
            $table->boolean('requires_guardian_consent')->default(false);
            $table->boolean('requires_transport')->default(false);
            $table->foreignId('vehicle_id')->nullable()->constrained()->nullOnDelete();
            $table->text('risk_assessment')->nullable();
            $table->text('cancellation_reason')->nullable();
            $table->foreignId('academic_year_id')->constrained();
            $table->foreignId('term_id')->nullable()->constrained();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('event_attendance', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('activity_event_id')->constrained()->cascadeOnDelete();
            $table->foreignId('student_id')->constrained();
            $table->string('attendance_status');
            $table->time('arrival_time')->nullable();
            $table->time('departure_time')->nullable();
            $table->text('notes')->nullable();
            $table->foreignId('recorded_by')->constrained('users');
            $table->timestamps();
            $table->unique(['activity_event_id', 'student_id']);
        });

        Schema::create('competitions', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->string('organizer')->nullable();
            $table->string('level');
            $table->string('category')->nullable();
            $table->string('venue')->nullable();
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->json('participating_club_ids')->nullable();
            $table->foreignId('supervising_staff_id')->nullable()->constrained('staff')->nullOnDelete();
            $table->text('entry_requirements')->nullable();
            $table->date('registration_deadline')->nullable();
            $table->string('status')->default('draft');
            $table->text('lessons_learned')->nullable();
            $table->text('post_event_report')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('competition_entries', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('competition_id')->constrained()->cascadeOnDelete();
            $table->foreignId('student_id')->constrained();
            $table->string('entry_status')->default('registered');
            $table->string('result_position')->nullable();
            $table->text('result_notes')->nullable();
            $table->json('judges')->nullable();
            $table->text('certificate_path')->nullable();
            $table->timestamps();
            $table->unique(['competition_id', 'student_id']);
        });

        Schema::create('student_achievements', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('student_id')->constrained();
            $table->foreignId('club_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->date('achievement_date');
            $table->string('competition_name')->nullable();
            $table->string('level');
            $table->string('position_or_award')->nullable();
            $table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('verified_at')->nullable();
            $table->text('evidence_path')->nullable();
            $table->text('certificate_path')->nullable();
            $table->string('visibility')->default('staff_only');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('educational_trips', function (Blueprint $table): void {
            $table->id();
            $table->string('title');
            $table->text('educational_purpose')->nullable();
            $table->string('destination');
            $table->datetime('departure_at');
            $table->datetime('return_at');
            $table->foreignId('organizer_id')->constrained('users');
            $table->json('supervisor_ids')->nullable();
            $table->json('eligible_class_ids')->nullable();
            $table->string('status')->default('draft');
            $table->foreignId('vehicle_id')->nullable()->constrained()->nullOnDelete();
            $table->text('itinerary')->nullable();
            $table->text('risk_assessment')->nullable();
            $table->text('emergency_plan')->nullable();
            $table->decimal('budget_estimate', 15, 2)->nullable();
            $table->decimal('approved_cost', 15, 2)->nullable();
            $table->text('required_documents')->nullable();
            $table->text('post_trip_report')->nullable();
            $table->foreignId('academic_year_id')->constrained();
            $table->foreignId('term_id')->nullable()->constrained();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('trip_participants', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('educational_trip_id')->constrained()->cascadeOnDelete();
            $table->foreignId('student_id')->constrained();
            $table->string('consent_status')->default('pending');
            $table->boolean('departure_checked')->default(false);
            $table->boolean('return_checked')->default(false);
            $table->text('medical_notes')->nullable();
            $table->timestamps();
            $table->unique(['educational_trip_id', 'student_id']);
        });

        Schema::create('guardian_consents', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('educational_trip_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('activity_event_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('student_id')->constrained();
            $table->foreignId('guardian_id')->constrained();
            $table->string('consent_status')->default('pending');
            $table->text('consent_form_path')->nullable();
            $table->datetime('submitted_at')->nullable();
            $table->datetime('expires_at')->nullable();
            $table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('activity_budgets', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('club_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('activity_event_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('educational_trip_id')->nullable()->constrained()->cascadeOnDelete();
            $table->decimal('proposed_amount', 15, 2);
            $table->decimal('approved_amount', 15, 2)->nullable();
            $table->decimal('actual_expenditure', 15, 2)->default(0);
            $table->string('status')->default('proposed');
            $table->json('cost_breakdown')->nullable();
            $table->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('resource_reservations', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('activity_event_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('inventory_item_id')->nullable()->constrained()->nullOnDelete();
            $table->string('resource_name');
            $table->string('resource_type')->nullable();
            $table->unsignedInteger('quantity')->default(1);
            $table->string('status')->default('reserved');
            $table->foreignId('responsible_person_id')->nullable()->constrained('users')->nullOnDelete();
            $table->text('condition_before')->nullable();
            $table->text('condition_after')->nullable();
            $table->datetime('reserved_from');
            $table->datetime('reserved_to');
            $table->text('damage_report')->nullable();
            $table->timestamps();
        });

        Schema::create('activity_reports', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('club_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('activity_event_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('content');
            $table->string('status')->default('draft');
            $table->foreignId('submitted_by')->constrained('users');
            $table->timestamp('submitted_at')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('reviewed_at')->nullable();
            $table->text('review_notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activity_reports');
        Schema::dropIfExists('resource_reservations');
        Schema::dropIfExists('activity_budgets');
        Schema::dropIfExists('guardian_consents');
        Schema::dropIfExists('trip_participants');
        Schema::dropIfExists('educational_trips');
        Schema::dropIfExists('student_achievements');
        Schema::dropIfExists('competition_entries');
        Schema::dropIfExists('competitions');
        Schema::dropIfExists('event_attendance');
        Schema::dropIfExists('activity_events');
        Schema::dropIfExists('club_leaderships');
        Schema::dropIfExists('club_memberships');
        Schema::dropIfExists('clubs');
        Schema::dropIfExists('activity_categories');
    }
};
