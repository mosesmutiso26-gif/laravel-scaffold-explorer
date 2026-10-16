# Copilot Master Prompt

## Your Task

You are GitHub Copilot Agent. Your task is to install, configure, and verify a generated Laravel 13 / PHP 8.4 School ERP backend that was produced by Bolt. The source code is complete but has NOT been installed, migrated, or tested. You must make it fully operational.

## What Was Generated

A complete School ERP backend with:
- 73 database migrations across 20 phases
- ~60 Eloquent models with relationships, casts, and scopes
- 28 controllers with full CRUD and business logic
- 7 service classes with real business logic (finance, boarding, library, inventory, timetable, audit)
- 5 events, 6 listeners, 3 observers for event-driven side effects
- 4 queued jobs and 4 scheduled console commands
- 4 authorization policies with record-level access control
- Spatie/laravel-permission for RBAC
- Sanctum SPA authentication
- 14 model factories and a comprehensive database seeder
- 7+ test files (Pest PHP, labeled `generated_not_executed`)
- 3 additional modules: Co-Curricular Activities, Science Lab, Computer Lab, Headteacher Portal
- Complete documentation: architecture, database design, API contracts, security, operations

## What You Must Do

### 1. Install

1. Create a fresh Laravel 13 project: `composer create-project laravel/laravel:^13.0 school-erp`
2. Copy all generated files per `FILE_PLACEMENT_MAP.md`
3. Install all dependencies per `DEPENDENCY_INSTALLATION.md`
4. Configure `.env` from `.env.example`
5. Register providers and middleware per `bootstrap/app-registration-reference.php`
6. Publish Spatie permission assets

### 2. Migrate

1. Create the MySQL database
2. Run `php artisan migrate` — all 73+ migrations should succeed
3. Run `php artisan db:seed` — creates roles, permissions, admin user, and demo data
4. Verify with `php artisan migrate:status`

### 3. Verify

1. Start the server: `php artisan serve`
2. Test authentication: login as admin@school.edu / password
3. Test key endpoints per `VERIFICATION_CHECKLIST.md`
4. Run all tests: `php artisan test`
5. Fix any issues found (import errors, missing methods, namespace mismatches)
6. Document actual test results

### 4. Fix Issues

The generated code was written without a PHP runtime. You may encounter:
- Missing imports — add `use` statements as needed
- Method signature mismatches — adjust to match Laravel 13 API
- Spatie API differences — adjust to match v6.x API
- Migration syntax issues — fix to match Laravel 13 schema builder
- Test setup issues — fix Pest configuration and test helpers

Fix these incrementally. Do NOT rewrite files wholesale. Make the minimal change needed to resolve each issue.

### 5. Report

Create a `COPILOT_INSTALLATION_REPORT.md` with:
- Steps completed
- Issues found and fixed
- Test results (pass/fail counts, specific failures)
- Any remaining issues
- Verification checklist completion status

## Key Constraints

- Do NOT modify business logic unless it causes a runtime error
- Do NOT change migration timestamps or file names
- Do NOT drop or recreate the database after initial migration
- Do NOT change the API route structure
- Do NOT remove or rename generated models, services, or controllers
- DO add missing imports, fix syntax errors, adjust API calls to match installed package versions
- DO run all tests and report actual results

## File Locations

- Generated source: `generated-backend/`
- Installation guide: `copilot-handoff/INSTALL_AND_BOOTSTRAP.md`
- File mapping: `copilot-handoff/FILE_PLACEMENT_MAP.md`
- Dependencies: `copilot-handoff/DEPENDENCY_INSTALLATION.md`
- Migration plan: `copilot-handoff/MIGRATION_EXECUTION_PLAN.md`
- Verification: `copilot-handoff/VERIFICATION_CHECKLIST.md`

## Success Criteria

1. `php artisan migrate --seed` completes without errors
2. `php artisan test` runs all tests with results documented
3. Login API returns a valid Sanctum token
4. At least one workflow per module is verified end-to-end
5. All issues found and fixed are documented
6. The `COPILOT_INSTALLATION_REPORT.md` is complete
