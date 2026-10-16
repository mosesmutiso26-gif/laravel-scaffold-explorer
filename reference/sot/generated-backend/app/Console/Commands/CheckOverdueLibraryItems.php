<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Jobs\SendOverdueLibraryReminderJob;

class CheckOverdueLibraryItems extends Command
{
    protected $signature = 'check-overdue-library-items';
    protected $description = 'Check and notify about overdue library loans';

    public function handle(): int
    {
        $this->info('Dispatching overdue library reminder job...');
        SendOverdueLibraryReminderJob::dispatch();
        $this->info('Overdue library reminder job dispatched.');
        return self::SUCCESS;
    }
}
