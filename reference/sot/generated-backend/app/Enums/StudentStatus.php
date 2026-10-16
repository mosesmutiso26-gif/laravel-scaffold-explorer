<?php

namespace App\Enums;

enum StudentStatus: string
{
    case Active = 'Active';
    case Suspended = 'Suspended';
    case Withdrawn = 'Withdrawn';
    case Graduated = 'Graduated';
}
