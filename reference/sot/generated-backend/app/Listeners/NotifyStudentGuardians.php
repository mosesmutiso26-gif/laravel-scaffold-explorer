<?php

namespace App\Listeners;

use App\Events\StudentAdmitted;

class NotifyStudentGuardians
{
    public function handle(StudentAdmitted $event): void
    {
        // Notification dispatch handled by NotificationDispatchService
        // This listener is a hook for future notification logic
    }
}
