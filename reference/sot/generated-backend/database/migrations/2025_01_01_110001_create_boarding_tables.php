<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('boarding_houses', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->unsignedBigInteger('matron_staff_id')->nullable();
            $table->integer('capacity');
            $table->string('gender')->nullable(); // Boys, Girls, Mixed
            $table->timestamps();

            $table->foreign('matron_staff_id')->references('id')->on('staff')->cascadeOnUpdate()->nullOnDelete();
            $table->index('name');
        });

        Schema::create('dormitories', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('house_id');
            $table->string('name');
            $table->integer('capacity');
            $table->timestamps();

            $table->foreign('house_id')->references('id')->on('boarding_houses')->cascadeOnUpdate()->restrictOnDelete();
            $table->index('house_id');
        });

        Schema::create('boarding_rooms', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('dormitory_id');
            $table->string('name');
            $table->integer('capacity');
            $table->timestamps();

            $table->foreign('dormitory_id')->references('id')->on('dormitories')->cascadeOnUpdate()->restrictOnDelete();
            $table->index('dormitory_id');
        });

        Schema::create('beds', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('room_id');
            $table->string('label');
            $table->string('status')->default('Vacant'); // Vacant, Occupied, Under Maintenance
            $table->timestamps();

            $table->foreign('room_id')->references('id')->on('boarding_rooms')->cascadeOnUpdate()->restrictOnDelete();
            $table->unique(['room_id', 'label']);
            $table->index('status');
        });

        Schema::create('boarding_placements', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('student_id');
            $table->unsignedBigInteger('bed_id');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->string('status')->default('Active'); // Active, Withdrawn, Transferred
            $table->unsignedBigInteger('placed_by');
            $table->timestamps();

            $table->foreign('student_id')->references('id')->on('students')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('bed_id')->references('id')->on('beds')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('placed_by')->references('id')->on('staff')->cascadeOnUpdate()->restrictOnDelete();
            $table->index(['bed_id', 'status']);
            $table->index(['student_id', 'status']);
        });

        Schema::create('roll_calls', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('house_id');
            $table->date('date');
            $table->time('conducted_at')->nullable();
            $table->unsignedBigInteger('conducted_by')->nullable();
            $table->string('status')->default('Open'); // Open, Completed
            $table->timestamps();

            $table->foreign('house_id')->references('id')->on('boarding_houses')->cascadeOnUpdate()->restrictOnDelete();
            $table->index(['house_id', 'date']);
        });

        Schema::create('roll_call_entries', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('roll_call_id');
            $table->unsignedBigInteger('student_id');
            $table->string('status')->default('Unaccounted'); // Present, Absent, Unaccounted, On Leave, Sick
            $table->text('note')->nullable();
            $table->timestamps();

            $table->foreign('roll_call_id')->references('id')->on('roll_calls')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('student_id')->references('id')->on('students')->cascadeOnUpdate()->restrictOnDelete();
            $table->unique(['roll_call_id', 'student_id']);
        });

        Schema::create('leave_requests', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('student_id');
            $table->string('type'); // Home Visit, Medical, Emergency, Exeat
            $table->date('start_date');
            $table->date('expected_return_date');
            $table->date('actual_return_date')->nullable();
            $table->string('destination')->nullable();
            $table->text('reason')->nullable();
            $table->string('status')->default('Awaiting Consent'); // Awaiting Consent, Approved, Rejected, Checked Out, Returned, Late
            $table->unsignedBigInteger('approved_by')->nullable();
            $table->timestamps();

            $table->foreign('student_id')->references('id')->on('students')->cascadeOnUpdate()->restrictOnDelete();
            $table->index(['student_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leave_requests');
        Schema::dropIfExists('roll_call_entries');
        Schema::dropIfExists('roll_calls');
        Schema::dropIfExists('boarding_placements');
        Schema::dropIfExists('beds');
        Schema::dropIfExists('boarding_rooms');
        Schema::dropIfExists('dormitories');
        Schema::dropIfExists('boarding_houses');
    }
};
