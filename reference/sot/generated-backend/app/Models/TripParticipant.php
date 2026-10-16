<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Enums\ConsentStatus;

class TripParticipant extends Model
{
    use HasFactory;

    protected $fillable = [
        'educational_trip_id', 'student_id', 'consent_status',
        'departure_checked', 'return_checked', 'medical_notes',
    ];

    protected function casts(): array
    {
        return [
            'departure_checked' => 'boolean',
            'return_checked' => 'boolean',
            'consent_status' => ConsentStatus::class,
        ];
    }

    public function trip(): BelongsTo
    {
        return $this->belongsTo(EducationalTrip::class);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function guardianConsent(): BelongsTo
    {
        return $this->belongsTo(GuardianConsent::class, 'student_id', 'student_id')
            ->where('educational_trip_id', $this->educational_trip_id);
    }
}
