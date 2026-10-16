<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BoardingPlacement extends Model
{
    use HasFactory;

    protected $fillable = ['student_id', 'bed_id', 'start_date', 'end_date', 'status', 'placed_by'];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'status' => \App\Enums\BoardingPlacementStatus::class,
        ];
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function bed(): BelongsTo
    {
        return $this->belongsTo(Bed::class);
    }

    public function placedBy(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'placed_by');
    }
}
