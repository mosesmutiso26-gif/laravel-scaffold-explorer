<?php

namespace App\Enums;

enum PaymentStatus: string
{
    case Pending = 'Pending';
    case Verified = 'Verified';
    case Reversed = 'Reversed';
}
