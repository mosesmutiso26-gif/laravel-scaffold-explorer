# Library Implementation Gaps

## Status summary

| Feature | Status |
|---|---|
| Dashboard with live metrics | FRONTEND IMPLEMENTED |
| Catalogue search + filter | FRONTEND IMPLEMENTED |
| Add catalogue title | FRONTEND IMPLEMENTED |
| Register physical copies | FRONTEND IMPLEMENTED |
| Copy status management | FRONTEND IMPLEMENTED |
| Issue book workflow | FRONTEND IMPLEMENTED |
| Process return workflow | FRONTEND IMPLEMENTED |
| Renewal with policy checks | FRONTEND IMPLEMENTED |
| Overdue tracking | FRONTEND IMPLEMENTED |
| Reservation creation + queue | FRONTEND IMPLEMENTED |
| Reservation cancellation | FRONTEND IMPLEMENTED |
| Fine assessment (auto on overdue return) | FRONTEND IMPLEMENTED |
| Fine settlement + waiver | FRONTEND IMPLEMENTED |
| Borrower search + eligibility | FRONTEND IMPLEMENTED |
| Inventory summary | FRONTEND IMPLEMENTED |
| Notifications with read state | FRONTEND IMPLEMENTED |
| Audit history | FRONTEND IMPLEMENTED |
| Settings / policy display | FRONTEND IMPLEMENTED |
| Reports (9 types) | DESIGNED (disabled — requires Laravel) |
| Laravel API connection | NOT STARTED |
| Database persistence (Supabase) | NOT STARTED |
| Authentication + role enforcement | NOT STARTED |
| Server-side concurrency control | NOT STARTED |
| Server-side ownership enforcement | NOT STARTED |
| PDF report generation | NOT STARTED |
| File upload (cover images) | NOT STARTED |
| Barcode scanner integration | NOT STARTED |
| Student/Teacher self-service portal | NOT STARTED |
| Parent portal (child library view) | NOT STARTED |
| Email/SMS notification delivery | NOT STARTED |
| Scheduled overdue reminder job | NOT STARTED |

## Blocked items

1. **Reports**: Disabled in UI with explanatory tooltip. Requires Laravel report service with authorized data scopes and export functionality.
2. **API connection**: No Laravel backend exists. All 20+ endpoints are documented in LIBRARY_API_CONTRACT_MATRIX.md but none are connected.
3. **Authentication**: No auth system in the project. Role-based access is visual only.
4. **Persistence**: In-memory demo state via `useSyncExternalStore`. State resets on page reload. Supabase is available but not yet integrated.
5. **Concurrency**: Issue/return operations are atomic in the demo state but have no server-side transaction or locking.
6. **Student/Teacher library portals**: The existing teacher portal does not yet have a library section. Students have no portal at all.

## Not blocked but not yet built

1. **Catalogue edit**: The add form exists but edit/archive views are not implemented.
2. **Copy history**: Individual copy movement history is not shown (audit log covers actions).
3. **Pagination**: Tables show all records without pagination (acceptable for demo data volume).
4. **Date range filters**: Not implemented on loans or audit views.
