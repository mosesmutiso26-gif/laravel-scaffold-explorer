# Science Laboratory Management — Module Overview

## Status: Generated (not executed)

## Files Created

### Migration
- `database/migrations/2025_01_01_180001_create_science_lab_tables.php`

### Models (14)
- ScienceLab, ScienceEquipment, ChemicalBatch, PracticalLesson, LabBooking, PracticalRequirement, ScienceStockMovement, PracticalAttendance, SafetyInspection, SafetyFinding, LabIncident, LabMaintenanceRequest, StockReservation, PracticalAssessment

### Enums (`app/Enums/LabEnums.php`)
- LabType, LabRoomStatus, PracticalStatus, LabBookingStatus, EquipmentCondition, StockMovementCategory, ChemicalHazardLevel, ChemicalDisposalStatus, SafetyInspectionStatus, SafetyFindingStatus, LabIncidentSeverity, LabIncidentStatus, LabMaintenanceStatus

### Controller
- `app/Http/Controllers/Api/V1/ScienceLabController.php` (~25 methods)

### Service (shared with Computer Lab)
- `app/Services/LabBookingService.php`

### Factories
- `database/factories/ScienceLabFactory.php`
- `database/factories/ScienceEquipmentFactory.php`
- `database/factories/ChemicalBatchFactory.php`
- `database/factories/PracticalLessonFactory.php`

### Test
- `tests/Feature/ScienceLabTest.php` (4 tests)

## API Endpoint Matrix

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `science-labs/dashboard` | Lab dashboard stats |
| GET | `science-labs` | List labs |
| POST | `science-labs` | Create lab |
| GET | `science-labs/{lab}` | Show lab |
| PATCH | `science-labs/{lab}` | Update lab |
| GET | `science-equipment` | List equipment |
| POST | `science-equipment` | Create equipment |
| GET | `chemical-batches` | List batches (filters: expired, approaching_expiry) |
| POST | `chemical-batches` | Create batch |
| GET | `practical-lessons` | List practicals |
| POST | `practical-lessons` | Create practical |
| POST | `practical-lessons/{id}/advance` | Advance practical status |
| GET | `lab-bookings` | List bookings |
| POST | `lab-bookings` | Create booking (conflict-checked) |
| POST | `lab-bookings/{id}/confirm` | Confirm booking |
| POST | `lab-bookings/{id}/cancel` | Cancel booking |
| POST | `science-stock-movements` | Record stock movement (transactional) |
| POST | `chemical-batches/issue` | Issue chemical (expiry + restricted access check) |
| POST | `practical-lessons/{id}/attendance` | Record attendance (uniqueness enforced) |
| GET | `safety-inspections` | List inspections |
| POST | `safety-inspections` | Create inspection |
| GET | `lab-incidents` | List incidents |
| POST | `lab-incidents` | Create incident |
| GET | `lab-maintenance` | List maintenance requests |
| POST | `lab-maintenance` | Create maintenance request |

## Business Rules Enforced

1. **Booking conflict prevention** — Same lab, overlapping date/time blocked
2. **Lab status check** — Cannot book unavailable/maintenance/closed labs
3. **Negative inventory prevention** — Stock movements wrapped in DB transactions
4. **Chemical expiry restriction** — Expired batches cannot be issued
5. **Restricted chemical access** — Only authorized staff issue restricted materials
6. **Practical attendance uniqueness** — One attendance record per student per practical
7. **Practical completion requires confirmed booking** — Cannot mark Completed without booking

## Practical Lesson Lifecycle
```
Draft → Submitted → Reviewed → Approved → Scheduled → Prepared → InProgress → Completed → Assessed
Cancelled (terminal)
```

## Test Coverage

| Test | What it verifies |
|------|-----------------|
| lab_booking_conflict_prevention | Overlapping booking on same lab rejected |
| expired_chemical_issue_prevention | Expired batch cannot be issued |
| negative_inventory_prevention | Stock movement below zero rejected |
| practical_attendance_uniqueness | Duplicate attendance entry rejected |

## Known Limitations

1. Frontend screens not implemented
2. SDS document upload not wired
3. Recurring booking support not implemented
4. Central timetable integration not wired
