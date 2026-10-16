# Library API Contract Matrix

| Endpoint | Method | Request Body | Response | Validation | Auth | Status |
|---|---|---|---|---|---|---|
| /api/v1/library/books | GET | ?q=&category= | { data: Book[] } | — | authenticated | DESIGNED |
| /api/v1/library/books | POST | { title, author, isbn, category, level } | { data: Book } | unique:isbn, required:title,author | librarian | DESIGNED |
| /api/v1/library/books/{id} | GET | — | { data: Book } | exists | authenticated | DESIGNED |
| /api/v1/library/books/{id} | PUT | { title, author, ... } | { data: Book } | exists, required | librarian | DESIGNED |
| /api/v1/library/copies | GET | ?book_id=&status= | { data: Copy[] } | — | authenticated | DESIGNED |
| /api/v1/library/copies | POST | { book_id, barcode, location, shelf, condition } | { data: Copy } | unique:barcode, required | librarian | DESIGNED |
| /api/v1/library/copies/{id}/status | PATCH | { status } | { data: Copy } | exists, enum:status | librarian | DESIGNED |
| /api/v1/library/loans | POST | { borrower_id, copy_id } | { data: Loan, due_date } | borrower.eligible, copy.available, borrower.max_loans | librarian | DESIGNED |
| /api/v1/library/loans | GET | ?status=&borrower_id= | { data: Loan[] } | — | authenticated, owner-scoped | DESIGNED |
| /api/v1/library/loans/{id}/return | POST | { condition_note? } | { data: Loan, fine? } | loan.active_or_overdue | librarian | DESIGNED |
| /api/v1/library/loans/{id}/renew | POST | — | { data: Loan, new_due_date } | loan.active, renewals<max, no_reservation, not_overdue | librarian or owner | DESIGNED |
| /api/v1/library/reservations | POST | { book_id } | { data: Reservation, queue_position } | book.available==0, no_duplicate | authenticated | DESIGNED |
| /api/v1/library/reservations | GET | ?borrower_id=&status= | { data: Reservation[] } | — | authenticated, owner-scoped | DESIGNED |
| /api/v1/library/reservations/{id}/cancel | PATCH | — | { data: Reservation } | exists, owner_or_librarian | authenticated | DESIGNED |
| /api/v1/library/fines | GET | ?status= | { data: Fine[] } | — | authenticated, owner-scoped | DESIGNED |
| /api/v1/library/fines/{id}/settle | PATCH | — | { data: Fine } | exists, outstanding | librarian | DESIGNED |
| /api/v1/library/fines/{id}/waive | PATCH | { reason } | { data: Fine } | exists, outstanding, reason required | librarian+admin | DESIGNED |
| /api/v1/library/borrowers | GET | ?q= | { data: Borrower[] } | — | librarian | DESIGNED |
| /api/v1/library/inventory | GET | — | { summary: { by_status, by_condition } } | — | librarian | DESIGNED |
| /api/v1/library/notifications | GET | — | { data: Notification[] } | — | authenticated, owner-scoped | DESIGNED |
| /api/v1/library/audit | GET | — | { data: AuditEntry[] } | — | librarian+admin | DESIGNED |

## Frontend adapter

Current state: in-memory demo adapter (`libraryDemo.ts`) using `useSyncExternalStore`. All actions execute real state mutations, trigger UI refresh, and log audit entries. No API calls are made.

## Integration gaps

1. No Laravel backend exists — all endpoints are DESIGNED, not connected
2. No authentication — role checks are visual only
3. No database persistence — state resets on page reload (demo mode)
4. No server-side concurrency control — issue/return are client-side atomic only
5. No server-side ownership enforcement — borrower history filtering is client-side
6. No real notifications — in-memory events only
7. No PDF report generation
8. No file upload for cover images or document attachments
