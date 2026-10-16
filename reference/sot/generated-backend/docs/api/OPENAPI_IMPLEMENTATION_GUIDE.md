# OpenAPI Implementation Guide

## Overview

This document guides Copilot in generating an OpenAPI 3.1 specification from the implemented Laravel API.

## Specification Structure

```yaml
openapi: 3.1.0
info:
  title: School ERP API
  version: 1.0.0
  description: REST API for the School ERP system
servers:
  - url: http://localhost/api/v1
    description: Local development
```

## Authentication

All protected endpoints use Bearer token auth via Sanctum:

```yaml
components:
  securitySchemes:
    BearerToken:
      type: http
      scheme: bearer
      description: Sanctum SPA token
```

## Common Response Envelope

All API responses use a consistent JSON envelope:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": { "field": ["Validation message"] }
}
```

Paginated responses:

```json
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "current_page": 1,
    "per_page": 15,
    "total": 100,
    "last_page": 7
  }
}
```

## Pagination Parameters

All list endpoints accept:
- `page` (int) — page number
- `per_page` (int, default 15, max 100)

## Filter Parameters

Common filters across list endpoints:
- `search` (string) — text search
- `status` (string) — filter by status enum
- `academic_year_id` (int) — filter by academic year
- `term_id` (int) — filter by term
- `class_id` (int) — filter by class
- `sort` (string) — sort field
- `order` (string) — asc/desc

## Generation Steps for Copilot

1. Install `darkaonline/l5-swagger` or use `zircote/swagger-php`
2. Add OpenAPI annotations to each controller method
3. Generate spec: `php artisan swagger:generate`
4. Serve docs at `/api/documentation`

Alternatively, generate the spec manually from `API_CONTRACT_MATRIX.md` by mapping each endpoint to OpenAPI path objects with request/response schemas derived from the API Resources.
