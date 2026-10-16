<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('report_cards', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('student_id');
            $table->unsignedBigInteger('term_id');
            $table->unsignedBigInteger('class_id');
            $table->string('overall_grade')->nullable();
            $table->decimal('overall_score', 6, 2)->nullable();
            $table->integer('position')->nullable();
            $table->text('teacher_remark')->nullable();
            $table->text('head_remark')->nullable();
            $table->string('status')->default('Draft'); // Draft, Published
            $table->unsignedBigInteger('generated_by')->nullable();
            $table->timestamps();

            $table->foreign('student_id')->references('id')->on('students')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('term_id')->references('id')->on('terms')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('class_id')->references('id')->on('classes')->cascadeOnUpdate()->restrictOnDelete();
            $table->unique(['student_id', 'term_id']);
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('report_cards');
    }
};
