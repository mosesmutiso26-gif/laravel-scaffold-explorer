<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Enums\ExecutiveTaskStatus;
use App\Enums\ExecutiveTaskPriority;

class ExecutiveTask extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'assigned_by', 'assigned_to', 'delegated_to',
        'source_type', 'source_id', 'priority', 'status',
        'due_date', 'completed_at', 'completion_notes',
    ];

    protected function casts(): array
    {
        return [
            'priority' => ExecutiveTaskPriority::class,
            'status' => ExecutiveTaskStatus::class,
            'due_date' => 'date',
            'completed_at' => 'datetime',
        ];
    }

    public function assignedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_by');
    }

    public function assignedToUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function delegatedToUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'delegated_to');
    }

    public function isOverdue(): bool
    {
        return $this->due_date !== null
            && $this->due_date->isPast()
            && !in_array($this->status, [ExecutiveTaskStatus::Completed, ExecutiveTaskStatus::Cancelled]);
    }
}
