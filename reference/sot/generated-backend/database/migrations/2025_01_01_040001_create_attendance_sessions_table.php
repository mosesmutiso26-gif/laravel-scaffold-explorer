<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('attendance_sessions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('class_id');
            $table->unsignedBigInteger('stream_id')->nullable();
            $table->unsignedBigInteger('recorded_by'); // staff_id
            $table->date('date');
            $table->string('period')->nullable(); // Morning, Afternoon, Period 1, etc.
            $table->string('status')->default('Open'); // Open, Completed
            $table->timestamps();

            $table->foreign('class_id')->references('id')->on('classes')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('recorded_by')->references('id')->on('staff')->cascadeOnUpdate()->restrictOnDelete();
            $table->index(['class_id', 'date']);
            $table->index('date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attendance_sessions');
    }
};
