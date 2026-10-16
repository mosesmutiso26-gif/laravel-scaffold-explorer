# Scheduler Catalogue

## Scheduled Commands

| Command | Frequency | Description | Overlap Protection |
|---------|-----------|-------------|-------------------|
| `send-fee-reminders` | Daily at 08:00 | Send fee reminders for upcoming/overdue invoices | `withoutOverlapping()` |
| `check-overdue-library-items` | Daily at 09:00 | Check and notify about overdue library loans | `withoutOverlapping()` |
| `mark-overdue-invoices` | Daily at 00:01 | Mark invoices past due date as overdue | `withoutOverlapping()` |
| `check-low-stock` | Weekly (Mondays 08:00) | Report inventory items below reorder level | `withoutOverlapping()` |

## Scheduler Registration (for bootstrap/app.php or routes/console.php)

```php
use Illuminate\Support\Facades\Schedule;

Schedule::command('send-fee-reminders')->dailyAt('08:00')->withoutOverlapping();
Schedule::command('check-overdue-library-items')->dailyAt('09:00')->withoutOverlapping();
Schedule::command('mark-overdue-invoices')->dailyAt('00:01')->withoutOverlapping();
Schedule::command('check-low-stock')->weeklyOn(1, '08:00')->withoutOverlapping();
```

## Timezone

All schedules use the application timezone configured in `.env` (`APP_TIMEZONE=Africa/Nairobi`).

## Idempotency

- Fee reminders: Each guardian receives at most one notification per invoice per run. Copilot should add a `sent_at` check to prevent duplicates across runs.
- Overdue marking: Idempotent — `UPDATE ... WHERE due_date < today` produces the same result regardless of how many times it runs.
- Low stock: Read-only report, no side effects.
