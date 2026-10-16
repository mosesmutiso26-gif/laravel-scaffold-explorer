<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('staff', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('department_id')->nullable();
            $table->string('employee_number')->unique();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->enum('gender', ['Male', 'Female'])->nullable();
            $table->string('type'); // Teaching, Support, Administrative
            $table->string('status')->default('Active'); // Active, On Leave, Suspended, Terminated, Retired
            $table->date('hire_date');
            $table->date('exit_date')->nullable();
            $table->decimal('salary', 15, 2)->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_id')->references('id')->on('users')->cascadeOnUpdate()->nullOnDelete();
            $table->foreign('department_id')->references('id')->on('departments')->cascadeOnUpdate()->nullOnDelete();
            $table->index('department_id');
            $table->index('type');
            $table->index('status');
            $table->index(['first_name', 'last_name']);
        });

        // Now add the FK from departments to staff
        Schema::table('departments', function (Blueprint $table) {
            $table->foreign('head_staff_id')->references('id')->on('staff')->cascadeOnUpdate()->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('departments', function (Blueprint $table) {
            $table->dropForeign(['head_staff_id']);
        });
        Schema::dropIfExists('staff');
    }
};
