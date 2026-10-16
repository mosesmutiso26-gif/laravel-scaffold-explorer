<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Enums\BriefingItemStatus;

class DailyBriefingItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'briefing_date', 'category', 'title', 'description',
        'source_type', 'source_id', 'severity', 'status',
        'assigned_to', 'reviewed_by', 'reviewed_at', 'follow_up_notes',
    ];

    protected function casts(): array
    {
        return [
            'briefing_date' => 'date',
            'status' => BriefingItemStatus::class,
            'reviewed_at' => 'datetime',
        ];
    }

    public function assignedToUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function reviewedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}
