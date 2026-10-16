<?php

namespace App\Enums;

enum AccountStatus: string
{
    case Active = 'Active';
    case Suspended = 'Suspended';
    case Inactive = 'Inactive';
}
