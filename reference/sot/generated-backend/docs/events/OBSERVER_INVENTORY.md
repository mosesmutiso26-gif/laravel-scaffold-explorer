# Observer Inventory

## Registered Observers

Registered in `App\Providers\ObserverServiceProvider`.

| Model | Observer | Events Handled | Purpose |
|-------|----------|----------------|---------|
| `Invoice` | `InvoiceObserver` | `created`, `updated`, `saved` | Auto-calculate balance_due and status |
| `Payment` | `PaymentObserver` | `updated` | Dispatch `PaymentVerified` event on status change |
| `Student` | `StudentObserver` | `created`, `updated` | Dispatch `StudentAdmitted` event, auto-generate admission number |

## InvoiceObserver

### `creating` / `updating`
- If `total_amount` or invoice items change, recalculates `balance_due`
- Sets `status` based on `balance_due`:
  - `balance_due <= 0` → `paid`
  - `balance_due > 0 && balance_due < total_amount` → `partial`
  - `balance_due == total_amount` → `unpaid`
  - `due_date < now && balance_due > 0` → `overdue`

### `created`
- Generates sequential invoice number if not set (format: `INV-YYYY-NNNNNN`)

## PaymentObserver

### `updated`
- Detects status transition from `pending` to `verified`
- Dispatches `PaymentVerified` event with the payment instance
- Only dispatches once per transition (checks original vs current status)

## StudentObserver

### `creating`
- Auto-generates admission number if not provided (format: `ADM-YYYY-NNNNN`)
- Ensures uniqueness by checking existing records

### `created`
- Dispatches `StudentAdmitted` event if student status is `active`
