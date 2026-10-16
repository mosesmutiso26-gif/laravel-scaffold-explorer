# Computer Laboratory Management — Module Overview

## Status: Generated (not executed)

## Files Created

### Migration
- `database/migrations/2025_01_01_190001_create_computer_lab_tables.php`

### Models (11)
- ComputerLab, Workstation, IctAsset, SoftwareProduct, SoftwareInstallation, SoftwareLicence, ComputerLabBooking, WorkstationAssignment, ComputerPractical, TechnicalTicket, AssetAudit

### Enums (`app/Enums/LabEnums.php` — shared)
- IctDeviceType, IctDeviceStatus, WorkstationStatus, SoftwareCategory, LicenceType, SoftwareInstallationStatus, TechnicalTicketPriority, TechnicalTicketStatus, AssetAuditStatus

### Controller
- `app/Http/Controllers/Api/V1/ComputerLabController.php` (~25 methods)

### Service (shared with Science Lab)
- `app/Services/LabBookingService.php`

### Factories
- `database/factories/ComputerLabFactory.php`
- `database/factories/WorkstationFactory.php`
- `database/factories/TechnicalTicketFactory.php`

### Test
- `tests/Feature/ComputerLabTest.php` (3 tests)

## API Endpoint Matrix

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `computer-labs/dashboard` | ICT lab dashboard stats |
| GET | `computer-labs` | List labs |
| POST | `computer-labs` | Create lab |
| GET | `computer-labs/{lab}` | Show lab |
| PATCH | `computer-labs/{lab}` | Update lab |
| GET | `workstations` | List workstations |
| POST | `workstations` | Create workstation |
| PATCH | `workstations/{ws}` | Update workstation |
| GET | `ict-assets` | List assets (search: asset_tag, serial_number, manufacturer) |
| POST | `ict-assets` | Create asset |
| GET | `software-products` | List software products |
| POST | `software-products` | Create software product |
| GET | `software-licences` | List licences |
| POST | `software-licences` | Create licence |
| GET | `computer-lab-bookings` | List bookings |
| POST | `computer-lab-bookings` | Create booking (conflict + capacity checked) |
| POST | `computer-lab-bookings/{id}/confirm` | Confirm booking |
| POST | `computer-lab-bookings/{id}/cancel` | Cancel booking |
| GET | `computer-practicals` | List practicals |
| POST | `computer-practicals` | Create practical |
| POST | `computer-lab-bookings/{id}/assignments` | Assign workstations |
| GET | `technical-tickets` | List tickets |
| POST | `technical-tickets` | Create ticket (auto-marks workstation faulty on critical) |
| POST | `technical-tickets/{id}/advance` | Advance ticket status |
| GET | `asset-audits` | List audits |
| POST | `asset-audits` | Create audit |

## Business Rules Enforced

1. **Booking conflict prevention** — Same lab, overlapping date/time blocked
2. **Capacity validation** — Requested workstations ≤ operational workstation count
3. **Asset tag uniqueness** — Enforced at DB level
4. **Auto device status change** — Critical ticket marks workstation faulty; resolution restores to operational
5. **Workstation availability vs device status** — Workstation unavailable when device under repair

## Technical Ticket Lifecycle
```
Open → Triaged → Assigned → InProgress → WaitingForInfo / WaitingForParts → Resolved → Verified → Closed
```

## Test Coverage

| Test | What it verifies |
|------|-----------------|
| computer_lab_booking_conflict | Overlapping booking on same lab rejected |
| capacity_validation_against_operational_workstations | Booking exceeding operational count rejected |
| technical_ticket_lifecycle | Full ticket workflow + device status changes |

## Known Limitations

1. Frontend screens not implemented
2. Software licence key storage not encrypted (needs vault/crypt solution)
3. Automatic device discovery not implemented
4. File submission upload for practicals not wired
