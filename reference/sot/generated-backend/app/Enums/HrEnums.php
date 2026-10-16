<?php

namespace App\Enums;

enum LeaveRequestStatus: string
{
    case Pending = 'Pending';
    case Approved = 'Approved';
    case Rejected = 'Rejected';
    case Cancelled = 'Cancelled';
}

enum PayrollRunStatus: string
{
    case Draft = 'Draft';
    case Verified = 'Verified';
    case Approved = 'Approved';
    case Disbursed = 'Disbursed';
}
