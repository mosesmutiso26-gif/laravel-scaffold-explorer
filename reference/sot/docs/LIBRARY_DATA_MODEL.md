# Library Data Model

## Entities

### LibraryBook (catalogue title)
| Field | Type | Description |
|---|---|---|
| id | string | Unique identifier (bk-XXX) |
| title | string | Book title |
| isbn | string | ISBN identifier (unique) |
| author | string | Author name |
| publisher | string | Publisher |
| year | number | Publication year |
| edition | string | Edition label |
| language | string | Language |
| category | string | Subject/category |
| level | string | Reading level (Primary/Secondary) |
| description | string | Synopsis |
| keywords | string[] | Search keywords |
| status | 'Active' \| 'Archived' | Catalogue status |
| totalCopies | number | Computed from copies |
| availableCopies | number | Computed from copies where status=Available |

### LibraryCopy (physical copy)
| Field | Type | Description |
|---|---|---|
| id | string | Unique identifier (cp-XXX) |
| bookId | string | FK to LibraryBook |
| barcode | string | Unique barcode (RA-BKXXX-NN) |
| location | string | Library location |
| shelf | string | Shelf reference |
| condition | 'New' \| 'Good' \| 'Fair' \| 'Poor' | Physical condition |
| status | CopyStatus | Available/Borrowed/Reserved/Lost/Damaged/Under repair/Withdrawn |
| acquired | string | Acquisition date |

### LibraryLoan
| Field | Type | Description |
|---|---|---|
| id | string | Unique identifier (ln-XXX) |
| copyId | string | FK to LibraryCopy |
| bookTitle | string | Denormalized for display |
| barcode | string | Denormalized copy barcode |
| borrowerId | string | FK to borrower |
| borrowerName | string | Denormalized |
| borrowerType | 'Student' \| 'Teacher' \| 'Staff' | |
| issueDate | string | Issue date |
| dueDate | string | Calculated due date |
| returnDate | string \| null | Null if active |
| status | 'Active' \| 'Returned' \| 'Overdue' | |
| renewals | number | Count of renewals used |

### LibraryReservation
| Field | Type | Description |
|---|---|---|
| id | string | Unique identifier (res-XXX) |
| bookId | string | FK to LibraryBook |
| bookTitle | string | Denormalized |
| borrowerId | string | FK to borrower |
| borrowerName | string | Denormalized |
| borrowerType | BorrowerType | |
| requestedDate | string | |
| status | 'Pending' \| 'Available' \| 'Fulfilled' \| 'Expired' \| 'Cancelled' | |
| queuePosition | number | Position in queue |

### LibraryFine
| Field | Type | Description |
|---|---|---|
| id | string | Unique identifier (fine-XXX) |
| loanId | string | FK to LibraryLoan |
| borrowerName | string | Denormalized |
| reason | string | Human-readable charge reason |
| amount | number | KES amount |
| status | 'Outstanding' \| 'Settled' \| 'Waived' | |
| createdDate | string | |
| settledDate | string \| null | |

### LibraryNotification
| Field | Type | Description |
|---|---|---|
| id | string | |
| recipient | string | Borrower name |
| title | string | |
| detail | string | |
| unread | boolean | |
| createdDate | string | |

### LibraryAuditEntry
| Field | Type | Description |
|---|---|---|
| id | string | |
| actor | string | User who performed action |
| action | string | Action description |
| target | string | Affected entity |
| timestamp | string | |

### LibraryBorrower
| Field | Type | Description |
|---|---|---|
| id | string | Links to existing student/staff IDs |
| name | string | |
| type | 'Student' \| 'Teacher' \| 'Staff' | |
| className | string | Class/department |
| activeLoans | number | Computed |
| eligible | boolean | Based on overdue + fines |
| outstandingFines | number | Computed |

## Relationships

```
Book 1---* Copy
Copy 1---* Loan (one copy per active loan)
Book 1---* Reservation
Loan 1---* Fine
Borrower 1---* Loan
Borrower 1---* Reservation
Borrower 1---* Fine
```

## Configured policies

| Policy | Value |
|---|---|
| MAX_LOANS_STUDENT | 3 |
| MAX_LOANS_STAFF | 5 |
| LOAN_DAYS_STUDENT | 14 |
| LOAN_DAYS_STAFF | 30 |
| MAX_RENEWALS | 2 |
| FINE_PER_DAY | KES 10 |

## Data consistency rules

1. A copy with status 'Borrowed' must have exactly one active loan
2. A returned loan must have a non-null returnDate
3. A copy cannot be 'Available' and 'Borrowed' simultaneously
4. Reservations only exist for books with 0 available copies
5. Fine amount = overdue_days × FINE_PER_DAY (calculated on return)
6. Settled/waived fines must have a settledDate
