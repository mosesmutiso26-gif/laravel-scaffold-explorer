<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Enums\ApprovalStatus;
use App\Enums\ApprovalType;

class ApprovalRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_type', 'requester_id', 'source_type', 'source_id',
        'reason', 'status', 'reviewer_id', 'review_decision',
        'review_notes', 'reviewed_at', 'policy_reference',
        'conflict_warnings',
    ];

    protected function casts(): array
    {
        return [
            'request_type' => ApprovalType::class,
            'status' => ApprovalStatus::class,
            'reviewed_at' => 'datetime',
            'conflict_warnings' => 'array',
        ];
    }

    public function requester(): BelongsTo
    {
        return $this->belongsTo(User::class, 'requester_id');
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }

    public function canBeReviewedBy(int $userId): bool
    {
        if ($this->requester_id === $userId && config('school.enforce_maker_checker', true)) {
            return false;
        }
        return $this->status === ApprovalStatus::Pending;
    }
}
