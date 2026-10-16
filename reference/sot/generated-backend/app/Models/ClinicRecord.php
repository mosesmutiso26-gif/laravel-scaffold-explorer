<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClinicRecord extends Model
{
    use HasFactory;

    protected $fillable = ['student_id', 'condition', 'details', 'is_confidential', 'recorded_by'];

    protected function casts(): array
    {
        return ['is_confidential' => 'boolean'];
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function recordedBy(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'recorded_by');
    }
}
