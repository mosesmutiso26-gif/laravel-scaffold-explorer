<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('teachers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('staff_id');
            $table->unsignedBigInteger('department_id')->nullable();
            $table->string('tsc_number')->unique();
            $table->string('qualification')->nullable();
            $table->string('specialization')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('staff_id')->references('id')->on('staff')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('department_id')->references('id')->on('departments')->cascadeOnUpdate()->nullOnDelete();
            $table->index('department_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};
