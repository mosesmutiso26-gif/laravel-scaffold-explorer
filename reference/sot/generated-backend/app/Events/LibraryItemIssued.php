<?php

namespace App\Events;

use App\Models\LibraryLoan;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class LibraryItemIssued
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public LibraryLoan $loan
    ) {}
}
