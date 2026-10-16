# Migration Dependency Order

Migrations must be executed in this order. The timestamp prefix in each filename enforces this.

## Phase 1 — Auth Foundation

| # | Migration | Depends On |
|---|-----------|------------|
| 1 | 2025_01_01_000001_create_users_table | — |
| 2 | 2025_01_01_000002_create_roles_and_permissions_tables | users |
| 3 | 2025_01_01_000003_create_personal_access_tokens_table | users |

## Phase 2 — School Structure

| # | Migration | Depends On |
|---|-----------|------------|
| 4 | 2025_01_01_010001_create_school_settings_table | — |
| 5 | 2025_01_01_010002_create_academic_years_table | school_settings |
| 6 | 2025_01_01_010003_create_terms_table | academic_years |
| 7 | 2025_01_01_010004_create_departments_table | staff (lazy FK) |

## Phase 3 — People

| # | Migration | Depends On |
|---|-----------|------------|
| 8 | 2025_01_01_020001_create_staff_table | users, departments |
| 9 | 2025_01_01_020002_create_teachers_table | staff |
| 10 | 2025_01_01_020003_create_students_table | users |
| 11 | 2025_01_01_020004_create_guardians_table | — |
| 12 | 2025_01_01_020005_create_student_guardians_table | students, guardians |

## Phase 4 — Academic Structure

| # | Migration | Depends On |
|---|-----------|------------|
| 13 | 2025_01_01_030001_create_classes_table | academic_years |
| 14 | 2025_01_01_030002_create_streams_table | classes |
| 15 | 2025_01_01_030003_create_subjects_table | departments |
| 16 | 2025_01_01_030004_create_class_subjects_table | classes, subjects, teachers |
| 17 | 2025_01_01_030005_create_enrolments_table | students, classes, academic_years |

## Phase 5 — Attendance

| # | Migration | Depends On |
|---|-----------|------------|
| 18 | 2025_01_01_040001_create_attendance_sessions_table | classes, staff |
| 19 | 2025_01_01_040002_create_attendance_records_table | attendance_sessions, students |

## Phase 6 — Assessment

| # | Migration | Depends On |
|---|-----------|------------|
| 20 | 2025_01_01_050001_create_assessments_table | subjects, classes, terms |
| 21 | 2025_01_01_050002_create_grades_table | assessments, students |
| 22 | 2025_01_01_050003_create_report_cards_table | students, terms, classes |

## Phase 7 — Timetable

| # | Migration | Depends On |
|---|-----------|------------|
| 23 | 2025_01_01_060001_create_rooms_table | — |
| 24 | 2025_01_01_060002_create_timetable_versions_table | academic_years |
| 25 | 2025_01_01_060003_create_timetable_entries_table | versions, classes, subjects, teachers, rooms |

## Phase 8 — Finance

| # | Migration | Depends On |
|---|-----------|------------|
| 26 | 2025_01_01_070001_create_fee_structures_table | terms |
| 27 | 2025_01_01_070002_create_invoices_table | students, terms |
| 28 | 2025_01_01_070003_create_invoice_items_table | invoices |
| 29 | 2025_01_01_070004_create_payments_table | students, invoices |
| 30 | 2025_01_01_070005_create_payment_allocations_table | payments, invoices |

## Phase 9 — Procurement & Inventory

| # | Migration | Depends On |
|---|-----------|------------|
| 31 | 2025_01_01_080001_create_suppliers_table | — |
| 32 | 2025_01_01_080002_create_purchase_requests_table | departments, staff |
| 33 | 2025_01_01_080003_create_purchase_orders_table | suppliers, purchase_requests |
| 34 | 2025_01_01_080004_create_goods_receipts_table | purchase_orders, staff |
| 35 | 2025_01_01_080005_create_inventory_items_table | — |
| 36 | 2025_01_01_080006_create_stock_movements_table | inventory_items |

## Phase 10 — Library

