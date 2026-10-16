<?php

namespace App\Enums;

enum EnrolmentStatus: string
{
    case Active = 'Active';
    case Transferred = 'Transferred';
    case Withdrawn = 'Withdrawn';
    case Completed = 'Completed';
}
