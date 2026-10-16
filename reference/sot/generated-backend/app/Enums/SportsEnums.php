<?php

namespace App\Enums;

enum FixtureResult: string
{
    case Pending = 'Pending';
    case Won = 'Won';
    case Lost = 'Lost';
    case Draw = 'Draw';
}

enum TrainingSessionStatus: string
{
    case Scheduled = 'Scheduled';
    case Completed = 'Completed';
    case Cancelled = 'Cancelled';
}

enum EquipmentIssueStatus: string
{
    case Issued = 'Issued';
    case Returned = 'Returned';
}
