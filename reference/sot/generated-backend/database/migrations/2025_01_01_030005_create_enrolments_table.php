<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('enrolments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('student_id');
            $table->unsignedBigInteger('class_id');
            $table->unsignedBigInteger('stream_id')->nullable();
            $table->unsignedBigInteger('academic_year_id');
            $table->string('status')->default('Active'); // Active, Transferred, Withdrawn, Completed
            $table->date('enrolment_date');
            $table->date('exit_date')->nullable();
            $table->timestamps();

            $table->foreign('student_id')->references('id')->on('students')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('class_id')->references('id')->on('classes')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('academic_year_id')->references('id')->on('academic_years')->cascadeOnUpdate()->restrictOnDelete();
            $table->index(['student_id', 'academic_year_id', 'status']);
            $table->index(['class_id', 'academic_year_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('enrolments');
    }
};
