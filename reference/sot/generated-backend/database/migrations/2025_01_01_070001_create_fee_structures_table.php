<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fee_structures', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('term_id');
            $table->string('class_level')->nullable(); // Specific class level or null for all
            $table->string('component'); // Tuition, Boarding, Transport, Activities
            $table->decimal('amount', 15, 2);
            $table->boolean('is_mandatory')->default(true);
            $table->unsignedBigInteger('created_by');
            $table->timestamps();

            $table->foreign('term_id')->references('id')->on('terms')->cascadeOnUpdate()->restrictOnDelete();
            $table->index(['term_id', 'class_level']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fee_structures');
    }
};
