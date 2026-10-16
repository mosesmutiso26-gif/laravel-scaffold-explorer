<?php

namespace App\Enums;

enum InvoiceStatus: string
{
    case Draft = 'Draft';
    case Issued = 'Issued';
    case PartiallyPaid = 'Partially Paid';
    case Paid = 'Paid';
    case Overdue = 'Overdue';
    case Cancelled = 'Cancelled';
}
