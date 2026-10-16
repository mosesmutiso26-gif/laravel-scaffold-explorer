<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sports', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('season')->nullable(); // Term 1, Term 2, Year-round
            $table->unsignedBigInteger('teacher_id')->nullable();
            $table->string('status')->default('Active');
            $table->timestamps();

            $table->foreign('teacher_id')->references('id')->on('staff')->cascadeOnUpdate()->nullOnDelete();
            $table->index('status');
        });

        Schema::create('teams', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('sport_id');
            $table->string('name');
            $table->unsignedBigInteger('coach_id')->nullable();
            $table->string('category')->nullable(); // U13, U15, U17, Senior
            $table->string('status')->default('Active');
            $table->timestamps();

            $table->foreign('sport_id')->references('id')->on('sports')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('coach_id')->references('id')->on('staff')->cascadeOnUpdate()->nullOnDelete();
            $table->index('sport_id');
        });

        Schema::create('squad_members', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('team_id');
            $table->unsignedBigInteger('student_id');
            $table->string('position')->nullable();
            $table->integer('jersey_number')->nullable();
            $table->timestamps();

            $table->foreign('team_id')->references('id')->on('teams')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('student_id')->references('id')->on('students')->cascadeOnUpdate()->restrictOnDelete();
            $table->unique(['team_id', 'student_id']);
        });

        Schema::create('training_sessions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('team_id');
            $table->date('date');
            $table->time('start_time');
            $table->time('end_time');
            $table->string('venue')->nullable();
            $table->string('status')->default('Scheduled'); // Scheduled, Completed, Cancelled
            $table->timestamps();

            $table->foreign('team_id')->references('id')->on('teams')->cascadeOnUpdate()->restrictOnDelete();
            $table->index(['team_id', 'date']);
        });

        Schema::create('fixtures', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('team_id');
            $table->string('opponent');
            $table->boolean('is_home')->default(true);
            $table->date('date');
            $table->time('start_time')->nullable();
            $table->string('venue')->nullable();
            $table->string('result')->default('Pending'); // Pending, Won, Lost, Draw
            $table->string('score')->nullable();
            $table->timestamps();

            $table->foreign('team_id')->references('id')->on('teams')->cascadeOnUpdate()->restrictOnDelete();
            $table->index(['team_id', 'date']);
        });

        Schema::create('sports_equipment', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('sport_id')->nullable();
            $table->string('name');
            $table->integer('total_quantity');
            $table->integer('available_quantity');
            $table->string('condition')->default('Good'); // Good, Fair, Poor
            $table->timestamps();

            $table->foreign('sport_id')->references('id')->on('sports')->cascadeOnUpdate()->nullOnDelete();
            $table->index('sport_id');
        });

        Schema::create('equipment_issues', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('equipment_id');
            $table->unsignedBigInteger('student_id')->nullable();
            $table->integer('quantity');
            $table->timestamp('issued_at');
            $table->timestamp('returned_at')->nullable();
            $table->string('status')->default('Issued'); // Issued, Returned
            $table->unsignedBigInteger('issued_by');
            $table->timestamps();

            $table->foreign('equipment_id')->references('id')->on('sports_equipment')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('student_id')->references('id')->on('students')->cascadeOnUpdate()->nullOnDelete();
            $table->foreign('issued_by')->references('id')->on('staff')->cascadeOnUpdate()->restrictOnDelete();
            $table->index(['equipment_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('equipment_issues');
        Schema::dropIfExists('sports_equipment');
        Schema::dropIfExists('fixtures');
        Schema::dropIfExists('training_sessions');
        Schema::dropIfExists('squad_members');
        Schema::dropIfExists('teams');
        Schema::dropIfExists('sports');
    }
};
