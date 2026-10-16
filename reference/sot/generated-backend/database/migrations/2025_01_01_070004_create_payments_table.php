<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('student_id');
            $table->unsignedBigInteger('invoice_id')->nullable();
            $table->string('reference')->unique();
            $table->decimal('amount', 15, 2);
            $table->string('method'); // M-Pesa, Bank Transfer, Cash, Cheque
            $table->string('status')->default('Pending'); // Pending, Verified, Reversed
            $table->string('idempotency_key')->nullable()->unique();
            $table->text('note')->nullable();
            $table->unsignedBigInteger('received_by');
            $table->timestamp('verified_at')->nullable();
            $table->timestamps();

            $table->foreign('student_id')->references('id')->on('students')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('invoice_id')->references('id')->on('invoices')->cascadeOnUpdate()->nullOnDelete();
            $table->foreign('received_by')->references('id')->on('staff')->cascadeOnUpdate()->restrictOnDelete();
            $table->index(['student_id', 'status']);
            $table->index('reference');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
