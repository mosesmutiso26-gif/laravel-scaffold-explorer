# API contract matrix

The frontend currently has a typed visual contract for the following workflow families: current user, dashboard KPIs/activity, students, attendance, assessments, finance payments and allocations, payroll readiness, CMS drafts/publishing and audit logs. Every visible action in the demo is mapped in `API_ENDPOINT_REGISTRY.md`.

Required response envelope for Laravel:

```json
{ "data": {}, "meta": { "request_id": "uuid" }, "errors": [] }
```

Validation errors should return HTTP 422 with field-level `errors`. Authorization should return 403 without leaking whether an unrelated resource exists. List endpoints must support `page`, `per_page`, `search`, `sort` and module-specific filters. Payment creation and allocation must accept an idempotency key and use a database transaction.

Current status: contract-only. No endpoint is marked integrated or production-ready until the Laravel service exists and the relevant tests pass.
