<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Club;
use App\Models\ClubMembership;
use App\Models\ActivityEvent;
use App\Models\EventAttendance;
use App\Models\Competition;
use App\Models\CompetitionEntry;
use App\Models\StudentAchievement;
use App\Models\EducationalTrip;
use App\Models\TripParticipant;
use App\Models\GuardianConsent;
use App\Models\ResourceReservation;
use App\Enums\MembershipStatus;
use App\Enums\TripStatus;
use App\Enums\ConsentStatus;
use App\Enums\ResourceReservationStatus;
use App\Exceptions\BusinessRuleException;
use Illuminate\Support\Facades\DB;

class CoCurricularService
{
    public function applyMembership(int $studentId, int $clubId, ?string $reason = null): ClubMembership
    {
        $club = Club::findOrFail($clubId);

        $existing = ClubMembership::where('student_id', $studentId)
            ->where('club_id', $clubId)
            ->whereIn('status', [MembershipStatus::Applied, MembershipStatus::UnderReview, MembershipStatus::Active, MembershipStatus::Approved])
            ->exists();

        if ($existing) {
            throw new BusinessRuleException('Student already has an active or pending membership in this club.');
        }

        $activeCount = $club->activeMemberships()->count();
        $willWaitlist = $club->membership_capacity > 0 && $activeCount >= $club->membership_capacity;

        return ClubMembership::create([
            'club_id' => $clubId,
            'student_id' => $studentId,
            'status' => MembershipStatus::Applied,
            'application_reason' => $reason,
            'applied_at' => now(),
        ]);
    }

    public function approveMembership(int $membershipId, int $approvedBy, ?string $rejectionReason = null): ClubMembership
    {
        $membership = ClubMembership::findOrFail($membershipId);

        if (!in_array($membership->status, [MembershipStatus::Applied, MembershipStatus::UnderReview])) {
            throw new BusinessRuleException('Only pending applications can be approved or rejected.');
        }

        $club = $membership->club;
        $activeCount = $club->activeMemberships()->count();

        if ($club->membership_capacity > 0 && $activeCount >= $club->membership_capacity) {
            $membership->update([
                'status' => MembershipStatus::Waitlisted,
                'approved_by' => $approvedBy,
                'approved_at' => now(),
            ]);
            return $membership->fresh();
        }

        $membership->update([
            'status' => MembershipStatus::Active,
            'approved_by' => $approvedBy,
            'approved_at' => now(),
            'start_date' => now(),
        ]);

        return $membership->fresh();
    }

    public function rejectMembership(int $membershipId, int $rejectedBy, string $reason): ClubMembership
    {
        $membership = ClubMembership::findOrFail($membershipId);

        if (!in_array($membership->status, [MembershipStatus::Applied, MembershipStatus::UnderReview])) {
            throw new BusinessRuleException('Only pending applications can be rejected.');
        }

        $membership->update([
            'status' => MembershipStatus::Rejected,
            'rejection_reason' => $reason,
            'approved_by' => $rejectedBy,
            'approved_at' => now(),
        ]);

        return $membership->fresh();
    }

    public function withdrawMembership(int $membershipId): ClubMembership
    {
        $membership = ClubMembership::findOrFail($membershipId);

        if (!in_array($membership->status, [MembershipStatus::Active, MembershipStatus::Applied, MembershipStatus::Approved])) {
            throw new BusinessRuleException('Membership cannot be withdrawn from its current state.');
        }

        $membership->update([
            'status' => MembershipStatus::Withdrawn,
            'end_date' => now(),
        ]);

        return $membership->fresh();
    }

    public function recordAttendance(int $eventId, array $records, int $recordedBy): array
    {
        $event = ActivityEvent::findOrFail($eventId);
        $created = [];

        DB::transaction(function () use ($eventId, $records, $recordedBy, &$created): void {
            foreach ($records as $record) {
                $existing = EventAttendance::where('activity_event_id', $eventId)
                    ->where('student_id', $record['student_id'])
                    ->exists();

                if ($existing) {
                    throw new BusinessRuleException("Attendance already recorded for student {$record['student_id']} in this event.");
                }

                $created[] = EventAttendance::create([
                    'activity_event_id' => $eventId,
                    'student_id' => $record['student_id'],
                    'attendance_status' => $record['attendance_status'],
                    'arrival_time' => $record['arrival_time'] ?? null,
                    'departure_time' => $record['departure_time'] ?? null,
                    'notes' => $record['notes'] ?? null,
                    'recorded_by' => $recordedBy,
                ]);
            }
        });

        return $created;
    }

