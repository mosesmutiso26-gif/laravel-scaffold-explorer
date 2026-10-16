<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assessments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('subject_id');
            $table->unsignedBigInteger('class_id');
            $table->unsignedBigInteger('term_id');
            $table->string('name');
            $table->string('type'); // Quiz, CAT, Exam, Project, Assignment
            $table->decimal('max_score', 6, 2)->default(100);
            $table->decimal('weight', 5, 2)->default(100); // percentage weight in term
            $table->date('date');
            $table->string('status')->default('Draft'); // Draft, Published, Closed
            $table->unsignedBigInteger('created_by'); // staff_id
            $table->timestamps();

            $table->foreign('subject_id')->references('id')->on('subjects')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('class_id')->references('id')->on('classes')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('term_id')->references('id')->on('terms')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('created_by')->references('id')->on('staff')->cascadeOnUpdate()->restrictOnDelete();
            $table->index(['class_id', 'term_id']);
            $table->index(['subject_id', 'term_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assessments');
    }
};
