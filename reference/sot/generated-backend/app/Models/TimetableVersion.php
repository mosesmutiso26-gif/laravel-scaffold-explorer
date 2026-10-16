<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TimetableVersion extends Model
{
    use HasFactory;

    protected $fillable = ['academic_year_id', 'term_id', 'version_label', 'status', 'created_by', 'published_at'];

    protected function casts(): array
    {
        return [
            'status' => \App\Enums\TimetableVersionStatus::class,
            'published_at' => 'datetime',
        ];
    }

    public function academicYear(): BelongsTo
    {
        return $this->belongsTo(AcademicYear::class);
    }

    public function term(): BelongsTo
    {
        return $this->belongsTo(Term::class);
    }

    public function entries(): HasMany
    {
        return $this->hasMany(TimetableEntry::class, 'version_id');
    }
}
