<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cms_pages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('slug')->unique();
            $table->string('title');
            $table->longText('content')->nullable();
            $table->string('status')->default('Draft'); // Draft, Published, Archived
            $table->unsignedBigInteger('last_edited_by')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();

            $table->foreign('last_edited_by')->references('id')->on('staff')->cascadeOnUpdate()->nullOnDelete();
            $table->index('slug');
            $table->index('status');
        });

        Schema::create('cms_announcements', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->longText('body');
            $table->string('status')->default('Draft'); // Draft, Published, Archived
            $table->unsignedBigInteger('created_by');
            $table->timestamp('published_at')->nullable();
            $table->timestamps();

            $table->foreign('created_by')->references('id')->on('staff')->cascadeOnUpdate()->restrictOnDelete();
            $table->index('status');
        });

        Schema::create('enquiries', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('subject');
            $table->text('message');
            $table->string('status')->default('New'); // New, Responded, Closed
            $table->timestamps();

            $table->index('status');
        });

        Schema::create('notifications', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->string('type');
            $table->json('data');
            $table->timestamp('read_at')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->cascadeOnUpdate()->restrictOnDelete();
            $table->index(['user_id', 'read_at']);
        });

        Schema::create('documents', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('documentable_type')->nullable();
            $table->unsignedBigInteger('documentable_id')->nullable();
            $table->string('type'); // Report Card, Invoice, Receipt, Payslip, Contract
            $table->string('file_path');
            $table->string('file_name');
            $table->string('mime_type')->nullable();
            $table->unsignedBigInteger('generated_by')->nullable();
            $table->timestamps();

            $table->index(['documentable_type', 'documentable_id']);
            $table->index('type');
        });

        Schema::create('audit_entries', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('actor_id')->nullable();
            $table->string('action');
            $table->string('auditable_type')->nullable();
            $table->unsignedBigInteger('auditable_id')->nullable();
            $table->json('before')->nullable();
            $table->json('after')->nullable();
            $table->string('ip_address')->nullable();
            $table->string('correlation_id')->nullable();
            $table->timestamps();

            $table->index(['auditable_type', 'auditable_id']);
            $table->index('actor_id');
            $table->index('action');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('audit_entries');
        Schema::dropIfExists('documents');
        Schema::dropIfExists('notifications');
        Schema::dropIfExists('enquiries');
        Schema::dropIfExists('cms_announcements');
        Schema::dropIfExists('cms_pages');
    }
};
