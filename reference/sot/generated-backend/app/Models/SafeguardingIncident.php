<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SafeguardingIncident extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id', 'type', 'severity', 'description', 'is_confidential',
        'status', 'reported_by', 'assigned_to',
    ];

    protected function casts(): array
    {
        return [
            'is_confidential' => 'boolean',
            'status' => \App\Enums\SafeguardingStatus::class,
            'severity' => \App\Enums\SafeguardingSeverity::class,
        ];
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function reportedBy(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'reported_by');
    }

    public function assignedTo(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'assigned_to');
    }

    public function actions(): HasMany
    {
        return $this->hasMany(SafeguardingAction::class, 'incident_id');
    }
}
