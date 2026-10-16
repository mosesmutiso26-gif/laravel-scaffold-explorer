# Data Integrity Rules

## Database Constraints

### Unique Constraints
| Table | Columns | Reason |
|-------|---------|--------|
| users | email | One account per email |
| students | admission_number | Unique student identifier |
| staff | employee_number | Unique staff identifier |
| teachers | tsc_number | Unique TSC registration |
| library_books | isbn | Unique book identifier |
| library_copies | (book_id, copy_number) | Unique copy per book |
| vehicles | registration | Unique vehicle |
| invoices | invoice_number | Unique invoice |
| purchase_orders | po_number | Unique PO |
| goods_receipts | grn_number | Unique GRN |

### Check Constraints (enforced at app level via validation + service logic)
| Table | Rule | Enforcement |
|-------|------|-------------|
| boarding_placements | One active placement per bed | Service check + unique index on (bed_id, status='Active') |
| enrolments | One active enrolment per student per year | Service check |
| timetable_entries | No teacher/room/class double-booking same day+period | TimetableConflictService |
| payments | Amount > 0 | Form Request validation |
| grades | 0 <= score <= max_score | Form Request validation |
| stock_movements | quantity != 0 | Service validation |

### Foreign Key Cascade Rules
| FK | On Delete | On Update |
|----|-----------|-----------|
| All foreign keys | RESTRICT | CASCADE |

No foreign key uses CASCADE DELETE. This prevents accidental data loss. Deletions are soft (softDeletes) or explicit service-level operations.

## Business Invariants (Service-Enforced)

### Finance
- Payment amount cannot exceed invoice outstanding balance
- Payments are immutable once verified; corrections use reversal workflows
- Payment allocations must sum to payment amount
- Invoice status transitions: Draft → Issued → Partially Paid → Paid → Overdue
- Fee structure changes do not affect already-issued invoices

### Inventory
- Stock quantity_on_hand >= 0 always
- Every stock change has a corresponding stock_movement record
- Goods receipt quantity must match PO item quantity (tolerance configurable)

### Boarding
- A bed can have only one active placement
- Roll call entries auto-populate from active placements
- Leave request must be approved before check-out

### Timetable
- Hard conflicts (teacher/room/class double-booking) block publication
- Published versions are immutable; changes require a new draft
- Adjustment approval and application are separate steps

### Assessment
- Grades cannot be entered before assessment is published
- Report card generation requires all grades to be submitted
- Grade moderation creates an audit trail

### Safeguarding
- Confidential incidents are visible only to designated staff
- All incident access is logged in audit_entries
- Incident status transitions: Reported → Under Review → Actioned → Closed

## Retention Requirements

| Data | Retention | Notes |
|------|-----------|-------|
| Financial records | 7 years | Legal requirement |
| Student records | Permanent | Soft delete only |
| Attendance | 5 years | Archive after 5 years |
| Audit entries | Permanent | No deletion |
| Health records | Until student leaves + 1 year | Confidential |
| Safeguarding records | Permanent | Confidential, restricted access |
| CMS content | Versioned | Keep published versions |
