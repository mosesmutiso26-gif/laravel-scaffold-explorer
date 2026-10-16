<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clinic_visits', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('student_id');
            $table->date('visit_date');
            $table->text('complaint');
            $table->text('diagnosis')->nullable();
            $table->text('treatment')->nullable();
            $table->unsignedBigInteger('attended_by');
            $table->string('status')->default('Open'); // Open, Treated, Referred, Closed
            $table->boolean('is_confidential')->default(false);
            $table->timestamps();

            $table->foreign('student_id')->references('id')->on('students')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('attended_by')->references('id')->on('staff')->cascadeOnUpdate()->restrictOnDelete();
            $table->index(['student_id', 'visit_date']);
        });

        Schema::create('clinic_medications', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('visit_id');
            $table->string('medication');
            $table->string('dosage');
            $table->string('frequency')->nullable();
            $table->unsignedBigInteger('administered_by');
            $table->timestamps();

            $table->foreign('visit_id')->references('id')->on('clinic_visits')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('administered_by')->references('id')->on('staff')->cascadeOnUpdate()->restrictOnDelete();
            $table->index('visit_id');
        });

        Schema::create('clinic_records', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('student_id');
            $table->string('condition'); // Asthma, Diabetes, Allergies, etc.
            $table->text('details')->nullable();
            $table->boolean('is_confidential')->default(true);
            $table->unsignedBigInteger('recorded_by');
            $table->timestamps();

            $table->foreign('student_id')->references('id')->on('students')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('recorded_by')->references('id')->on('staff')->cascadeOnUpdate()->restrictOnDelete();
            $table->index('student_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clinic_records');
        Schema::dropIfExists('clinic_medications');
        Schema::dropIfExists('clinic_visits');
    }
};
