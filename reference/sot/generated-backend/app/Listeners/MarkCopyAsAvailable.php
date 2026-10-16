<?php

namespace App\Listeners;

use App\Events\LibraryItemReturned;
use App\Enums\LibraryCopyStatus;

class MarkCopyAsAvailable
{
    public function handle(LibraryItemReturned $event): void
    {
        $event->loan->copy->update([
            'status' => LibraryCopyStatus::Available,
        ]);
        $event->loan->copy->book->increment('available_copies');
    }
}
