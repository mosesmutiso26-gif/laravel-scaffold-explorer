<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Enums\AssetAuditStatus;

class AssetAudit extends Model
{
    use HasFactory;

    protected $fillable = [
        'computer_lab_id', 'scheduled_date', 'status', 'auditor_id',
        'expected_assets', 'found_assets', 'discrepancies', 'completed_at',
    ];

    protected function casts(): array
    {
        return [
            'scheduled_date' => 'date',
            'completed_at' => 'datetime',
            'expected_assets' => 'array',
            'found_assets' => 'array',
            'status' => AssetAuditStatus::class,
        ];
    }

    public function computerLab(): BelongsTo
    {
        return $this->belongsTo(ComputerLab::class);
    }

    public function auditor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'auditor_id');
    }
}
