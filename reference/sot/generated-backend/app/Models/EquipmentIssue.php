<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EquipmentIssue extends Model
{
    use HasFactory;

    protected $fillable = ['equipment_id', 'student_id', 'quantity', 'issued_at', 'returned_at', 'status', 'issued_by'];

    protected function casts(): array
    {
        return [
            'issued_at' => 'datetime',
            'returned_at' => 'datetime',
            'status' => \App\Enums\EquipmentIssueStatus::class,
        ];
    }

    public function equipment(): BelongsTo
    {
        return $this->belongsTo(SportsEquipment::class, 'equipment_id');
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function issuedBy(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'issued_by');
    }
}
