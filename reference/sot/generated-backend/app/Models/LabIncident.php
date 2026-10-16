<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Enums\LabIncidentStatus;
use App\Enums\LabIncidentSeverity;

class LabIncident extends Model
{
    use HasFactory;

    protected $fillable = [
        'lab_id', 'incident_type', 'severity', 'incident_at', 'description',
        'immediate_actions', 'people_involved', 'assigned_reviewer',
        'status', 'follow_up_actions', 'closed_at',
    ];

    protected function casts(): array
    {
        return [
            'incident_at' => 'datetime',
            'people_involved' => 'array',
            'closed_at' => 'datetime',
            'status' => LabIncidentStatus::class,
            'severity' => LabIncidentSeverity::class,
        ];
    }

    public function lab(): BelongsTo
    {
        return $this->belongsTo(ScienceLab::class, 'lab_id');
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_reviewer');
    }
}
