<?php

declare(strict_types=1);

namespace App\Enums;

enum ApprovalStatus: string
{
    case Pending = 'pending';
    case Approved = 'approved';
    case Rejected = 'rejected';
    case ReturnedForCorrection = 'returned_for_correction';
    case MoreInfoRequested = 'more_info_requested';
}

enum ApprovalType: string
{
    case TimetableAdjustment = 'timetable_adjustment';
    case SubstituteAssignment = 'substitute_assignment';
    case AssessmentPublication = 'assessment_publication';
    case StudentDiscipline = 'student_discipline';
    case SchoolEvent = 'school_event';
    case PrefectAppointment = 'prefect_appointment';
    case BoardingException = 'boarding_exception';
    case SportsEvent = 'sports_event';
    case ParentCommunication = 'parent_communication';
    case BursaryRequest = 'bursary_request';
    case BudgetRequest = 'budget_request';
    case StaffLeave = 'staff_leave';
}

enum ExecutiveTaskStatus: string
{
    case Pending = 'pending';
    case InProgress = 'in_progress';
    case Completed = 'completed';
    case Overdue = 'overdue';
    case Delegated = 'delegated';
    case Cancelled = 'cancelled';
}

enum ExecutiveTaskPriority: string
{
    case Low = 'low';
    case Medium = 'medium';
    case High = 'high';
    case Urgent = 'urgent';
}

enum BriefingItemStatus: string
{
    case New = 'new';
    case Reviewed = 'reviewed';
    case ActionAssigned = 'action_assigned';
    case Resolved = 'resolved';
}

enum InterventionStatus: string
{
    case Proposed = 'proposed';
    case Active = 'active';
    case UnderReview = 'under_review';
    case Escalated = 'escalated';
    case Closed = 'closed';
}

enum ObservationStatus: string
{
    case Scheduled = 'scheduled';
    case Completed = 'completed';
    case Reviewed = 'reviewed';
    case Closed = 'closed';
}
