# Composer Requirements

## Core Framework

```json
{
  "php": "^8.4",
  "laravel/framework": "^13.0",
  "laravel/sanctum": "^4.0"
}
```

## Required Packages

| Package | Version | Purpose |
|---------|---------|---------|
| `laravel/framework` | `^13.0` | Core framework |
| `laravel/sanctum` | `^4.0` | SPA/token authentication |
| `spatie/laravel-permission` | `^6.0` | Role and permission management |
| `maatwebsite/excel` | `^1.1` | Import/export |
| `barryvdh/laravel-dompdf` | `^3.0` | PDF generation |
| `predis/predis` | `^2.0` | Redis client |
| `pestphp/pest` | `^3.0` (dev) | Testing framework |
| `pestphp/pest-plugin-laravel` | `^3.0` (dev) | Pest Laravel plugin |
| `fakerphp/faker` | `^1.23` (dev) | Test data generation |

## Installation Commands (for Copilot)

```bash
composer create-project laravel/laravel:^13.0 riverside-erp
cd riverside-erp
composer require laravel/sanctum:^4.0
composer require spatie/laravel-permission:^6.0
composer require maatwebsite/excel:^1.1
composer require barryvdh/laravel-dompdf:^3.0
composer require predis/predis:^2.0
composer require pestphp/pest:^3.0 --dev
composer require pestphp/pest-plugin-laravel:^3.0 --dev
```

## PHP Extensions Required

- `pdo_mysql` or `pdo_mariadb`
- `redis` (or use predis package)
- `gd` or `imagick` (for image processing)
- `zip` (for Excel import/export)
- `mbstring`
- `xml`
- `curl`
- `fileinfo`

## Version Compatibility Notes

- Laravel 13 requires PHP 8.4+.
- If Laravel 13.65 is not the exact latest patch, use the latest compatible 13.x release.
- Spatie Permission 6.x is compatible with Laravel 13.
- If any package version is incompatible with the installed Laravel release, Copilot must resolve the conflict and record the actual version used.
