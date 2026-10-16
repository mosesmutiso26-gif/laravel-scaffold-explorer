<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Enums\TripStatus;

class EducationalTrip extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title', 'educational_purpose', 'destination', 'departure_at', 'return_at',
        'organizer_id', 'supervisor_ids', 'eligible_class_ids', 'status', 'vehicle_id',
        'itinerary', 'risk_assessment', 'emergency_plan', 'budget_estimate',
        'approved_cost', 'required_documents', 'post_trip_report',
        'academic_year_id', 'term_id',
    ];

    protected function casts(): array
    {
        return [
            'departure_at' => 'datetime',
            'return_at' => 'datetime',
            'supervisor_ids' => 'array',
            'eligible_class_ids' => 'array',
            'budget_estimate' => 'decimal:2',
            'approved_cost' => 'decimal:2',
            'status' => TripStatus::class,
        ];
    }

    public function organizer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function academicYear(): BelongsTo
    {
        return $this->belongsTo(AcademicYear::class);
    }

    public function term(): BelongsTo
    {
        return $this->belongsTo(Term::class);
    }

    public function participants(): HasMany
    {
        return $this->hasMany(TripParticipant::class);
    }

    public function consents(): HasMany
    {
        return $this->hasMany(GuardianConsent::class);
    }

    public function budgets(): HasMany
    {
        return $this->hasMany(ActivityBudget::class);
    }

    public function isReadyForDeparture(): bool
    {
        if ($this->status !== TripStatus::ConsentCollection && $this->status !== TripStatus::ReadyForDeparture) {
            return false;
        }
        $allConsented = $this->participants()->whereDoesntHave('guardianConsent', function ($q): void {
            $q->where('consent_status', 'granted');
        })->doesntExist();
        return $allConsented && $this->risk_assessment !== null;
    }
}