| # | Migration | Depends On |
|---|-----------|------------|
| 37 | 2025_01_01_090001_create_library_books_table | — |
| 38 | 2025_01_01_090002_create_library_copies_table | library_books |
| 39 | 2025_01_01_090003_create_library_loans_table | library_copies, students |
| 40 | 2025_01_01_090004_create_library_reservations_table | library_books, students |
| 41 | 2025_01_01_090005_create_library_fines_table | library_loans |

## Phase 11 — Transport

| # | Migration | Depends On |
|---|-----------|------------|
| 42 | 2025_01_01_100001_create_vehicles_table | — |
| 43 | 2025_01_01_100002_create_transport_routes_table | vehicles |
| 44 | 2025_01_01_100003_create_transport_assignments_table | students, transport_routes, terms |

## Phase 12 — Boarding

| # | Migration | Depends On |
|---|-----------|------------|
| 45 | 2025_01_01_110001_create_boarding_houses_table | staff |
| 46 | 2025_01_01_110002_create_dormitories_table | boarding_houses |
| 47 | 2025_01_01_110003_create_rooms_table | dormitories |
| 48 | 2025_01_01_110004_create_beds_table | rooms |
| 49 | 2025_01_01_110005_create_boarding_placements_table | students, beds |
| 50 | 2025_01_01_110006_create_roll_calls_table | boarding_houses, staff |
| 51 | 2025_01_01_110007_create_roll_call_entries_table | roll_calls, students |
| 52 | 2025_01_01_110008_create_leave_requests_table | students |

## Phase 13 — Sports

| # | Migration | Depends On |
|---|-----------|------------|
| 53 | 2025_01_01_120001_create_sports_table | staff |
| 54 | 2025_01_01_120002_create_teams_table | sports, staff |
| 55 | 2025_01_01_120003_create_squad_members_table | teams, students |
| 56 | 2025_01_01_120004_create_training_sessions_table | teams |
| 57 | 2025_01_01_120005_create_fixtures_table | teams |
| 58 | 2025_01_01_120006_create_sports_equipment_table | sports |
| 59 | 2025_01_01_120007_create_equipment_issues_table | sports_equipment, students |

## Phase 14 — Health

| # | Migration | Depends On |
|---|-----------|------------|
| 60 | 2025_01_01_130001_create_clinic_visits_table | students, staff |
| 61 | 2025_01_01_130002_create_clinic_medications_table | clinic_visits, staff |
| 62 | 2025_01_01_130003_create_clinic_records_table | students, staff |

## Phase 15 — Safeguarding

| # | Migration | Depends On |
|---|-----------|------------|
| 63 | 2025_01_01_140001_create_safeguarding_incidents_table | students, staff |
| 64 | 2025_01_01_140002_create_safeguarding_actions_table | safeguarding_incidents, staff |

## Phase 16 — HR

| # | Migration | Depends On |
|---|-----------|------------|
| 65 | 2025_01_01_150001_create_hr_leave_requests_table | staff |
| 66 | 2025_01_01_150002_create_hr_payroll_runs_table | terms |
| 67 | 2025_01_01_150003_create_hr_payslips_table | hr_payroll_runs, staff |

## Phase 17 — CMS & System

| # | Migration | Depends On |
|---|-----------|------------|
| 68 | 2025_01_01_160001_create_cms_pages_table | — |
| 69 | 2025_01_01_160002_create_cms_announcements_table | staff |
| 70 | 2025_01_01_160003_create_enquiries_table | — |
| 71 | 2025_01_01_160004_create_notifications_table | users |
| 72 | 2025_01_01_160005_create_documents_table | — |
| 73 | 2025_01_01_160006_create_audit_entries_table | users |

## Rollback Safety

- All migrations have `down()` methods that drop only the table created by that migration.
- No migration drops or alters tables created by other migrations.
- Copilot must NOT run `php artisan migrate:fresh` against any non-local database.
- For data-bearing rollback scenarios, use `php artisan migrate:rollback --step=1` and verify data impact first.
