<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('timetable_versions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('academic_year_id');
            $table->unsignedBigInteger('term_id')->nullable();
            $table->string('version_label');
            $table->string('status')->default('Draft'); // Draft, Published, Archived
            $table->unsignedBigInteger('created_by');
            $table->timestamp('published_at')->nullable();
            $table->timestamps();

            $table->foreign('academic_year_id')->references('id')->on('academic_years')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('term_id')->references('id')->on('terms')->cascadeOnUpdate()->nullOnDelete();
            $table->foreign('created_by')->references('id')->on('staff')->cascadeOnUpdate()->restrictOnDelete();
            $table->index('status');
            $table->index('academic_year_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('timetable_versions');
    }
};
