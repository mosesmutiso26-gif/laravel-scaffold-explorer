<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\InventoryItem;
use App\Services\InventoryMovementService;
use App\Enums\StockMovementType;
use Illuminate\Http\Request;

class InventoryController extends BaseApiController
{
    public function __construct(private InventoryMovementService $movementService) {}

    public function index(Request $request)
    {
        $query = InventoryItem::query();
        if ($request->filled('category')) $query->where('category', $request->category);
        if ($request->filled('status')) $query->where('status', $request->status);
        $items = $query->with('stockMovements')->paginate($request->per_page ?? 20);
        return $this->success($items->items());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string'],
            'sku' => ['required', 'string', 'unique:inventory_items,sku'],
            'category' => ['nullable', 'string'],
            'unit' => ['nullable', 'string'],
            'reorder_level' => ['nullable', 'numeric', 'min:0'],
            'unit_price' => ['nullable', 'numeric', 'min:0'],
            'location' => ['nullable', 'string'],
        ]);
        $validated['quantity_on_hand'] = 0;
        $validated['status'] = 'Active';
        $item = InventoryItem::create($validated);
        return $this->success($item, 'Inventory item created', 201);
    }

    public function show(InventoryItem $inventoryItem)
    {
        $inventoryItem->load('stockMovements');
        return $this->success($inventoryItem);
    }

    public function update(Request $request, InventoryItem $inventoryItem)
    {
        $inventoryItem->update($request->only(['name', 'category', 'reorder_level', 'unit_price', 'location', 'status']));
        return $this->success($inventoryItem, 'Item updated');
    }

    public function recordMovement(Request $request, InventoryItem $item)
    {
        $validated = $request->validate([
            'type' => ['required', 'in:In,Out,Adjustment,Transfer'],
            'quantity' => ['required', 'numeric', 'min:0.01'],
            'note' => ['nullable', 'string'],
        ]);
        $movement = $this->movementService->recordMovement(
            $item->id,
            StockMovementType::from($validated['type']),
            $validated['quantity'],
            auth()->user()->staff?->id ?? 1,
            null, null,
            $validated['note'] ?? null
        );
        return $this->success($movement, 'Movement recorded', 201);
    }

    public function destroy(InventoryItem $inventoryItem)
    {
        $inventoryItem->delete();
        return $this->success(null, 'Item deleted', 204);
    }
}
