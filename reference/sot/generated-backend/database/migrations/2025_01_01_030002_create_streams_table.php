<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('streams', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('class_id');
            $table->string('name'); // Cedar, Acacia, Tana, Athi
            $table->unsignedBigInteger('stream_teacher_id')->nullable();
            $table->timestamps();

            $table->foreign('class_id')->references('id')->on('classes')->cascadeOnUpdate()->restrictOnDelete();
            $table->index('class_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('streams');
    }
};
