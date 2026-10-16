<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('timetable_entries', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('version_id');
            $table->string('day_of_week'); // Monday, Tuesday, etc.
            $table->string('period'); // Period 1, Period 2, Break, etc.
            $table->time('start_time');
            $table->time('end_time');
            $table->unsignedBigInteger('class_id');
            $table->unsignedBigInteger('subject_id');
            $table->unsignedBigInteger('teacher_id')->nullable();
            $table->unsignedBigInteger('room_id')->nullable();
            $table->boolean('is_break')->default(false);
            $table->timestamps();

            $table->foreign('version_id')->references('id')->on('timetable_versions')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('class_id')->references('id')->on('classes')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('subject_id')->references('id')->on('subjects')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('teacher_id')->references('id')->on('teachers')->cascadeOnUpdate()->nullOnDelete();
            $table->foreign('room_id')->references('id')->on('rooms')->cascadeOnUpdate()->nullOnDelete();
            $table->index(['version_id', 'day_of_week', 'period']);
            $table->index(['teacher_id', 'day_of_week', 'start_time']);
            $table->index(['room_id', 'day_of_week', 'start_time']);
            $table->index(['class_id', 'day_of_week', 'start_time']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('timetable_entries');
    }
};
