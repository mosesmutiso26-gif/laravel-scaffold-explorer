<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Enums\ClubStatus;

class Club extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 'code', 'activity_category_id', 'description', 'educational_objectives',
        'eligibility_rules', 'membership_capacity', 'teacher_patron_id',
        'assistant_patron_ids', 'meeting_venue', 'meeting_schedule',
        'academic_year_id', 'term_id', 'status', 'constitution_document_path',
    ];

    protected function casts(): array
    {
        return [
            'assistant_patron_ids' => 'array',
            'membership_capacity' => 'integer',
            'status' => ClubStatus::class,
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(ActivityCategory::class, 'activity_category_id');
    }

    public function teacherPatron(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'teacher_patron_id');
    }

    public function academicYear(): BelongsTo
    {
        return $this->belongsTo(AcademicYear::class);
    }

    public function term(): BelongsTo
    {
        return $this->belongsTo(Term::class);
    }

    public function memberships(): HasMany
    {
        return $this->hasMany(ClubMembership::class);
    }

    public function activeMemberships(): HasMany
    {
        return $this->hasMany(ClubMembership::class)->where('status', \App\Enums\MembershipStatus::Active);
    }

    public function leaderships(): HasMany
    {
        return $this->hasMany(ClubLeadership::class);
    }

    public function events(): HasMany
    {
        return $this->hasMany(ActivityEvent::class);
    }

    public function budgets(): HasMany
    {
        return $this->hasMany(ActivityBudget::class);
    }

    public function reports(): HasMany
    {
        return $this->hasMany(ActivityReport::class);
    }

    public function achievements(): HasMany
    {
        return $this->hasMany(StudentAchievement::class);
    }
}
