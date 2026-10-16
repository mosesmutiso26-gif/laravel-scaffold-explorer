# Verification Checklist

## 1. Environment

- [ ] PHP 8.4 installed (`php -v`)
- [ ] Composer 2.7+ installed (`composer -V`)
- [ ] MySQL/MariaDB running and accessible
- [ ] Redis running and accessible
- [ ] `.env` configured with correct DB and Redis credentials
- [ ] `APP_KEY` generated (`php artisan key:generate`)
- [ ] All required PHP extensions loaded (`php -m`)

## 2. Dependencies

- [ ] `composer install` completed without errors
- [ ] `laravel/sanctum` installed
- [ ] `spatie/laravel-permission` installed
- [ ] `predis/predis` installed
- [ ] `pestphp/pest` installed (dev)
- [ ] `barryvdh/laravel-dompdf` installed (dev)
- [ ] Spatie config and migrations published

## 3. File Placement

- [ ] All controllers in `app/Http/Controllers/Api/V1/`
- [ ] All models in `app/Models/`
- [ ] All migrations in `database/migrations/`
- [ ] All factories in `database/factories/`
- [ ] All services in `app/Services/`
- [ ] All policies in `app/Policies/`
- [ ] All events in `app/Events/`
- [ ] All listeners in `app/Listeners/`
- [ ] All observers in `app/Observers/`
- [ ] All jobs in `app/Jobs/`
- [ ] All middleware in `app/Http/Middleware/`
- [ ] All providers in `app/Providers/`
- [ ] All enums in `app/Enums/`
- [ ] `routes/api.php` replaced with generated version
- [ ] `bootstrap/app.php` updated with middleware aliases and scheduler

## 4. Provider Registration

- [ ] `RouteServiceProvider` registered
- [ ] `AuthServiceProvider` registered
- [ ] `EventServiceProvider` registered
- [ ] `ObserverServiceProvider` registered
- [ ] `AppServiceProvider` has `Gate::before` for Administrator role bypass

## 5. Middleware Configuration

- [ ] `active` alias → `EnsureAccountIsActive`
- [ ] `permission` alias → `CheckPermission`
- [ ] `correlation` alias → `TrackRequestCorrelation`
- [ ] API routes use `auth:sanctum` and `active` middleware

## 6. Migrations

- [ ] `php artisan migrate` completes without errors
- [ ] `php artisan migrate:status` shows all migrations as "Ran"
- [ ] No foreign key constraint errors

## 7. Seeding

- [ ] `php artisan db:seed` completes without errors
- [ ] Admin user exists (admin@school.edu / password)
- [ ] Roles created: Administrator, Headteacher, Teacher, FinanceOfficer, Librarian, Nurse, BoardingMaster, Parent, Student
- [ ] Permissions assigned to roles
- [ ] Demo students, staff, classes, and supporting data present

## 8. Authentication

- [ ] `POST /api/v1/auth/login` with valid credentials returns token
- [ ] `POST /api/v1/auth/login` with wrong password returns 401
- [ ] `GET /api/v1/auth/me` with token returns user with roles and permissions
- [ ] `POST /api/v1/logout` invalidates token
- [ ] Protected routes return 401 without token

## 9. Authorization

- [ ] Parent user can only see their linked children's records
- [ ] Teacher user can only see their assigned classes' records
- [ ] Student user cannot access other students' records
- [ ] Administrator role bypasses policy checks via Gate::before
- [ ] Direct API access with manipulated IDs is blocked by policies

## 10. Finance Workflow

- [ ] Invoice creation generates invoice number and calculates balance
- [ ] Payment verification dispatches PaymentVerified event
- [ ] PaymentVerified listener updates invoice balance
- [ ] Payment reversal deletes allocations and restores invoice balance
- [ ] Double-verification of a payment is prevented
- [ ] Overdue invoice marking command works

## 11. Boarding Workflow

- [ ] Student placement checks bed vacancy
- [ ] Occupied bed placement is rejected
- [ ] Double-enrolment is prevented
- [ ] Roll call auto-populates from active placements

## 12. Library Workflow

- [ ] Loan issuance checks copy availability
- [ ] Unavailable copy issuance is rejected
- [ ] Return marks copy as available
- [ ] Overdue return creates fine (KES 10/day)
- [ ] Overdue library items command works

## 13. Inventory Workflow

- [ ] Stock-in movement increases balance
- [ ] Stock-out movement decreases balance
- [ ] Negative stock is prevented
- [ ] Adjustment sets absolute quantity
- [ ] Low stock command works

## 14. Timetable Workflow

- [ ] Conflict detection identifies teacher/room/class double-booking
- [ ] Publish blocked when hard conflicts exist
- [ ] Conflict-free version publishes successfully

## 15. Co-Curricular Module

- [ ] Club CRUD operations work
- [ ] Membership application and approval workflow works
- [ ] Duplicate active membership prevented
- [ ] Leadership appointment works
- [ ] Activity event scheduling works
- [ ] Attendance recording works
- [ ] Competition and achievement recording works

## 16. Science Lab Module

- [ ] Laboratory CRUD works
- [ ] Practical lesson lifecycle works
- [ ] Lab booking conflict detection works
- [ ] Equipment inventory and stock movements work
- [ ] Chemical batch tracking and expiry checks work
- [ ] Safety inspections and incidents work

## 17. Computer Lab Module

- [ ] Computer lab and workstation CRUD works
- [ ] Workstation assignment works
- [ ] Device asset-tag uniqueness enforced
- [ ] Software and licence management works
- [ ] Technical support ticket lifecycle works

## 18. Headteacher Portal

- [ ] Executive dashboard returns real aggregated data
- [ ] Daily briefing aggregates from multiple modules
- [ ] Approval centre shows pending approvals from various modules
- [ ] Academic performance command centre works
- [ ] Finance oversight data matches finance service

## 19. Jobs & Scheduler

- [ ] Queue worker processes jobs without errors
- [ ] `php artisan schedule:list` shows all scheduled commands
- [ ] Fee reminders command runs on schedule
- [ ] Overdue library items command runs on schedule
- [ ] Low stock check command runs on schedule
- [ ] Overdue invoice marking runs on schedule

## 20. Tests

- [ ] `php artisan test` or `./vendor/bin/pest` runs all tests
- [ ] Auth and finance tests pass (9 tests)
- [ ] Boarding tests pass (4 tests)
- [ ] Library tests pass (4 tests)
- [ ] Inventory tests pass (4 tests)
- [ ] Timetable conflict tests pass (3 tests)
- [ ] Payment service unit tests pass (2 tests)
- [ ] Inventory movement unit test passes (1 test)
- [ ] Co-curricular tests pass
- [ ] Science lab tests pass
- [ ] Computer lab tests pass
- [ ] Headteacher portal tests pass
- [ ] Pre-existing failures separated from new regressions

## 21. API Endpoints

- [ ] All routes in `routes/api.php` resolve to correct controllers
- [ ] `php artisan route:list --path=api` shows all expected routes
- [ ] No duplicate route names
- [ ] All controllers have matching methods for route actions

## 22. Security

- [ ] No hardcoded secrets in any source file
- [ ] `.env.example` contains only placeholder values
- [ ] Mass assignment protected via `$fillable` on all models
- [ ] Validation on all form requests
- [ ] Policies enforce record-level access
- [ ] No raw SQL queries with user input
- [ ] File uploads validated by type and size
