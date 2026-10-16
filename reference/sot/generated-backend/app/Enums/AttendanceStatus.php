<?php

namespace App\Enums;

enum AttendanceStatus: string
{
    case Present = 'Present';
    case Absent = 'Absent';
    case Late = 'Late';
    case Excused = 'Excused';
    case Sick = 'Sick';
}
