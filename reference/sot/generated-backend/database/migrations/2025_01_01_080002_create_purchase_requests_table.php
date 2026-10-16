<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('purchase_requests', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('request_number')->unique();
            $table->unsignedBigInteger('department_id')->nullable();
            $table->unsignedBigInteger('requested_by');
            $table->text('justification')->nullable();
            $table->decimal('estimated_total', 15, 2)->nullable();
            $table->string('status')->default('Pending'); // Pending, Approved, Rejected, Converted
            $table->unsignedBigInteger('approved_by')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();

            $table->foreign('department_id')->references('id')->on('departments')->cascadeOnUpdate()->nullOnDelete();
            $table->foreign('requested_by')->references('id')->on('staff')->cascadeOnUpdate()->restrictOnDelete();
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('purchase_requests');
    }
};
