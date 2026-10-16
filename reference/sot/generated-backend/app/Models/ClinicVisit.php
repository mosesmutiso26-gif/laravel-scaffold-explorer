<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ClinicVisit extends Model
{
    use HasFactory;

    protected $fillable = ['student_id', 'visit_date', 'complaint', 'diagnosis', 'treatment', 'attended_by', 'status', 'is_confidential'];

    protected function casts(): array
    {
        return ['visit_date' => 'date', 'is_confidential' => 'boolean'];
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function attendedBy(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'attended_by');
    }

    public function medications(): HasMany
    {
        return $this->hasMany(ClinicMedication::class, 'visit_id');
    }
}
