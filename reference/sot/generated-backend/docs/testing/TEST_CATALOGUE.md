# Test Catalogue

All tests use Pest PHP. Tests are labeled `generated_not_executed` until Copilot runs them.

## Feature Tests

### AuthAndFinanceTest.php (9 tests)
| Test | Description | Module |
|------|-------------|--------|
| `it_can_login_with_valid_credentials` | POST /auth/login returns token | Auth |
| `it_cannot_login_with_wrong_password` | Wrong password returns 401 | Auth |
| `it_can_get_current_user` | GET /auth/me returns user with roles | Auth |
| `parent_can_only_see_linked_students` | Parent sees only own children | Auth/Student |
| `payment_verification_updates_invoice_balance` | Verify payment → invoice balance decreases | Finance |
| `payment_reversal_restores_invoice_balance` | Reverse payment → invoice balance restored | Finance |
| `double_verification_prevented` | Cannot verify already-verified payment | Finance |
| `admin_can_list_all_students` | Admin sees all students | Auth/Student |
| `admission_number_is_unique` | Duplicate admission number rejected | Student |

### BoardingTest.php (4 tests)
| Test | Description | Module |
|------|-------------|--------|
| `student_can_be_placed_in_vacant_bed` | Place student in empty bed | Boarding |
| `occupied_bed_prevents_placement` | Cannot place in occupied bed | Boarding |
| `double_enrolment_prevented` | Cannot place already-placed student | Boarding |
| `roll_call_auto_populates_from_placements` | Roll call creates entries for active placements | Boarding |

### LibraryTest.php (4 tests)
| Test | Description | Module |
|------|-------------|--------|
| `available_copy_can_be_issued` | Issue loan for available copy | Library |
| `unavailable_copy_cannot_be_issued` | Reject loan for unavailable copy | Library |
| `returning_loan_marks_copy_available` | Return updates copy status | Library |
| `overdue_return_creates_fine` | Late return generates fine (KES 10/day) | Library |

### InventoryTest.php (4 tests)
| Test | Description | Module |
|------|-------------|--------|
| `stock_in_increases_balance` | Stock-in movement increases quantity | Inventory |
| `stock_out_decreases_balance` | Stock-out movement decreases quantity | Inventory |
| `negative_stock_prevented` | Cannot reduce below zero | Inventory |
| `balance_is_recorded` | Movement records resulting balance | Inventory |

### TimetableConflictTest.php (3 tests)
| Test | Description | Module |
|------|-------------|--------|
| `teacher_conflict_detected` | Same teacher, same period → conflict | Timetable |
| `publish_blocked_on_hard_conflicts` | Cannot publish with hard conflicts | Timetable |
| `conflict_free_version_publishes` | No conflicts → publishes successfully | Timetable |

### CoCurricularTest.php (4 tests)
| Test | Description | Module |
|------|-------------|--------|
| `student_can_apply_for_club_membership` | Apply → status = applied | Co-Curricular |
| `duplicate_active_membership_prevented` | Cannot join same club twice | Co-Curricular |
| `membership_approval_works` | Approve → status = active | Co-Curricular |
| `club_capacity_enforced` | Full club → waitlist | Co-Curricular |

### ScienceLabTest.php (4 tests)
| Test | Description | Module |
|------|-------------|--------|
| `lab_booking_conflict_detected` | Double-booked lab → conflict | Science Lab |
| `capacity_exceeded_prevents_booking` | Over-capacity booking rejected | Science Lab |
| `expired_chemical_cannot_be_issued` | Expired batch → issue blocked | Science Lab |
| `negative_equipment_stock_prevented` | Cannot issue more than available | Science Lab |

### ComputerLabTest.php (3 tests)
| Test | Description | Module |
|------|-------------|--------|
| `workstation_booking_conflict_detected` | Double-booked workstation → conflict | Computer Lab |
| `asset_tag_uniqueness_enforced` | Duplicate asset tag rejected | Computer Lab |
| `device_unavailable_when_under_repair` | Under-repair device not bookable | Computer Lab |

### HeadteacherPortalTest.php (3 tests)
| Test | Description | Module |
|------|-------------|--------|
| `dashboard_returns_real_aggregates` | Dashboard KPIs match DB counts | Headteacher |
| `non_headteacher_cannot_access_dashboard` | Non-headteacher → 403 | Headteacher |
| `approval_decision_updates_underlying_record` | Approve → record status changes | Headteacher |

## Unit Tests

### PaymentServiceTest.php (2 tests)
| Test | Description | Module |
|------|-------------|--------|
| `verify_payment_requires_pending_status` | Only pending payments can be verified | Finance |
| `reverse_payment_requires_verified_status` | Only verified payments can be reversed | Finance |

### InventoryMovementTest.php (1 test)
| Test | Description | Module |
|------|-------------|--------|
| `adjustment_sets_absolute_quantity` | Adjustment type sets exact quantity | Inventory |

## Test Totals

| Category | Files | Tests |
|----------|-------|-------|
| Feature | 8 | 35 |
| Unit | 2 | 3 |
| **Total** | **10** | **38** |

## Test Configuration

- Framework: Pest PHP 3.x
- Database: SQLite in-memory for tests (`:memory:`)
- Factories: 14 model factories available
- Seeding: `DatabaseSeeder` creates full demo dataset
- RefreshDatabase trait: used in all feature tests

## Running Tests

```bash
# All tests
php artisan test

# Specific file
php artisan test tests/Feature/AuthAndFinanceTest.php

# With coverage
php artisan test --coverage

# Pest directly
./vendor/bin/pest
```
