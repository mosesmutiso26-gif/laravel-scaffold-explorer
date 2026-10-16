<?php

namespace App\Enums;

enum PurchaseOrderStatus: string
{
    case Draft = 'Draft';
    case Submitted = 'Submitted';
    case Approved = 'Approved';
    case Sent = 'Sent';
    case PartiallyReceived = 'Partially Received';
    case Received = 'Received';
    case Closed = 'Closed';
}

enum PurchaseRequestStatus: string
{
    case Pending = 'Pending';
    case Approved = 'Approved';
    case Rejected = 'Rejected';
    case Converted = 'Converted';
}

enum StockMovementType: string
{
    case In = 'In';
    case Out = 'Out';
    case Adjustment = 'Adjustment';
    case Transfer = 'Transfer';
}
