<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('attendance_records', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('session_id');
            $table->unsignedBigInteger('student_id');
            $table->string('status'); // Present, Absent, Late, Excused, Sick
            $table->time('arrival_time')->nullable();
            $table->text('note')->nullable();
            $table->timestamps();

            $table->foreign('session_id')->references('id')->on('attendance_sessions')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('student_id')->references('id')->on('students')->cascadeOnUpdate()->restrictOnDelete();
            $table->unique(['session_id', 'student_id']);
            $table->index(['student_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attendance_records');
    }
};
