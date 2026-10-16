<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hr_leave_requests', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('staff_id');
            $table->string('type'); // Annual, Sick, Personal, Maternity, Compassionate
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('days');
            $table->text('reason')->nullable();
            $table->string('status')->default('Pending'); // Pending, Approved, Rejected, Cancelled
            $table->unsignedBigInteger('approved_by')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();

            $table->foreign('staff_id')->references('id')->on('staff')->cascadeOnUpdate()->restrictOnDelete();
            $table->index(['staff_id', 'status']);
        });

        Schema::create('hr_payroll_runs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('term_id')->nullable();
            $table->string('month'); // 2026-10
            $table->string('status')->default('Draft'); // Draft, Verified, Approved, Disbursed
            $table->decimal('total_gross', 15, 2)->default(0);
            $table->decimal('total_deductions', 15, 2)->default(0);
            $table->decimal('total_net', 15, 2)->default(0);
            $table->unsignedBigInteger('approved_by')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();

            $table->foreign('term_id')->references('id')->on('terms')->cascadeOnUpdate()->nullOnDelete();
            $table->index(['month', 'status']);
        });

        Schema::create('hr_payslips', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('payroll_run_id');
            $table->unsignedBigInteger('staff_id');
            $table->decimal('gross', 15, 2);
            $table->decimal('deductions', 15, 2)->default(0);
            $table->decimal('net', 15, 2);
            $table->json('deduction_breakdown')->nullable();
            $table->timestamps();

            $table->foreign('payroll_run_id')->references('id')->on('hr_payroll_runs')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('staff_id')->references('id')->on('staff')->cascadeOnUpdate()->restrictOnDelete();
            $table->unique(['payroll_run_id', 'staff_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hr_payslips');
        Schema::dropIfExists('hr_payroll_runs');
        Schema::dropIfExists('hr_leave_requests');
    }
};
