<?php

namespace App\Enums;

enum StaffStatus: string
{
    case Active = 'Active';
    case OnLeave = 'On Leave';
    case Suspended = 'Suspended';
    case Terminated = 'Terminated';
    case Retired = 'Retired';
}
