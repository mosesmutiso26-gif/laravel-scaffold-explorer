<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TransportRoute extends Model
{
    use HasFactory;

    protected $table = 'transport_routes';

    protected $fillable = [
        'name', 'vehicle_id', 'morning_pickup_time', 'evening_dropoff_time',
        'stops', 'fee', 'status',
    ];

    protected function casts(): array
    {
        return ['fee' => 'decimal:2'];
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function assignments(): HasMany
    {
        return $this->hasMany(TransportAssignment::class, 'route_id');
    }
}
