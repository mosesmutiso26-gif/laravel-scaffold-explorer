<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Enums\SafetyInspectionStatus;

class SafetyInspection extends Model
{
    use HasFactory;

    protected $fillable = [
        'lab_id', 'scheduled_date', 'status', 'checklist', 'inspector_id',
        'findings', 'completion_evidence', 'completed_at',
    ];

    protected function casts(): array
    {
        return [
            'scheduled_date' => 'date',
            'checklist' => 'array',
            'completed_at' => 'datetime',
            'status' => SafetyInspectionStatus::class,
        ];
    }

    public function lab(): BelongsTo
    {
        return $this->belongsTo(ScienceLab::class, 'lab_id');
    }

    public function inspector(): BelongsTo
    {
        return $this->belongsTo(User::class, 'inspector_id');
    }

    public function findings(): HasMany
    {
        return $this->hasMany(SafetyFinding::class);
    }
}
