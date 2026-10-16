<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('safeguarding_incidents', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('student_id');
            $table->string('type'); // Bullying, Welfare, Behavioural, Safety, Medical
            $table->string('severity'); // Low, Medium, High, Critical
            $table->text('description');
            $table->boolean('is_confidential')->default(true);
            $table->string('status')->default('Reported'); // Reported, Under Review, Actioned, Escalated, Closed
            $table->unsignedBigInteger('reported_by');
            $table->unsignedBigInteger('assigned_to')->nullable();
            $table->timestamps();

            $table->foreign('student_id')->references('id')->on('students')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('reported_by')->references('id')->on('staff')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('assigned_to')->references('id')->on('staff')->cascadeOnUpdate()->nullOnDelete();
            $table->index(['student_id', 'status']);
            $table->index('severity');
        });

        Schema::create('safeguarding_actions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('incident_id');
            $table->text('action');
            $table->string('outcome')->nullable();
            $table->unsignedBigInteger('taken_by');
            $table->timestamps();

            $table->foreign('incident_id')->references('id')->on('safeguarding_incidents')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('taken_by')->references('id')->on('staff')->cascadeOnUpdate()->restrictOnDelete();
            $table->index('incident_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('safeguarding_actions');
        Schema::dropIfExists('safeguarding_incidents');
    }
};
