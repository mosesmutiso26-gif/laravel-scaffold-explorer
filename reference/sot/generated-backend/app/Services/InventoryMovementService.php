<?php

namespace App\Services;

use App\Models\InventoryItem;
use App\Models\StockMovement;
use App\Enums\StockMovementType;
use Illuminate\Support\Facades\DB;
use App\Exceptions\BusinessRuleException;

class InventoryMovementService
{
    public function recordMovement(
        int $itemId,
        StockMovementType $type,
        float $quantity,
        ?int $performedBy,
        ?string $referenceType = null,
        ?int $referenceId = null,
        ?string $note = null
    ): StockMovement {
        $item = InventoryItem::findOrFail($itemId);
        return DB::transaction(function () use ($item, $type, $quantity, $performedBy, $referenceType, $referenceId, $note): StockMovement {
            $newBalance = match ($type) {
                StockMovementType::In => $item->quantity_on_hand + $quantity,
                StockMovementType::Out => $item->quantity_on_hand - $quantity,
                StockMovementType::Adjustment => $quantity,
                StockMovementType::Transfer => $item->quantity_on_hand,
            };
            if ($newBalance < 0) {
                throw new BusinessRuleException('Insufficient stock for this movement.');
            }
            $movement = StockMovement::create([
                'inventory_item_id' => $item->id,
                'type' => $type,
                'quantity' => $quantity,
                'balance_after' => $newBalance,
                'reference_type' => $referenceType,
                'reference_id' => $referenceId,
                'note' => $note,
                'performed_by' => $performedBy,
            ]);
            $item->update(['quantity_on_hand' => $newBalance]);
            return $movement;
        });
    }
}
