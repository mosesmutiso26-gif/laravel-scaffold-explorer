<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Jobs\SendFeeReminderJob;

class SendFeeReminders extends Command
{
    protected $signature = 'send-fee-reminders';
    protected $description = 'Send fee reminders for upcoming and overdue invoices';

    public function handle(): int
    {
        $this->info('Dispatching fee reminder job...');
        SendFeeReminderJob::dispatch();
        $this->info('Fee reminder job dispatched.');
        return self::SUCCESS;
    }
}
