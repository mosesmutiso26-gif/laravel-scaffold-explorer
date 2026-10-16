<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Enums\TechnicalTicketStatus;
use App\Enums\TechnicalTicketPriority;

class TechnicalTicket extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'issue_type', 'priority', 'status',
        'computer_lab_id', 'workstation_id', 'ict_asset_id', 'reporter_id',
        'assigned_technician', 'troubleshooting_notes', 'resolution',
        'resolved_at', 'downtime_minutes',
    ];

    protected function casts(): array
    {
        return [
            'resolved_at' => 'datetime',
            'downtime_minutes' => 'integer',
            'status' => TechnicalTicketStatus::class,
            'priority' => TechnicalTicketPriority::class,
        ];
    }

    public function computerLab(): BelongsTo
    {
        return $this->belongsTo(ComputerLab::class);
    }

    public function workstation(): BelongsTo
    {
        return $this->belongsTo(Workstation::class);
    }

    public function ictAsset(): BelongsTo
    {
        return $this->belongsTo(IctAsset::class);
    }

    public function reporter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reporter_id');
    }

    public function technician(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_technician');
    }
}
