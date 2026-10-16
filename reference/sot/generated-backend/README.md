# Riverside Academy — Laravel 13 / PHP 8.4 School ERP Backend Source Package

## What this is

A comprehensive, implementation-ready Laravel backend source package for a school management ERP covering academics, finance, HR, boarding, transport, library, sports, health, safeguarding, and operations.

**This is source code only.** It has not been installed, migrated, or executed. GitHub Copilot Agent will install Laravel, place these files, run migrations, seed data, execute tests, and verify the API contracts.

## Tech Stack

- Laravel 13.x (latest compatible release)
- PHP 8.4
- MySQL/MariaDB
- Redis (cache, queues, locks)
- Laravel Sanctum (SPA authentication)
- Pest PHP (testing)

## Directory Structure

```
generated-backend/
├── app/                 # Application source (Models, Controllers, Services, etc.)
├── bootstrap/           # App registration reference
├── config/              # Configuration references
├── database/            # Migrations, factories, seeders
├── docs/                # Architecture, API, database, security, operations docs
├── routes/              # API route definitions
├── tests/               # Feature, Unit, Contract tests
└── copilot-handoff/     # Installation and verification instructions for Copilot
```

## Modules

1. School Identity & Settings
2. Academic Years, Terms & Calendars
3. Users, Auth, Roles & Permissions
4. Students, Guardians & Admissions
5. Staff, Teachers & Departments
6. Classes, Streams, Subjects & Curriculum
7. Attendance
8. Assessment, Grading & Report Cards
9. Timetables & Room Booking
10. Fees, Invoices, Payments & Finance
11. Procurement & Inventory
12. Library
13. Transport
14. Boarding & Dormitory
15. Meals & Kitchen
16. Science Laboratory
17. Computer Laboratory
18. Co-Curricular Activities
19. Sports
20. Health Clinic
21. Safeguarding & Incidents
22. HR & Payroll
23. Website CMS
24. Notifications & Documents
25. Audit & System Operations

## Installation

See `copilot-handoff/COPILOT_MASTER_PROMPT.md` for the complete installation and verification process.

## Important Notes

- All seed data is fictional and for local development only.
- No real payment providers, email/SMS gateways, or external services are contacted.
- `.env.example` contains placeholder values only — no real secrets.
- Tests are labeled `generated_not_executed` until Copilot runs them.
