<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Competition extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 'organizer', 'level', 'category', 'venue', 'start_date', 'end_date',
        'participating_club_ids', 'supervising_staff_id', 'entry_requirements',
        'registration_deadline', 'status', 'lessons_learned', 'post_event_report',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'registration_deadline' => 'date',
            'participating_club_ids' => 'array',
        ];
    }

    public function supervisingStaff(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'supervising_staff_id');
    }

    public function entries(): HasMany
    {
        return $this->hasMany(CompetitionEntry::class);
    }
}
