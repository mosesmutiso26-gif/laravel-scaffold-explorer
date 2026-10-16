# System Architecture

## Overview

The Riverside Academy ERP backend is a Laravel 13 / PHP 8.4 REST API designed to serve a React + TypeScript frontend SPA. The architecture follows a layered approach with strict separation of concerns.

## Layers

```
┌─────────────────────────────────────────────┐
│  React + TypeScript Frontend (SPA)           │
│  TanStack Query • Sanctum cookie auth        │
└──────────────────┬──────────────────────────┘
                   │ HTTPS /api/v1/
┌──────────────────▼──────────────────────────┐
│  API Layer (Controllers, Form Requests,     │
│  Resources, Middleware)                     │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│  Domain Layer (Services, Actions, DTOs,     │
│  Enums, Value Objects, Policies)            │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│  Data Layer (Eloquent Models, Observers,    │
│  Scopes, Relations)                          │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│  MySQL/MariaDB • Redis (cache/queue)        │
└─────────────────────────────────────────────┘
```

## Architectural Principles

1. **Fat Model, Thin Controller** — Controllers handle HTTP, Services handle business logic
2. **Single Source of Truth** — Each fact lives in exactly one table
3. **Event-Driven Side Effects** — Notifications, audit, and cache invalidation happen via events
4. **Explicit Authorization** — Every endpoint has a Policy; no endpoint relies on frontend-only guards
5. **Money as Integers** — All monetary values stored as decimal(15,2) or integer cents
6. **History Preservation** — Status changes create audit entries; financial records are immutable with correction workflows
7. **Idempotent Operations** — Payment processing and bulk operations use idempotency keys
8. **Transaction Boundaries** — Services wrap multi-step operations in DB transactions

## Module Boundaries

Each module has:
- Migration(s)
- Model(s) with relationships
- Enum(s) for status fields
- Service(s) for business logic
- Controller(s) for HTTP
- Form Request(s) for validation
- Resource(s) for response shaping
- Policy/Policies for authorization
- Event(s) for side effects
- Test(s) for verification

## Authentication Flow

```
Frontend → POST /api/v1/auth/login (email, password)
         ← { token } + Set-Cookie (sanctum)
Frontend → GET /api/v1/me (with cookie/token)
         ← { user, roles, permissions }
Frontend → All subsequent requests include Sanctum token
```

## Error Handling Convention

All API errors follow a consistent envelope:

```json
{
  "success": false,
  "message": "Human-readable error",
  "errors": {
    "field": ["Validation message"]
  },
  "correlation_id": "uuid"
}
```

HTTP status codes:
- 200: Success
- 201: Created
- 204: No content (delete)
- 400: Bad request / business rule violation
- 401: Unauthenticated
- 403: Forbidden (authorization)
- 404: Not found
- 409: Conflict (duplicate, state violation)
- 422: Validation error
- 429: Rate limited
- 500: Server error

## Pagination Convention

```json
{
  "data": [...],
  "meta": {
    "current_page": 1,
    "per_page": 20,
    "total": 150,
    "last_page": 8
  },
  "links": {
    "prev": null,
    "next": "/api/v1/students?page=2"
  }
}
```

## API Versioning Strategy

- Current version: `v1` (prefix `/api/v1/`)
- V2 will be introduced only for breaking changes
- Non-breaking changes are additive within v1
- V1 and V2 coexist until all clients migrate
