<?php

namespace App\Listeners;

use App\Events\LibraryItemIssued;
use App\Enums\LibraryCopyStatus;

class MarkCopyAsOnLoan
{
    public function handle(LibraryItemIssued $event): void
    {
        $event->loan->copy->update([
            'status' => LibraryCopyStatus::OnLoan,
        ]);
        $event->loan->copy->book->decrement('available_copies');
    }
}
