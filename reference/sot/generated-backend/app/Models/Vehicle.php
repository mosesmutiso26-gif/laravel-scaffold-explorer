<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration', 'make', 'model', 'capacity', 'type', 'status',
        'insurance_expiry', 'inspection_expiry', 'driver_staff_id',
    ];

    protected function casts(): array
    {
        return ['insurance_expiry' => 'date', 'inspection_expiry' => 'date'];
    }

    public function routes(): HasMany
    {
        return $this->hasMany(TransportRoute::class, 'vehicle_id');
    }
}
