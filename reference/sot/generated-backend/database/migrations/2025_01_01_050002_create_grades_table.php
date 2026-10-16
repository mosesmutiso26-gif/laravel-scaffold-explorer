<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('grades', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('assessment_id');
            $table->unsignedBigInteger('student_id');
            $table->decimal('score', 6, 2);
            $table->text('remark')->nullable();
            $table->string('status')->default('Entered'); // Entered, Moderated, Published
            $table->unsignedBigInteger('entered_by');
            $table->unsignedBigInteger('moderated_by')->nullable();
            $table->timestamp('moderated_at')->nullable();
            $table->timestamps();

            $table->foreign('assessment_id')->references('id')->on('assessments')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('student_id')->references('id')->on('students')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('entered_by')->references('id')->on('staff')->cascadeOnUpdate()->restrictOnDelete();
            $table->unique(['assessment_id', 'student_id']);
            $table->index(['student_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('grades');
    }
};
