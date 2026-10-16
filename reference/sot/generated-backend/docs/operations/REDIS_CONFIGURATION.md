# Redis Configuration

## Overview

Redis is used for:
1. **Application cache** — Cache store for frequently accessed data
2. **Queue** — Background job processing
3. **Session storage** — Sanctum SPA sessions
4. **Rate limiting** — Throttle storage
5. **Coordination locks** — `withoutOverlapping()` for scheduled commands

## Environment Configuration

```env
REDIS_CLIENT=predis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
CACHE_STORE=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
REDIS_CACHE_DB=1
REDIS_QUEUE_DB=2
REDIS_SESSION_DB=3
```

## Cache Key Conventions

| Prefix | Purpose | TTL | Example |
|--------|---------|-----|---------|
| `spatie.permission.cache` | Permission cache | 86400s (24h) | — |
| `health_check` | Health check | 10s | — |
| `timetable:{version_id}` | Published timetable | 3600s | — |
| `student:{id}:dashboard` | Student dashboard data | 300s | — |

## Invalidation Strategy

- Permission cache: invalidated on role/permission change (Spatie handles automatically)
- Timetable cache: invalidated on version publish/archive
- Dashboard caches: TTL-based expiry (5 minutes)

## Important Rules

- Redis is NEVER the source of truth for money, inventory, attendance, or school records
- All critical data lives in MySQL/MariaDB with proper constraints
- Redis is for performance and coordination only
- Cache misses must fall through to database without errors
