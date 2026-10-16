<?php

namespace App\Enums;

enum BoardingPlacementStatus: string
{
    case Active = 'Active';
    case Withdrawn = 'Withdrawn';
    case Transferred = 'Transferred';
}

enum BedStatus: string
{
    case Vacant = 'Vacant';
    case Occupied = 'Occupied';
    case UnderMaintenance = 'Under Maintenance';
}

enum LeaveRequestStatus: string
{
    case AwaitingConsent = 'Awaiting Consent';
    case Approved = 'Approved';
    case Rejected = 'Rejected';
    case CheckedOut = 'Checked Out';
    case Returned = 'Returned';
    case Late = 'Late';
}

enum RollCallStatus: string
{
    case Open = 'Open';
    case Completed = 'Completed';
}

enum RollCallEntryStatus: string
{
    case Present = 'Present';
    case Absent = 'Absent';
    case Unaccounted = 'Unaccounted';
    case OnLeave = 'On Leave';
    case Sick = 'Sick';
}
