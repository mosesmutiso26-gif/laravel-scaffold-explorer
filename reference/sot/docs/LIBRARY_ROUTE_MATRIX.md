# Library Route Matrix

| Route | View | Status |
|---|---|---|
| /library/dashboard | LibDashboard | FRONTEND IMPLEMENTED |
| /library/catalogue | CatalogueView (search + filter) | FRONTEND IMPLEMENTED |
| /library/catalogue/create | CatalogueFormView (add title) | FRONTEND IMPLEMENTED |
| /library/copies | CopiesView (register + list) | FRONTEND IMPLEMENTED |
| /library/issue | IssueView (issue book form) | FRONTEND IMPLEMENTED |
| /library/returns | ReturnsView (process return) | FRONTEND IMPLEMENTED |
| /library/renewals | RenewalsView (renew with policy checks) | FRONTEND IMPLEMENTED |
| /library/loans | LoansView (all loans + filter) | FRONTEND IMPLEMENTED |
| /library/overdue | OverdueView (overdue list + return) | FRONTEND IMPLEMENTED |
| /library/reservations | ReservationsView (create + queue + cancel) | FRONTEND IMPLEMENTED |
| /library/fines | FinesView (settle + waive + policy) | FRONTEND IMPLEMENTED |
| /library/borrowers | BorrowersView (search + eligibility) | FRONTEND IMPLEMENTED |
| /library/inventory | InventoryView (status + condition breakdown) | FRONTEND IMPLEMENTED |
| /library/notifications | NotificationsView (read/unread) | FRONTEND IMPLEMENTED |
| /library/reports | ReportsView (9 report cards, disabled) | DESIGNED |
| /library/audit | AuditView (full audit trail) | FRONTEND IMPLEMENTED |
| /library/settings | SettingsView (policies + config) | FRONTEND IMPLEMENTED |

## Route access

All routes are accessible from the librarian sidebar. Navigation groups: Workspace, Catalogue, Circulation, People, Operations, Controls, Account.

## Laravel API target routes (not yet connected)

| Method | Path | Purpose |
|---|---|---|
| GET | /api/v1/library/books | List/search catalogue |
| POST | /api/v1/library/books | Create title |
| GET | /api/v1/library/books/{id} | Title detail |
| PUT | /api/v1/library/books/{id} | Edit title |
| GET | /api/v1/library/copies | List copies |
| POST | /api/v1/library/copies | Register copy |
| PATCH | /api/v1/library/copies/{id}/status | Update copy status |
| POST | /api/v1/library/loans | Issue loan |
| GET | /api/v1/library/loans | List loans |
| POST | /api/v1/library/loans/{id}/return | Process return |
| POST | /api/v1/library/loans/{id}/renew | Renew loan |
| GET | /api/v1/library/reservations | List reservations |
| POST | /api/v1/library/reservations | Create reservation |
| PATCH | /api/v1/library/reservations/{id}/cancel | Cancel reservation |
| GET | /api/v1/library/fines | List fines |
| PATCH | /api/v1/library/fines/{id}/settle | Settle fine |
| PATCH | /api/v1/library/fines/{id}/waive | Waive fine |
| GET | /api/v1/library/borrowers | List borrowers |
| GET | /api/v1/library/inventory | Inventory summary |
| GET | /api/v1/library/notifications | Notifications |
| GET | /api/v1/library/audit | Audit log |
