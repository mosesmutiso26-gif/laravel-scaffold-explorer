<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Enums\SoftwareInstallationStatus;

class SoftwareInstallation extends Model
{
    use HasFactory;

    protected $fillable = [
        'software_product_id', 'workstation_id', 'computer_lab_id',
        'status', 'installed_at', 'installed_by', 'notes',
    ];

    protected function casts(): array
    {
        return [
            'installed_at' => 'date',
            'status' => SoftwareInstallationStatus::class,
        ];
    }

    public function softwareProduct(): BelongsTo
    {
        return $this->belongsTo(SoftwareProduct::class);
    }

    public function workstation(): BelongsTo
    {
        return $this->belongsTo(Workstation::class);
    }

    public function computerLab(): BelongsTo
    {
        return $this->belongsTo(ComputerLab::class);
    }

    public function installer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'installed_by');
    }
}
