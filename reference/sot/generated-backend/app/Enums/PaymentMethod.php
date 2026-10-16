<?php

namespace App\Enums;

enum PaymentMethod: string
{
    case MPesa = 'M-Pesa';
    case BankTransfer = 'Bank Transfer';
    case Cash = 'Cash';
    case Cheque = 'Cheque';
}
