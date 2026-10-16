# File Placement Map

This document maps every generated file to its destination in a fresh Laravel 13 project.

## Root Files

| Generated Path | Destination |
|----------------|-------------|
| `.env.example` | `.env` (copy and edit) |
| `composer-requirements.md` | Keep in project root for reference |
| `README.md` | Replace default Laravel `README.md` |
| `GENERATION_STATUS.md` | Keep in project root for reference |
| `SOURCE_MANIFEST.md` | Keep in project root for reference |

## Config

| Generated Path | Destination |
|----------------|-------------|
| `config/permission.php` | `config/permission.php` |

## Bootstrap

| Generated Path | Destination |
|----------------|-------------|
| `bootstrap/app-registration-reference.php` | Reference only — merge into `bootstrap/app.php` |

## App — Enums

| Generated Path | Destination |
|----------------|-------------|
| `app/Enums/*.php` (18 files) | `app/Enums/` |

## App — Models

| Generated Path | Destination |
|----------------|-------------|
| `app/Models/*.php` (~60 files) | `app/Models/` |

## App — HTTP

| Generated Path | Destination |
|----------------|-------------|
| `app/Http/Controllers/Api/V1/*.php` (24 controllers) | `app/Http/Controllers/Api/V1/` |
| `app/Http/Middleware/*.php` (3 middleware) | `app/Http/Middleware/` |
| `app/Http/Requests/Api/V1/*.php` (4 form requests) | `app/Http/Requests/Api/V1/` |
| `app/Http/Resources/Api/V1/*.php` (6 resources) | `app/Http/Resources/Api/V1/` |

## App — Services

| Generated Path | Destination |
|----------------|-------------|
| `app/Services/*.php` (7 services) | `app/Services/` |

## App — Events

| Generated Path | Destination |
|----------------|-------------|
| `app/Events/*.php` (5 events) | `app/Events/` |

## App — Listeners

| Generated Path | Destination |
|----------------|-------------|
| `app/Listeners/*.php` (6 listeners) | `app/Listeners/` |

## App — Observers

| Generated Path | Destination |
|----------------|-------------|
| `app/Observers/*.php` (3 observers) | `app/Observers/` |

## App — Policies

| Generated Path | Destination |
|----------------|-------------|
| `app/Policies/*.php` (4 policies) | `app/Policies/` |

## App — Jobs

| Generated Path | Destination |
|----------------|-------------|
| `app/Jobs/*.php` (4 jobs) | `app/Jobs/` |

## App — Console Commands

| Generated Path | Destination |
|----------------|-------------|
| `app/Console/Commands/*.php` (4 commands) | `app/Console/Commands/` |

## App — Providers

| Generated Path | Destination |
|----------------|-------------|
| `app/Providers/*.php` (5 providers) | `app/Providers/` |

## App — Exceptions

| Generated Path | Destination |
|----------------|-------------|
| `app/Exceptions/BusinessRuleException.php` | `app/Exceptions/` |

## Routes

| Generated Path | Destination |
|----------------|-------------|
| `routes/api.php` | `routes/api.php` (replace default) |

## Database

| Generated Path | Destination |
|----------------|-------------|
| `database/migrations/*.php` (28 migration files) | `database/migrations/` |
| `database/factories/*.php` (14 factories) | `database/factories/` |
| `database/seeders/DatabaseSeeder.php` | `database/seeders/DatabaseSeeder.php` |

## Tests

| Generated Path | Destination |
|----------------|-------------|
| `tests/Feature/*.php` (5 test files) | `tests/Feature/` |
| `tests/Unit/*.php` (2 test files) | `tests/Unit/` |

## Documentation

| Generated Path | Destination |
|----------------|-------------|
| `docs/architecture/*.md` | `docs/architecture/` |
| `docs/database/*.md` | `docs/database/` |
| `docs/operations/*.md` | `docs/operations/` |
| `docs/api/*.md` | `docs/api/` |
| `docs/security/*.md` | `docs/security/` |
| `docs/events/*.md` | `docs/events/` |
| `docs/testing/*.md` | `docs/testing/` |
| `docs/handoff/*.md` | `docs/handoff/` |

## Copilot Handoff

| Generated Path | Destination |
|----------------|-------------|
| `copilot-handoff/*.md` (6 files) | Keep in project root under `copilot-handoff/` |

## New Module Files (Co-Curricular, Labs, Headteacher)

| Generated Path | Destination |
|----------------|-------------|
| `app/Enums/CoCurricularEnums.php` | `app/Enums/` |
| `app/Enums/LabEnums.php` | `app/Enums/` |
| `app/Enums/HeadteacherEnums.php` | `app/Enums/` |
| `app/Models/CoCurricular*.php` | `app/Models/` |
| `app/Models/Lab*.php` | `app/Models/` |
| `app/Models/Executive*.php` | `app/Models/` |
| `app/Services/CoCurricularService.php` | `app/Services/` |
| `app/Services/LabBookingService.php` | `app/Services/` |
| `app/Services/HeadteacherDashboardService.php` | `app/Services/` |
| `app/Http/Controllers/Api/V1/CoCurricularController.php` | `app/Http/Controllers/Api/V1/` |
| `app/Http/Controllers/Api/V1/ScienceLabController.php` | `app/Http/Controllers/Api/V1/` |
| `app/Http/Controllers/Api/V1/ComputerLabController.php` | `app/Http/Controllers/Api/V1/` |
| `app/Http/Controllers/Api/V1/HeadteacherController.php` | `app/Http/Controllers/Api/V1/` |
| `database/migrations/2025_01_01_170001_create_cocurricular_tables.php` | `database/migrations/` |
| `database/migrations/2025_01_01_180001_create_science_lab_tables.php` | `database/migrations/` |
| `database/migrations/2025_01_01_190001_create_computer_lab_tables.php` | `database/migrations/` |
| `database/migrations/2025_01_01_200001_create_headteacher_portal_tables.php` | `database/migrations/` |
