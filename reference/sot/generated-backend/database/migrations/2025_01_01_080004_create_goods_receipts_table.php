<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('goods_receipts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('grn_number')->unique();
            $table->unsignedBigInteger('purchase_order_id');
            $table->unsignedBigInteger('received_by');
            $table->date('received_date');
            $table->string('status')->default('Received'); // Received, Rejected, Partial
            $table->text('note')->nullable();
            $table->timestamps();

            $table->foreign('purchase_order_id')->references('id')->on('purchase_orders')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('received_by')->references('id')->on('staff')->cascadeOnUpdate()->restrictOnDelete();
            $table->index('purchase_order_id');
        });

        Schema::create('goods_receipt_items', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('goods_receipt_id');
            $table->unsignedBigInteger('purchase_order_item_id');
            $table->decimal('quantity_received', 12, 2);
            $table->text('note')->nullable();
            $table->timestamps();

            $table->foreign('goods_receipt_id')->references('id')->on('goods_receipts')->cascadeOnUpdate()->restrictOnDelete();
            $table->index('goods_receipt_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('goods_receipt_items');
        Schema::dropIfExists('goods_receipts');
    }
};
