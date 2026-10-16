<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subjects', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('department_id')->nullable();
            $table->string('name');
            $table->string('code')->unique();
            $table->boolean('is_compulsory')->default(true);
            $table->timestamps();

            $table->foreign('department_id')->references('id')->on('departments')->cascadeOnUpdate()->nullOnDelete();
            $table->index('department_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subjects');
    }
};
