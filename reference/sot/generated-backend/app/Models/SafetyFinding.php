<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Enums\SafetyFindingStatus;

class SafetyFinding extends Model
{
    use HasFactory;

    protected $fillable = [
        'safety_inspection_id', 'finding', 'corrective_action',
        'assigned_to', 'due_date', 'status',
    ];

    protected function casts(): array
    {
        return [
            'due_date' => 'date',
            'status' => SafetyFindingStatus::class,
        ];
    }

    public function inspection(): BelongsTo
    {
        return $this->belongsTo(SafetyInspection::class);
    }

    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}
