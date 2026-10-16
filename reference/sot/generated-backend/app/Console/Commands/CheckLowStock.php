<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\InventoryItem;

class CheckLowStock extends Command
{
    protected $signature = 'check-low-stock';
    protected $description = 'Check inventory items below reorder level';

    public function handle(): int
    {
        $lowStock = InventoryItem::whereColumn('quantity_on_hand', '<=', 'reorder_level')
            ->where('status', 'Active')->get();
        if ($lowStock->isEmpty()) {
            $this->info('No low stock items found.');
            return self::SUCCESS;
        }
        $this->warn("Found {$lowStock->count()} low stock items:");
        $lowStock->each(fn($item) => $this->line("  - {$item->name} (SKU: {$item->sku}, On hand: {$item->quantity_on_hand}, Reorder at: {$item->reorder_level})"));
        return self::SUCCESS;
    }
}
