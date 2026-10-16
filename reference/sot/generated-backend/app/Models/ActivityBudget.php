<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Enums\BudgetStatus;

class ActivityBudget extends Model
{
    use HasFactory;

    protected $fillable = [
        'club_id', 'activity_event_id', 'educational_trip_id',
        'proposed_amount', 'approved_amount', 'actual_expenditure',
        'status', 'cost_breakdown', 'approved_by', 'notes',
    ];

    protected function casts(): array
    {
        return [
            'proposed_amount' => 'decimal:2',
            'approved_amount' => 'decimal:2',
            'actual_expenditure' => 'decimal:2',
            'cost_breakdown' => 'array',
            'status' => BudgetStatus::class,
        ];
    }

    public function club(): BelongsTo
    {
        return $this->belongsTo(Club::class);
    }

    public function event(): BelongsTo
    {
        return $this->belongsTo(ActivityEvent::class);
    }

    public function trip(): BelongsTo
    {
        return $this->belongsTo(EducationalTrip::class);
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}
