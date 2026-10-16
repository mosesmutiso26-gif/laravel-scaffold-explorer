<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Enums\ResourceReservationStatus;

class ResourceReservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'activity_event_id', 'inventory_item_id', 'resource_name', 'resource_type',
        'quantity', 'status', 'responsible_person_id', 'condition_before',
        'condition_after', 'reserved_from', 'reserved_to', 'damage_report',
    ];

    protected function casts(): array
    {
        return [
            'quantity' => 'integer',
            'reserved_from' => 'datetime',
            'reserved_to' => 'datetime',
            'status' => ResourceReservationStatus::class,
        ];
    }

    public function event(): BelongsTo
    {
        return $this->belongsTo(ActivityEvent::class);
    }

    public function inventoryItem(): BelongsTo
    {
        return $this->belongsTo(InventoryItem::class);
    }

    public function responsiblePerson(): BelongsTo
    {
        return $this->belongsTo(User::class, 'responsible_person_id');
    }
}
