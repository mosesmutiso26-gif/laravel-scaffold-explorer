# Cron and Worker Setup

## Prerequisites

- Redis server running on `127.0.0.1:6379`
- PHP 8.4 with Redis extension or predis package
- Laravel 13 scheduler configured

## Cron Entry (add to server crontab)

```bash
* * * * * cd /path/to/riverside-erp && php artisan schedule:run >> /dev/null 2>&1
```

## Queue Worker (with Supervisor)

Create `/etc/supervisor/conf.d/riverside-worker.conf`:

```ini
[program:river-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /path/to/riverside-erp/artisan queue:work redis --sleep=3 --tries=3 --max-jobs=1000
autostart=true
autorestart=true
numprocs=2
redirect_stderr=true
stdout_logfile=/path/to/riverside-erp/storage/logs/worker.log
stopwaitsecs=3600
```

Then:
```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start river-worker:*
```

## Verification Steps (for Copilot)

1. Run `php artisan schedule:list` to verify all scheduled commands
2. Run `php artisan queue:work --once` to verify queue processing
3. Check `storage/logs/laravel.log` for any errors
4. Verify Redis connectivity: `php artisan tinker --execute="Cache::put('test', 'ok', 10); echo Cache::get('test');"`
