<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PurchaseRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_number', 'department_id', 'requested_by', 'justification',
        'estimated_total', 'status', 'approved_by', 'approved_at',
    ];

    protected function casts(): array
    {
        return [
            'estimated_total' => 'decimal:2',
            'approved_at' => 'datetime',
            'status' => \App\Enums\PurchaseRequestStatus::class,
        ];
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function requestedBy(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'requested_by');
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'approved_by');
    }
}
