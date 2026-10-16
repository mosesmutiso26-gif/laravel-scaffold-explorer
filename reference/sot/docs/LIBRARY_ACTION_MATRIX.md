# Library Action Matrix

| Action | Route | Component | Method | Status |
|---|---|---|---|---|
| Add catalogue title | /library/catalogue/create | CatalogueFormView | libraryDemo.addBook() | WORKING |
| Register physical copy | /library/copies | CopiesView | libraryDemo.addCopy() | WORKING |
| Mark copy lost | /library/copies | CopiesView | libraryDemo.markCopyStatus(id,'Lost') | WORKING |
| Mark copy damaged | /library/copies | CopiesView | libraryDemo.markCopyStatus(id,'Damaged') | WORKING |
| Send to repair | /library/copies | CopiesView | libraryDemo.markCopyStatus(id,'Under repair') | WORKING |
| Mark available | /library/copies | CopiesView | libraryDemo.markCopyStatus(id,'Available') | WORKING |
| Issue book | /library/issue | IssueView | libraryDemo.issueLoan() | WORKING |
| Process return | /library/returns | ReturnsView | libraryDemo.returnLoan() | WORKING |
| Renew loan | /library/renewals | RenewalsView | libraryDemo.renewLoan() | WORKING |
| Process overdue return | /library/overdue | OverdueView | libraryDemo.returnLoan() | WORKING |
| Create reservation | /library/reservations | ReservationsView | libraryDemo.createReservation() | WORKING |
| Cancel reservation | /library/reservations | ReservationsView | libraryDemo.cancelReservation() | WORKING |
| Settle fine | /library/fines | FinesView | libraryDemo.settleFine() | WORKING |
| Waive fine | /library/fines | FinesView | libraryDemo.waiveFine() | WORKING |
| Mark notification read | /library/notifications | NotificationsView | libraryDemo.markNotificationRead() | WORKING |
| Search catalogue | /library/catalogue | CatalogueView | local filter | WORKING |
| Filter by category | /library/catalogue | CatalogueView | local filter | WORKING |
| Search borrowers | /library/borrowers | BorrowersView | local filter | WORKING |
| Filter loans by status | /library/loans | LoansView | local filter | WORKING |
| Reset demo data | sidebar profile menu | LibraryPortalPage | libraryDemo.reset() | WORKING |
| Generate report | /library/reports | ReportsView | — | DISABLED (requires Laravel report service) |

## Validation enforced

- Issue: borrower eligibility, max active loans, copy availability, duplicate prevention
- Return: loan must be active or overdue, prevents double-return
- Renewal: max renewals (2), no overdue loans, no pending reservations on same title
- Reservation: only for unavailable titles, prevents duplicate by same borrower
- Copy registration: duplicate barcode check
- Catalogue creation: duplicate ISBN check, required fields
