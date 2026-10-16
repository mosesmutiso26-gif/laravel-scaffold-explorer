<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('library_books', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('isbn')->unique();
            $table->string('title');
            $table->string('author');
            $table->string('publisher')->nullable();
            $table->string('category')->nullable();
            $table->year('publication_year')->nullable();
            $table->integer('total_copies')->default(1);
            $table->integer('available_copies')->default(0);
            $table->string('shelf_location')->nullable();
            $table->timestamps();

            $table->index('title');
            $table->index('author');
            $table->index('category');
        });

        Schema::create('library_copies', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('book_id');
            $table->string('copy_number');
            $table->string('status')->default('Available'); // Available, On Loan, Lost, Damaged, Reserved
            $table->timestamps();

            $table->foreign('book_id')->references('id')->on('library_books')->cascadeOnUpdate()->restrictOnDelete();
            $table->unique(['book_id', 'copy_number']);
            $table->index('status');
        });

        Schema::create('library_loans', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('copy_id');
            $table->unsignedBigInteger('student_id');
            $table->unsignedBigInteger('issued_by');
            $table->timestamp('issued_at');
            $table->date('due_date');
            $table->timestamp('returned_at')->nullable();
            $table->unsignedBigInteger('received_by')->nullable();
            $table->string('status')->default('On Loan'); // On Loan, Returned, Overdue
            $table->timestamps();

            $table->foreign('copy_id')->references('id')->on('library_copies')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('student_id')->references('id')->on('students')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('issued_by')->references('id')->on('staff')->cascadeOnUpdate()->restrictOnDelete();
            $table->index(['student_id', 'status']);
            $table->index('due_date');
        });

        Schema::create('library_reservations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('book_id');
            $table->unsignedBigInteger('student_id');
            $table->string('status')->default('Pending'); // Pending, Fulfilled, Cancelled
            $table->timestamps();

            $table->foreign('book_id')->references('id')->on('library_books')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('student_id')->references('id')->on('students')->cascadeOnUpdate()->restrictOnDelete();
            $table->index(['book_id', 'status']);
        });

        Schema::create('library_fines', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('loan_id');
            $table->unsignedBigInteger('student_id');
            $table->decimal('amount', 15, 2);
            $table->string('status')->default('Unpaid'); // Unpaid, Paid, Waived
            $table->timestamps();

            $table->foreign('loan_id')->references('id')->on('library_loans')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('student_id')->references('id')->on('students')->cascadeOnUpdate()->restrictOnDelete();
            $table->index(['student_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('library_fines');
        Schema::dropIfExists('library_reservations');
        Schema::dropIfExists('library_loans');
        Schema::dropIfExists('library_copies');
        Schema::dropIfExists('library_books');
    }
};
