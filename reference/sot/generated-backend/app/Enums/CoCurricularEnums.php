<?php

declare(strict_types=1);

namespace App\Enums;

enum ClubStatus: string
{
    case Draft = 'draft';
    case Active = 'active';
    case Suspended = 'suspended';
    case Archived = 'archived';
}

enum MembershipStatus: string
{
    case Applied = 'applied';
    case UnderReview = 'under_review';
    case Approved = 'approved';
    case Waitlisted = 'waitlisted';
    case Rejected = 'rejected';
    case Active = 'active';
    case Completed = 'completed';
    case Withdrawn = 'withdrawn';
    case Suspended = 'suspended';
}

enum LeadershipPosition: string
{
    case Chairperson = 'chairperson';
    case ViceChairperson = 'vice_chairperson';
    case Secretary = 'secretary';
    case Treasurer = 'treasurer';
    case TeamCaptain = 'team_captain';
    case EventCoordinator = 'event_coordinator';
}

enum ActivityEventStatus: string
{
    case Draft = 'draft';
    case PendingApproval = 'pending_approval';
    case Approved = 'approved';
    case Scheduled = 'scheduled';
    case InProgress = 'in_progress';
    case Completed = 'completed';
    case Cancelled = 'cancelled';
    case Rescheduled = 'rescheduled';
}

enum CompetitionLevel: string
{
    case Internal = 'internal';
    case InterClass = 'inter_class';
    case InterHouse = 'inter_house';
    case InterSchool = 'inter_school';
    case SubCounty = 'sub_county';
    case County = 'county';
    case Regional = 'regional';
    case National = 'national';
    case International = 'international';
}

enum TripStatus: string
{
    case Draft = 'draft';
    case Submitted = 'submitted';
    case Reviewed = 'reviewed';
    case Approved = 'approved';
    case Rejected = 'rejected';
    case ConsentCollection = 'consent_collection';
    case ReadyForDeparture = 'ready_for_departure';
    case InProgress = 'in_progress';
    case Returned = 'returned';
    case ReportSubmitted = 'report_submitted';
    case Closed = 'closed';
}

enum ConsentStatus: string
{
    case Pending = 'pending';
    case Granted = 'granted';
    case Withdrawn = 'withdrawn';
    case Declined = 'declined';
    case Expired = 'expired';
}

enum AchievementLevel: string
{
    case School = 'school';
    case SubCounty = 'sub_county';
    case County = 'county';
    case Regional = 'regional';
    case National = 'national';
    case International = 'international';
}

enum AchievementVisibility: string
{
    case Private = 'private';
    case StaffOnly = 'staff_only';
    case Published = 'published';
}

enum BudgetStatus: string
{
    case Proposed = 'proposed';
    case Approved = 'approved';
    case Rejected = 'rejected';
    case Spent = 'spent';
}

enum ResourceReservationStatus: string
{
    case Reserved = 'reserved';
    case Issued = 'issued';
    case Returned = 'returned';
    case Cancelled = 'cancelled';
    case Damaged = 'damaged';
    case Lost = 'lost';
}
