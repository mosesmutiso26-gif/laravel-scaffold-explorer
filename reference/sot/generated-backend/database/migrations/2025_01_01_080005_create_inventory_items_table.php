<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inventory_items', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('sku')->unique();
            $table->string('category')->nullable();
            $table->string('unit')->default('pcs');
            $table->decimal('quantity_on_hand', 12, 2)->default(0);
            $table->decimal('reorder_level', 12, 2)->default(0);
            $table->decimal('unit_price', 15, 2)->nullable();
            $table->string('location')->nullable();
            $table->string('status')->default('Active'); // Active, Discontinued
            $table->timestamps();

            $table->index('sku');
            $table->index('category');
            $table->index('status');
        });

        Schema::create('stock_movements', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('inventory_item_id');
            $table->string('type'); // In, Out, Adjustment, Transfer
            $table->decimal('quantity', 12, 2);
            $table->decimal('balance_after', 12, 2);
            $table->string('reference_type')->nullable(); // PO, GRN, Issue, Adjustment
            $table->unsignedBigInteger('reference_id')->nullable();
            $table->text('note')->nullable();
            $table->unsignedBigInteger('performed_by');
            $table->timestamps();

            $table->foreign('inventory_item_id')->references('id')->on('inventory_items')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('performed_by')->references('id')->on('staff')->cascadeOnUpdate()->restrictOnDelete();
            $table->index(['inventory_item_id', 'type']);
            $table->index(['reference_type', 'reference_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stock_movements');
        Schema::dropIfExists('inventory_items');
    }
};
