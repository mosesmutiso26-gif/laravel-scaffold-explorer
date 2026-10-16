<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('admission_number')->unique();
            $table->string('first_name');
            $table->string('last_name');
            $table->date('date_of_birth');
            $table->enum('gender', ['Male', 'Female']);
            $table->string('nationality')->default('Kenyan');
            $table->string('blood_group')->nullable();
            $table->string('photo_path')->nullable();
            $table->string('mode'); // Day, Boarding
            $table->string('status')->default('Active'); // Active, Suspended, Withdrawn, Graduated
            $table->date('admission_date');
            $table->date('exit_date')->nullable();
            $table->string('exit_reason')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_id')->references('id')->on('users')->cascadeOnUpdate()->nullOnDelete();
            $table->index('status');
            $table->index('mode');
            $table->index(['first_name', 'last_name']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
