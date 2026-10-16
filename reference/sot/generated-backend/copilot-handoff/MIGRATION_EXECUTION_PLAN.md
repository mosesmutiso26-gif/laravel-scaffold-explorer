# Migration Execution Plan

## Overview

73 migrations across 20 phases. All migrations use the timestamp prefix `2025_01_01_` with sequential ordering to guarantee dependency-safe execution.

## Execution Order

Migrations execute in filename order (Laravel sorts by timestamp). The generated filenames ensure correct ordering.

### Phase 1 — Foundation (000001–000003)
1. `2025_01_01_000001_create_users_table.php` — users
2. `2025_01_01_000002_create_roles_and_permissions_tables.php` — Spatie roles/permissions
3. `2025_01_01_000003_create_personal_access_tokens_table.php` — Sanctum tokens

### Phase 2 — School Configuration (010001–010004)
4. `2025_01_01_010001_create_school_settings_table.php`
5. `2025_01_01_010002_create_academic_years_table.php`
6. `2025_01_01_010003_create_terms_table.php`
7. `2025_01_01_010004_create_departments_table.php`

### Phase 3 — People (020001–020005)
8. `2025_01_01_020001_create_staff_table.php`
9. `2025_01_01_020002_create_teachers_table.php`
10. `2025_01_01_020003_create_students_table.php`
11. `2025_01_01_020004_create_guardians_table.php`
12. `2025_01_01_020005_create_student_guardians_table.php`

### Phase 4 — Academic Structure (030001–030005)
13. `2025_01_01_030001_create_classes_table.php`
14. `2025_01_01_030002_create_streams_table.php`
15. `2025_01_01_030003_create_subjects_table.php`
16. `2025_01_01_030004_create_class_subjects_table.php`
17. `2025_01_01_030005_create_enrolments_table.php`

### Phase 5 — Attendance (040001–040002)
18. `2025_01_01_040001_create_attendance_sessions_table.php`
19. `2025_01_01_040002_create_attendance_records_table.php`

### Phase 6 — Assessment (050001–050003)
20. `2025_01_01_050001_create_assessments_table.php`
21. `2025_01_01_050002_create_grades_table.php`
22. `2025_01_01_050003_create_report_cards_table.php`

### Phase 7 — Timetable (060001–060003)
23. `2025_01_01_060001_create_rooms_table.php`
24. `2025_01_01_060002_create_timetable_versions_table.php`
25. `2025_01_01_060003_create_timetable_entries_table.php`

### Phase 8 — Finance (070001–070005)
26. `2025_01_01_070001_create_fee_structures_table.php`
27. `2025_01_01_070002_create_invoices_table.php`
28. `2025_01_01_070003_create_invoice_items_table.php`
29. `2025_01_01_070004_create_payments_table.php`
30. `2025_01_01_070005_create_payment_allocations_table.php`

### Phase 9 — Procurement & Inventory (080001–080005)
31. `2025_01_01_080001_create_suppliers_table.php`
32. `2025_01_01_080002_create_purchase_requests_table.php`
33. `2025_01_01_080003_create_purchase_orders_table.php`
34. `2025_01_01_080004_create_goods_receipts_table.php`
35. `2025_01_01_080005_create_inventory_items_table.php`

### Phase 10 — Library (090001)
36. `2025_01_01_090001_create_library_tables.php`

### Phase 11 — Transport (100001)
37. `2025_01_01_100001_create_transport_tables.php`

### Phase 12 — Boarding (110001)
38. `2025_01_01_110001_create_boarding_tables.php`

### Phase 13 — Sports (120001)
39. `2025_01_01_120001_create_sports_tables.php`

### Phase 14 — Clinic (130001)
40. `2025_01_01_130001_create_clinic_tables.php`

### Phase 15 — Safeguarding (140001)
41. `2025_01_01_140001_create_safeguarding_tables.php`

### Phase 16 — HR (150001)
42. `2025_01_01_150001_create_hr_tables.php`

### Phase 17 — CMS & System (160001)
43. `2025_01_01_160001_create_cms_and_system_tables.php`

### Phase 18 — Co-Curricular (170001)
44. `2025_01_01_170001_create_cocurricular_tables.php`

### Phase 19 — Science & Computer Labs (180001–190001)
45. `2025_01_01_180001_create_science_lab_tables.php`
46. `2025_01_01_190001_create_computer_lab_tables.php`

### Phase 20 — Headteacher Portal (200001)
47. `2025_01_01_200001_create_headteacher_portal_tables.php`

## Execution Commands

```bash
# Run all migrations
php artisan migrate

# Run with seed
php artisan migrate --seed

# Rollback last batch
php artisan migrate:rollback

# Check status
php artisan migrate:status

# Fresh migrate with seed (development only)
php artisan migrate:fresh --seed
```

## Dependency Notes

- All migrations are designed to run in a single `php artisan migrate` call
- Timestamp ordering guarantees parent tables exist before child tables
- Foreign keys use `cascadeOnDelete()` for ownership relationships and `restrictOnDelete()` for reference relationships
- All tables include `softDeletes()` where historical retention is required
- Pivot tables use composite unique keys to prevent duplicate relationships

## Post-Migration Verification

After running migrations:
1. Check `php artisan migrate:status` — all should show "Ran"
2. Run `php artisan db:seed` to populate roles, permissions, and demo data
3. Verify the admin user can log in via `POST /api/v1/auth/login`
4. Check that `GET /api/v1/auth/me` returns roles and permissions

## Troubleshooting

- **Foreign key constraint errors:** Ensure MySQL/MariaDB is running and the database exists. Create it with `CREATE DATABASE school_erp;`
- **Spatie migration not found:** Run `php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"` first
- **Migration order issues:** The timestamp prefixes enforce order; do not rename migration files
