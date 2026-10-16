<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SafeguardingAction extends Model
{
    use HasFactory;

    protected $fillable = ['incident_id', 'action', 'outcome', 'taken_by'];

    public function incident(): BelongsTo
    {
        return $this->belongsTo(SafeguardingIncident::class, 'incident_id');
    }

    public function takenBy(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'taken_by');
    }
}
