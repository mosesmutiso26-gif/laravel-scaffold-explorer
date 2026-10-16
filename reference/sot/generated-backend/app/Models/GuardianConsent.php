<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Enums\ConsentStatus;

class GuardianConsent extends Model
{
    use HasFactory;

    protected $fillable = [
        'educational_trip_id', 'activity_event_id', 'student_id', 'guardian_id',
        'consent_status', 'consent_form_path', 'submitted_at', 'expires_at', 'verified_by',
    ];

    protected function casts(): array
    {
        return [
            'submitted_at' => 'datetime',
            'expires_at' => 'datetime',
            'consent_status' => ConsentStatus::class,
        ];
    }

    public function trip(): BelongsTo
    {
        return $this->belongsTo(EducationalTrip::class);
    }

    public function event(): BelongsTo
    {
        return $this->belongsTo(ActivityEvent::class);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function guardian(): BelongsTo
    {
        return $this->belongsTo(Guardian::class);
    }

    public function verifier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }
}
