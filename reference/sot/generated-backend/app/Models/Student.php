<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id', 'admission_number', 'first_name', 'last_name', 'date_of_birth',
        'gender', 'nationality', 'blood_group', 'photo_path', 'mode', 'status',
        'admission_date', 'exit_date', 'exit_reason',
    ];

    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date',
            'admission_date' => 'date',
            'exit_date' => 'date',
            'status' => \App\Enums\StudentStatus::class,
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function guardians(): BelongsToMany
    {
        return $this->belongsToMany(Guardian::class, 'student_guardians')
            ->withPivot('relationship', 'is_primary', 'is_emergency_contact')
            ->withTimestamps();
    }

    public function enrolments(): HasMany
    {
        return $this->hasMany(Enrolment::class);
    }

    public function currentEnrolment(): ?Enrolment
    {
        return $this->enrolments()->where('status', \App\Enums\EnrolmentStatus::Active)->latest()->first();
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function attendanceRecords(): HasMany
    {
        return $this->hasMany(AttendanceRecord::class);
    }

    public function grades(): HasMany
    {
        return $this->hasMany(Grade::class);
    }

    public function reportCards(): HasMany
    {
        return $this->hasMany(ReportCard::class);
    }

    public function libraryLoans(): HasMany
    {
        return $this->hasMany(LibraryLoan::class);
    }

    public function transportAssignments(): HasMany
    {
        return $this->hasMany(TransportAssignment::class);
    }

    public function boardingPlacements(): HasMany
    {
        return $this->hasMany(BoardingPlacement::class);
    }

    public function clinicVisits(): HasMany
    {
        return $this->hasMany(ClinicVisit::class);
    }

    public function safeguardingIncidents(): HasMany
    {
        return $this->hasMany(SafeguardingIncident::class);
    }

    public function squadMemberships(): HasMany
    {
        return $this->hasMany(SquadMember::class);
    }

    public function leaveRequests(): HasMany
    {
        return $this->hasMany(LeaveRequest::class);
    }

    public function fullName(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
