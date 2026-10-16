<?php

namespace App\Enums;

enum SafeguardingStatus: string
{
    case Reported = 'Reported';
    case UnderReview = 'Under Review';
    case Actioned = 'Actioned';
    case Escalated = 'Escalated';
    case Closed = 'Closed';
}

enum SafeguardingSeverity: string
{
    case Low = 'Low';
    case Medium = 'Medium';
    case High = 'High';
    case Critical = 'Critical';
}
