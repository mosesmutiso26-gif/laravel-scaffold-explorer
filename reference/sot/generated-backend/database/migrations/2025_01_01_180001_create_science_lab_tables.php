<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('science_labs', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->string('building')->nullable();
            $table->string('location')->nullable();
            $table->string('lab_type')->default('general_science');
            $table->unsignedInteger('seating_capacity')->default(30);
            $table->unsignedInteger('workstation_capacity')->default(20);
            $table->foreignId('technician_id')->nullable()->constrained('staff')->nullOnDelete();
            $table->json('assigned_teacher_ids')->nullable();
            $table->time('opening_time')->nullable();
            $table->time('closing_time')->nullable();
            $table->string('status')->default('active');
            $table->text('safety_rules')->nullable();
            $table->text('required_ppe')->nullable();
            $table->text('emergency_instructions')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('science_equipment', function (Blueprint $table): void {
            $table->id();
            $table->string('item_code')->unique();
            $table->string('name');
            $table->string('category')->nullable();
            $table->text('description')->nullable();
            $table->text('specification')->nullable();
            $table->unsignedInteger('quantity_available')->default(0);
            $table->unsignedInteger('quantity_reserved')->default(0);
            $table->unsignedInteger('quantity_damaged')->default(0);
            $table->string('storage_location')->nullable();
            $table->string('condition_status')->default('good');
            $table->foreignId('lab_id')->nullable()->constrained('science_labs')->nullOnDelete();
            $table->string('serial_number')->nullable();
            $table->boolean('individually_tracked')->default(false);
            $table->unsignedInteger('reorder_threshold')->default(5);
            $table->foreignId('supplier_id')->nullable()->constrained()->nullOnDelete();
            $table->date('acquired_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('chemical_batches', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->string('formula')->nullable();
            $table->string('concentration')->nullable();
            $table->string('grade')->nullable();
            $table->string('container_size')->nullable();
            $table->decimal('quantity', 15, 3)->default(0);
            $table->string('unit')->nullable();
            $table->string('batch_number')->nullable();
            $table->date('expiry_date')->nullable();
            $table->foreignId('supplier_id')->nullable()->constrained()->nullOnDelete();
            $table->string('storage_location')->nullable();
            $table->string('compatibility_group')->nullable();
            $table->string('hazard_classification')->default('low');
            $table->text('required_ppe')->nullable();
            $table->text('sds_reference')->nullable();
            $table->decimal('minimum_stock_level', 15, 3)->default(0);
            $table->boolean('is_restricted')->default(false);
            $table->string('disposal_status')->default('not_required');
            $table->text('disposal_record')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('practical_lessons', function (Blueprint $table): void {
            $table->id();
            $table->string('title');
            $table->text('learning_objectives')->nullable();
            $table->text('experiment_description')->nullable();
            $table->foreignId('subject_id')->nullable()->constrained();
            $table->string('curriculum_topic')->nullable();
            $table->foreignId('class_id')->nullable()->constrained('classes')->nullOnDelete();
            $table->foreignId('stream_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('academic_year_id')->nullable()->constrained();
            $table->foreignId('term_id')->nullable()->constrained();
            $table->foreignId('teacher_id')->nullable()->constrained('staff')->nullOnDelete();
            $table->foreignId('lab_id')->nullable()->constrained('science_labs')->nullOnDelete();
            $table->date('scheduled_date')->nullable();
            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();
            $table->string('status')->default('draft');
            $table->text('safety_precautions')->nullable();
            $table->text('risk_assessment')->nullable();
            $table->text('student_grouping')->nullable();
            $table->text('expected_observations')->nullable();
            $table->text('assessment_rubric')->nullable();
            $table->text('preparation_instructions')->nullable();
            $table->text('cancellation_reason')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('lab_bookings', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('lab_id')->constrained('science_labs')->cascadeOnDelete();
            $table->foreignId('practical_lesson_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('booked_by')->constrained('users');
            $table->date('booking_date');
            $table->time('start_time');
            $table->time('end_time');
            $table->string('status')->default('pending');
            $table->string('purpose')->nullable();
            $table->text('cancellation_reason')->nullable();
            $table->timestamps();
            $table->index(['lab_id', 'booking_date']);
        });

        Schema::create('practical_requirements', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('practical_lesson_id')->constrained()->cascadeOnDelete();
            $table->string('item_type');
            $table->foreignId('science_equipment_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('chemical_batch_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string('item_name');
            $table->decimal('quantity_required', 15, 3)->default(1);
            $table->string('unit')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('stock_reservations', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('practical_lesson_id')->constrained()->cascadeOnDelete();
            $table->foreignId('science_equipment_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('chemical_batch_id')->nullable()->constrained()->cascadeOnDelete();
            $table->decimal('quantity_reserved', 15, 3)->default(1);
            $table->string('status')->default('reserved');
            $table->timestamps();
        });

        Schema::create('science_stock_movements', function (Blueprint $table): void {
            $table->id();
            $table->string('item_type');
            $table->foreignId('science_equipment_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('chemical_batch_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string('movement_type');
            $table->decimal('quantity', 15, 3);
            $table->decimal('balance_after', 15, 3)->nullable();
            $table->foreignId('practical_lesson_id')->nullable()->constrained()->cascadeOnDelete();
            $table->text('reason')->nullable();
            $table->foreignId('recorded_by')->constrained('users');
            $table->timestamps();
        });

        Schema::create('practical_attendance', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('practical_lesson_id')->constrained()->cascadeOnDelete();
            $table->foreignId('student_id')->constrained();
            $table->string('attendance_status');
            $table->text('observation_marks')->nullable();
            $table->text('technique_marks')->nullable();
            $table->text('safety_compliance_marks')->nullable();
            $table->text('results')->nullable();
            $table->text('teacher_feedback')->nullable();
            $table->string('completion_status')->nullable();
            $table->foreignId('recorded_by')->constrained('users');
            $table->timestamps();
            $table->unique(['practical_lesson_id', 'student_id']);
        });

        Schema::create('safety_inspections', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('lab_id')->constrained('science_labs')->cascadeOnDelete();
            $table->date('scheduled_date');
            $table->string('status')->default('scheduled');
            $table->text('checklist')->nullable();
            $table->foreignId('inspector_id')->nullable()->constrained('users')->nullOnDelete();
            $table->text('findings')->nullable();
            $table->text('completion_evidence')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });

        Schema::create('lab_incidents', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('lab_id')->constrained('science_labs')->cascadeOnDelete();
            $table->string('incident_type');
            $table->string('severity')->default('minor');
            $table->datetime('incident_at');
            $table->text('description');
            $table->text('immediate_actions')->nullable();
            $table->json('people_involved')->nullable();
            $table->foreignId('assigned_reviewer')->nullable()->constrained('users')->nullOnDelete();
            $table->string('status')->default('open');
            $table->text('follow_up_actions')->nullable();
            $table->timestamp('closed_at')->nullable();
            $table->timestamps();
        });

        Schema::create('lab_maintenance_requests', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('lab_id')->nullable()->constrained('science_labs')->cascadeOnDelete();
            $table->foreignId('equipment_id')->nullable()->constrained('science_equipment')->cascadeOnDelete();
            $table->text('fault_description');
            $table->string('priority')->default('medium');
            $table->string('status')->default('reported');
            $table->foreignId('assigned_technician')->nullable()->constrained('users')->nullOnDelete();
            $table->text('repair_notes')->nullable();
            $table->text('parts_used')->nullable();
            $table->decimal('cost_reference', 15, 2)->nullable();
            $table->string('service_provider')->nullable();
            $table->timestamp('downtime_start')->nullable();
            $table->timestamp('downtime_end')->nullable();
            $table->timestamp('resolved_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lab_maintenance_requests');
        Schema::dropIfExists('lab_incidents');
        Schema::dropIfExists('safety_inspections');
        Schema::dropIfExists('practical_attendance');
        Schema::dropIfExists('science_stock_movements');
        Schema::dropIfExists('stock_reservations');
        Schema::dropIfExists('practical_requirements');
        Schema::dropIfExists('lab_bookings');
        Schema::dropIfExists('practical_lessons');
        Schema::dropIfExists('chemical_batches');
        Schema::dropIfExists('science_equipment');
        Schema::dropIfExists('science_labs');
    }
};
