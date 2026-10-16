# Jobs and Queues

## Queue Configuration

- **Connection:** Redis (`QUEUE_CONNECTION=redis`)
- **Default Queue:** `default`
- **Failed Jobs:** Stored in database table `failed_jobs`

## Generated Jobs

| Job | Queue | Tries | Backoff | Purpose |
|-----|-------|-------|---------|---------|
| `SendInvoiceNotificationJob` | default | 3 | 30s | Notify guardians of new invoices |
| `SendOverdueLibraryReminderJob` | default | 3 | — | Remind guardians of overdue library books |
| `SendFeeReminderJob` | default | 3 | — | Remind guardians of upcoming/overdue fees |
| `GenerateReportCardJob` | default | 1 | — | Generate term report cards (timeout: 120s) |

## Job Serialization Rules

- All jobs accept only primitive IDs (integers), not model instances, except where SerializesModels is used
- `SendInvoiceNotificationJob` accepts `$invoiceId` (int) and loads the model in `handle()`
- `GenerateReportCardJob` accepts studentId, termId, classId, generatedBy (all int)

## Idempotency

- Notification jobs check for existing notifications before creating duplicates (Copilot should add dedup logic)
- Fee reminder jobs are daily — the scheduler prevents overlapping runs
- Report card generation uses `updateOrCreate` so re-running produces the same result

## Failed Job Recovery

```bash
php artisan queue:failed          # List failed jobs
php artisan queue:retry all       # Retry all failed jobs
php artisan queue:retry {id}      # Retry specific job
php artisan queue:forget {id}     # Remove failed job
```

## Worker Setup (for Copilot)

```bash
php artisan queue:work --tries=3 --max-time=3600
# Or for production with supervisor:
php artisan queue:work redis --sleep=3 --tries=3 --max-jobs=1000
```
