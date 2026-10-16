<?php

// generated_not_executed

use App\Models\InventoryItem;
use App\Services\InventoryMovementService;
use App\Enums\StockMovementType;

test('adjustment sets absolute quantity', function () {
    $item = InventoryItem::factory()->create(['quantity_on_hand' => 10]);
    $service = app(InventoryMovementService::class);
    $service->recordMovement($item->id, StockMovementType::Adjustment, 25, 1);
    expect((float) $item->fresh()->quantity_on_hand)->toBe(25.0);
});
