<?php

// generated_not_executed — Copilot must run these tests in a real Laravel installation

use App\Models\InventoryItem;
use App\Services\InventoryMovementService;
use App\Enums\StockMovementType;
use App\Exceptions\BusinessRuleException;

test('stock in increases quantity', function () {
    $item = InventoryItem::factory()->create(['quantity_on_hand' => 10]);
    $service = app(InventoryMovementService::class);
    $service->recordMovement($item->id, StockMovementType::In, 5, 1);
    expect((float) $item->fresh()->quantity_on_hand)->toBe(15.0);
});

test('stock out decreases quantity', function () {
    $item = InventoryItem::factory()->create(['quantity_on_hand' => 10]);
    $service = app(InventoryMovementService::class);
    $service->recordMovement($item->id, StockMovementType::Out, 3, 1);
    expect((float) $item->fresh()->quantity_on_hand)->toBe(7.0);
});

test('stock out prevents negative balance', function () {
    $item = InventoryItem::factory()->create(['quantity_on_hand' => 5]);
    $service = app(InventoryMovementService::class);
    expect(fn() => $service->recordMovement($item->id, StockMovementType::Out, 10, 1))
        ->toThrow(BusinessRuleException::class);
});

test('stock movement records balance after', function () {
    $item = InventoryItem::factory()->create(['quantity_on_hand' => 10]);
    $service = app(InventoryMovementService::class);
    $movement = $service->recordMovement($item->id, StockMovementType::In, 5, 1);
    expect((float) $movement->balance_after)->toBe(15.0);
});
