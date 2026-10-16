# Event Listener Matrix

## Event→Listener Mappings

Registered in `App\Providers\EventServiceProvider`.

| Event | Listener | Queue | Purpose |
|-------|----------|-------|---------|
| `PaymentVerified` | `RecordPaymentAudit` | No | Write audit entry for payment verification |
| `PaymentVerified` | `UpdateInvoiceBalance` | No | Recalculate invoice balance and status after payment |
| `PaymentVerified` | `NotifyStudentGuardians` | Yes | Send payment confirmation notification to guardians |
| `InvoiceIssued` | `SendInvoiceNotification` | Yes | Queue invoice notification job to guardians |
| `StudentAdmitted` | `NotifyStudentGuardians` | Yes | Notify guardians of student admission |
| `LibraryItemIssued` | `MarkCopyAsOnLoan` | No | Update library copy status to `on_loan` |
| `LibraryItemReturned` | `MarkCopyAsAvailable` | No | Update library copy status to `available` |

## Event Dispatch Points

| Event | Dispatched From | Trigger |
|-------|----------------|---------|
| `PaymentVerified` | `PaymentObserver@updated` | Payment status transitions to `verified` |
| `InvoiceIssued` | `InvoiceService@createInvoice` | New invoice created and committed |
| `StudentAdmitted` | `StudentObserver@created` | New student record created with active status |
| `LibraryItemIssued` | `LibraryCirculationService@issueLoan` | Loan successfully created |
| `LibraryItemReturned` | `LibraryCirculationService@returnLoan` | Loan returned and processed |

## Listener Details

### RecordPaymentAudit
- Writes to `audit_entries` table via `AuditLoggingService`
- Records: actor (authenticated user), action (`payment.verified`), subject (payment), correlation ID
- Synchronous — must complete before response

### UpdateInvoiceBalance
- Loads the payment's allocations
- Sums verified allocations per invoice
- Updates `balance_due` = `total_amount` - sum(verified allocations)
- Updates `status`: `paid` if balance ≤ 0, `partial` if balance > 0 and < total, `unpaid` if no allocations
- Synchronous — must reflect in API response

### NotifyStudentGuardians
- Loads student's guardians via `student_guardians` pivot
- Creates `Notification` records for each guardian's user account
- Queued — does not block response

### SendInvoiceNotification
- Dispatches `SendInvoiceNotificationJob` to queue
- Job creates notification records for relevant guardians
- Queued — does not block response

### MarkCopyAsOnLoan
- Sets `library_copies.status` to `on_loan`
- Synchronous

### MarkCopyAsAvailable
- Sets `library_copies.status` to `available`
- Synchronous
