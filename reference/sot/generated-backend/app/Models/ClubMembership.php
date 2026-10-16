<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Enums\MembershipStatus;

class ClubMembership extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'club_id', 'student_id', 'status', 'application_reason', 'rejection_reason',
        'applied_at', 'approved_at', 'start_date', 'end_date', 'approved_by',
    ];

    protected function casts(): array
    {
        return [
            'applied_at' => 'date',
            'approved_at' => 'date',
            'start_date' => 'date',
            'end_date' => 'date',
            'status' => MembershipStatus::class,
        ];
    }

    public function club(): BelongsTo
    {
        return $this->belongsTo(Club::class);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}
