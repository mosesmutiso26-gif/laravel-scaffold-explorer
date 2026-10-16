<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('classes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('academic_year_id');
            $table->string('name'); // Year 6, Form 2, Grade 4
            $table->string('level'); // Primary, Secondary
            $table->unsignedBigInteger('class_teacher_id')->nullable(); // staff_id
            $table->integer('capacity')->default(40);
            $table->timestamps();

            $table->foreign('academic_year_id')->references('id')->on('academic_years')->cascadeOnUpdate()->restrictOnDelete();
            $table->index('academic_year_id');
            $table->index('level');
            $table->index('name');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('classes');
    }
};
