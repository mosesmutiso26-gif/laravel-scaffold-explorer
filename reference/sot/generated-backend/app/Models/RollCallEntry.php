<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RollCallEntry extends Model
{
    use HasFactory;

    protected $fillable = ['roll_call_id', 'student_id', 'status', 'note'];

    protected function casts(): array
    {
        return ['status' => \App\Enums\RollCallEntryStatus::class];
    }

    public function rollCall(): BelongsTo
    {
        return $this->belongsTo(RollCall::class, 'roll_call_id');
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}
