<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('purchase_orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('po_number')->unique();
            $table->unsignedBigInteger('supplier_id');
            $table->unsignedBigInteger('purchase_request_id')->nullable();
            $table->unsignedBigInteger('created_by');
            $table->decimal('total', 15, 2);
            $table->string('status')->default('Draft'); // Draft, Submitted, Approved, Sent, Partially Received, Received, Closed
            $table->unsignedBigInteger('approved_by')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();

            $table->foreign('supplier_id')->references('id')->on('suppliers')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('purchase_request_id')->references('id')->on('purchase_requests')->cascadeOnUpdate()->nullOnDelete();
            $table->foreign('created_by')->references('id')->on('staff')->cascadeOnUpdate()->restrictOnDelete();
            $table->index('status');
            $table->index('supplier_id');
        });

        Schema::create('purchase_order_items', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('purchase_order_id');
            $table->string('description');
            $table->string('unit')->default('pcs');
            $table->decimal('quantity', 12, 2);
            $table->decimal('unit_price', 15, 2);
            $table->decimal('line_total', 15, 2);
            $table->timestamps();

            $table->foreign('purchase_order_id')->references('id')->on('purchase_orders')->cascadeOnUpdate()->restrictOnDelete();
            $table->index('purchase_order_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('purchase_order_items');
        Schema::dropIfExists('purchase_orders');
    }
};
