<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('student_id');
            $table->unsignedBigInteger('term_id');
            $table->string('invoice_number')->unique();
            $table->decimal('total', 15, 2);
            $table->decimal('paid', 15, 2)->default(0);
            $table->decimal('balance', 15, 2);
            $table->string('status')->default('Draft'); // Draft, Issued, Partially Paid, Paid, Overdue, Cancelled
            $table->date('issue_date');
            $table->date('due_date');
            $table->unsignedBigInteger('created_by');
            $table->timestamps();

            $table->foreign('student_id')->references('id')->on('students')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('term_id')->references('id')->on('terms')->cascadeOnUpdate()->restrictOnDelete();
            $table->index(['student_id', 'status']);
            $table->index('invoice_number');
            $table->index('term_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
