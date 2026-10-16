# Health and Logging

## Health Endpoints

| Endpoint | Auth | Purpose |
|----------|------|---------|
| `GET /api/v1/system/health` | Authenticated | Database + Redis connectivity check |

## Response Format

```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "checks": {
      "database": "ok",
      "redis": "ok"
    },
    "timestamp": "2026-10-16T12:00:00+03:00"
  }
}
```

## Logging Configuration

- **Default channel:** `stack` → `single` file
- **Log level:** `debug` (local), `error` (production)
- **Log file:** `storage/logs/laravel.log`

## Request Correlation

Every API response includes an `X-Correlation-ID` header. This ID is:
1. Read from the request `X-Correlation-ID` header if present
2. Generated as a UUID if not present
3. Stored in `audit_entries.correlation_id` for all audited actions

## What NOT to Log

- Passwords or password hashes
- Payment gateway secrets or full card numbers
- Student health records content
- Safeguarding incident descriptions in non-dedicated logs
- SQL queries in production
- Stack traces in API responses (log internally, return generic message)

## Structured Logging (for Copilot)

Consider adding structured JSON logging for production:
```php
Log::channel('stack')->info('payment.verified', [
    'payment_id' => $payment->id,
    'amount' => $payment->amount,
    'correlation_id' => request()->attributes->get('correlation_id'),
]);
```
