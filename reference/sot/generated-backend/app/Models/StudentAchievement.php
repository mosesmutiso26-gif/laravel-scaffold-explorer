<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Enums\AchievementVisibility;

class StudentAchievement extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'student_id', 'club_id', 'title', 'description', 'achievement_date',
        'competition_name', 'level', 'position_or_award', 'verified_by',
        'verified_at', 'evidence_path', 'certificate_path', 'visibility',
    ];

    protected function casts(): array
    {
        return [
            'achievement_date' => 'date',
            'verified_at' => 'datetime',
            'visibility' => AchievementVisibility::class,
        ];
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function club(): BelongsTo
    {
        return $this->belongsTo(Club::class);
    }

    public function verifier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }
}
