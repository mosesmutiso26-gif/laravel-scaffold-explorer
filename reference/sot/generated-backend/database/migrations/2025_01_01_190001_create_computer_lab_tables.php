<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('computer_labs', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->string('building')->nullable();
            $table->string('location')->nullable();
            $table->unsignedInteger('capacity')->default(30);
            $table->foreignId('technician_id')->nullable()->constrained('staff')->nullOnDelete();
            $table->json('assigned_teacher_ids')->nullable();
            $table->string('status')->default('active');
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('workstations', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('computer_lab_id')->constrained()->cascadeOnDelete();
            $table->string('workstation_number');
            $table->string('asset_tag')->nullable()->unique();
            $table->string('device_type')->default('desktop');
            $table->string('manufacturer')->nullable();
            $table->string('model')->nullable();
            $table->string('serial_number')->nullable()->unique();
            $table->string('processor')->nullable();
            $table->unsignedInteger('ram_gb')->nullable();
            $table->unsignedInteger('storage_gb')->nullable();
            $table->string('operating_system')->nullable();
            $table->string('hostname')->nullable();
            $table->string('device_status')->default('operational');
            $table->string('workstation_status')->default('available');
            $table->text('warranty_info')->nullable();
            $table->date('warranty_expires_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->unique(['computer_lab_id', 'workstation_number']);
        });

        Schema::create('ict_assets', function (Blueprint $table): void {
            $table->id();
            $table->string('asset_tag')->unique();
            $table->string('name');
            $table->string('device_type');
            $table->string('manufacturer')->nullable();
            $table->string('model')->nullable();
            $table->string('serial_number')->nullable()->unique();
            $table->foreignId('computer_lab_id')->nullable()->constrained()->nullOnDelete();
            $table->string('condition_status')->default('good');
            $table->string('status')->default('operational');
            $table->date('acquired_at')->nullable();
            $table->decimal('cost', 15, 2)->nullable();
            $table->text('warranty_info')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('software_products', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->string('version')->nullable();
            $table->string('category')->default('other');
            $table->text('purpose')->nullable();
            $table->string('supported_os')->nullable();
            $table->text('installation_requirements')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('software_licences', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('software_product_id')->constrained()->cascadeOnDelete();
            $table->string('licence_type');
            $table->unsignedInteger('licence_count')->default(1);
            $table->unsignedInteger('allocated_count')->default(0);
            $table->date('renewal_date')->nullable();
            $table->string('owner_department')->nullable();
            $table->text('compliance_notes')->nullable();
            $table->timestamps();
        });

        Schema::create('software_installations', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('software_product_id')->constrained()->cascadeOnDelete();
            $table->foreignId('workstation_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('computer_lab_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string('status')->default('approved');
            $table->date('installed_at')->nullable();
            $table->foreignId('installed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('computer_lab_bookings', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('computer_lab_id')->constrained()->cascadeOnDelete();
            $table->foreignId('booked_by')->constrained('users');
            $table->string('subject')->nullable();
            $table->foreignId('class_id')->nullable()->constrained('classes')->nullOnDelete();
            $table->date('booking_date');
            $table->time('start_time');
            $table->time('end_time');
            $table->unsignedInteger('expected_students')->nullable();
            $table->unsignedInteger('required_workstations')->nullable();
            $table->text('software_requirements')->nullable();
            $table->text('hardware_requirements')->nullable();
            $table->text('accessibility_requirements')->nullable();
            $table->string('status')->default('pending');
            $table->text('cancellation_reason')->nullable();
            $table->timestamps();
            $table->index(['computer_lab_id', 'booking_date']);
        });

        Schema::create('workstation_assignments', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('computer_lab_booking_id')->constrained()->cascadeOnDelete();
            $table->foreignId('workstation_id')->constrained()->cascadeOnDelete();
            $table->foreignId('student_id')->constrained();
            $table->text('condition_before')->nullable();
            $table->text('condition_after')->nullable();
            $table->text('student_reported_issue')->nullable();
            $table->timestamps();
        });

        Schema::create('computer_practicals', function (Blueprint $table): void {
            $table->id();
            $table->string('title');
            $table->text('learning_objectives')->nullable();
            $table->text('instructions')->nullable();
            $table->foreignId('subject_id')->nullable()->constrained();
            $table->string('curriculum_topic')->nullable();
            $table->foreignId('class_id')->nullable()->constrained('classes')->nullOnDelete();
            $table->foreignId('academic_year_id')->nullable()->constrained();
            $table->foreignId('term_id')->nullable()->constrained();
            $table->foreignId('teacher_id')->nullable()->constrained('staff')->nullOnDelete();
            $table->foreignId('computer_lab_id')->nullable()->constrained()->nullOnDelete();
            $table->date('scheduled_date')->nullable();
            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();
            $table->text('required_software')->nullable();
            $table->text('assessment_rubric')->nullable();
            $table->date('submission_deadline')->nullable();
            $table->string('status')->default('draft');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('technical_tickets', function (Blueprint $table): void {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('issue_type')->nullable();
            $table->string('priority')->default('medium');
            $table->string('status')->default('open');
            $table->foreignId('computer_lab_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('workstation_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('ict_asset_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('reporter_id')->constrained('users');
            $table->foreignId('assigned_technician')->nullable()->constrained('users')->nullOnDelete();
            $table->text('troubleshooting_notes')->nullable();
            $table->text('resolution')->nullable();
            $table->timestamp('resolved_at')->nullable();
            $table->unsignedInteger('downtime_minutes')->nullable();
            $table->timestamps();
        });

        Schema::create('asset_audits', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('computer_lab_id')->nullable()->constrained()->nullOnDelete();
            $table->date('scheduled_date');
            $table->string('status')->default('scheduled');
            $table->foreignId('auditor_id')->nullable()->constrained('users')->nullOnDelete();
            $table->json('expected_assets')->nullable();
            $table->json('found_assets')->nullable();
            $table->text('discrepancies')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('asset_audits');
        Schema::dropIfExists('technical_tickets');
        Schema::dropIfExists('computer_practicals');
        Schema::dropIfExists('workstation_assignments');
        Schema::dropIfExists('computer_lab_bookings');
        Schema::dropIfExists('software_installations');
        Schema::dropIfExists('software_licences');
        Schema::dropIfExists('software_products');
        Schema::dropIfExists('ict_assets');
        Schema::dropIfExists('workstations');
        Schema::dropIfExists('computer_labs');
    }
};