    public function verifyAchievement(int $achievementId, int $verifiedBy): StudentAchievement
    {
        $achievement = StudentAchievement::findOrFail($achievementId);
        $achievement->update([
            'verified_by' => $verifiedBy,
            'verified_at' => now(),
        ]);
        return $achievement->fresh();
    }

    public function advanceTripStatus(int $tripId, string $targetStatus, int $userId): EducationalTrip
    {
        $trip = EducationalTrip::findOrFail($tripId);
        $target = TripStatus::from($targetStatus);

        if ($target === TripStatus::ReadyForDeparture) {
            if (!$trip->risk_assessment) {
                throw new BusinessRuleException('Trip cannot be ready for departure without a risk assessment.');
            }
            $missingConsent = $trip->participants()
                ->whereDoesntHave('guardianConsent', fn($q) => $q->where('consent_status', ConsentStatus::Granted))
                ->exists();
            if ($missingConsent) {
                throw new BusinessRuleException('Trip cannot be ready for departure with outstanding consent forms.');
            }
        }

        $trip->update(['status' => $target]);
        return $trip->fresh();
    }

    public function recordConsent(int $tripId, int $studentId, int $guardianId, string $consentStatus, ?string $formPath = null): GuardianConsent
    {
        $participant = TripParticipant::where('educational_trip_id', $tripId)
            ->where('student_id', $studentId)
            ->firstOrFail();

        $consent = GuardianConsent::updateOrCreate(
            [
                'educational_trip_id' => $tripId,
                'student_id' => $studentId,
                'guardian_id' => $guardianId,
            ],
            [
                'consent_status' => ConsentStatus::from($consentStatus),
                'consent_form_path' => $formPath,
                'submitted_at' => now(),
            ]
        );

        $participant->update(['consent_status' => ConsentStatus::from($consentStatus)]);

        return $consent;
    }

    public function reserveResource(int $eventId, array $data): ResourceReservation
    {
        return ResourceReservation::create([
            'activity_event_id' => $eventId,
            'inventory_item_id' => $data['inventory_item_id'] ?? null,
            'resource_name' => $data['resource_name'],
            'resource_type' => $data['resource_type'] ?? null,
            'quantity' => $data['quantity'] ?? 1,
            'status' => ResourceReservationStatus::Reserved,
            'responsible_person_id' => $data['responsible_person_id'] ?? null,
            'reserved_from' => $data['reserved_from'],
            'reserved_to' => $data['reserved_to'],
        ]);
    }

    public function returnResource(int $reservationId, ?string $conditionAfter = null, ?string $damageReport = null): ResourceReservation
    {
        $reservation = ResourceReservation::findOrFail($reservationId);
        $reservation->update([
            'status' => $damageReport ? ResourceReservationStatus::Damaged : ResourceReservationStatus::Returned,
            'condition_after' => $conditionAfter,
            'damage_report' => $damageReport,
        ]);
        return $reservation->fresh();
    }

    public function dashboardStats(int $academicYearId): array
    {
        return [
            'active_clubs' => Club::where('status', \App\Enums\ClubStatus::Active)->count(),
            'total_participants' => ClubMembership::where('status', MembershipStatus::Active)
                ->distinct('student_id')->count(),
            'events_this_week' => ActivityEvent::whereBetween('event_date', [now()->startOfWeek(), now()->endOfWeek()])->count(),
            'pending_applications' => ClubMembership::whereIn('status', [MembershipStatus::Applied, MembershipStatus::UnderReview])->count(),
            'upcoming_competitions' => Competition::where('start_date', '>', now())->count(),
            'upcoming_trips' => EducationalTrip::whereIn('status', [TripStatus::Approved, TripStatus::ConsentCollection, TripStatus::ReadyForDeparture])
                ->where('departure_at', '>', now())->count(),
            'pending_consents' => GuardianConsent::where('consent_status', ConsentStatus::Pending)->count(),
            'unverified_achievements' => StudentAchievement::whereNull('verified_at')->count(),
            'outstanding_reports' => \App\Models\ActivityReport::where('status', 'draft')->count(),
        ];
    }
}
