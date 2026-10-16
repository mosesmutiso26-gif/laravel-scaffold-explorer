<?php

namespace App\Enums;

enum LibraryCopyStatus: string
{
    case Available = 'Available';
    case OnLoan = 'On Loan';
    case Lost = 'Lost';
    case Damaged = 'Damaged';
    case Reserved = 'Reserved';
}

enum LoanStatus: string
{
    case OnLoan = 'On Loan';
    case Returned = 'Returned';
    case Overdue = 'Overdue';
}

enum FineStatus: string
{
    case Unpaid = 'Unpaid';
    case Paid = 'Paid';
    case Waived = 'Waived';
}
