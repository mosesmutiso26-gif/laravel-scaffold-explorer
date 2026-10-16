<?php

namespace App\Enums;

enum ConflictType: string
{
    case TeacherConflict = 'Teacher Conflict';
    case RoomConflict = 'Room Conflict';
    case ClassConflict = 'Class Conflict';
}

enum ConflictSeverity: string
{
    case Hard = 'Hard';
    case Soft = 'Soft';
}

enum AdjustmentStatus: string
{
    case Draft = 'Draft';
    case ConflictCheck = 'Conflict Check';
    case AwaitingApproval = 'Awaiting Approval';
    case Approved = 'Approved';
    case Rejected = 'Rejected';
    case Applied = 'Applied';
    case NotificationsSent = 'Notifications Sent';
    case Closed = 'Closed';
}
