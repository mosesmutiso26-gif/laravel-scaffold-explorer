# Dependency Installation

## Required Composer Packages

Run each command in the project root after `composer create-project laravel/laravel:^13.0`.

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `laravel/framework` | ^13.0 | Core framework (installed by create-project) |
| `laravel/sanctum` | ^4.0 | SPA token authentication |
| `spatie/laravel-permission` | ^6.0 | Role-based access control |
| `predis/predis` | ^2.0 | Redis client for cache/queue/session |

```bash
composer require laravel/sanctum:^4.0
composer require spatie/laravel-permission:^6.0
composer require predis/predis:^2.0
```

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `pestphp/pest` | ^3.0 | Test framework |
| `pestphp/pest-plugin-laravel` | ^3.0 | Pest Laravel integration |
| `fakerphp/faker` | ^1.23 | Test data generation |
| `barryvdh/laravel-dompdf` | ^3.0 | PDF report generation |

```bash
composer require pestphp/pest:^3.0 --dev
composer require pestphp/pest-plugin-laravel:^3.0 --dev
composer require fakerphp/faker:^1.23 --dev
composer require barryvdh/laravel-dompdf:^3.0 --dev
```

## Post-Install Steps

### Sanctum
No migration publish needed in Laravel 13 — Sanctum migrations run automatically.

### Spatie Permission
```bash
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
```
This publishes the config and migrations for roles, permissions, and model_has_* pivot tables.

### Config Cache
After copying all files and installing dependencies:
```bash
php artisan config:clear
php artisan cache:clear
```

## PHP Extensions Required

| Extension | Purpose |
|-----------|---------|
| `intl` | Internationalization |
| `mbstring` | Multibyte string handling |
| `xml` | XML parsing |
| `mysqlnd` | MySQL native driver |
| `pdo_mysql` | MySQL PDO |
| `redis` | Redis client (or use predis package) |
| `zip` | Archive handling |
| `gd` | Image processing |

## Version Compatibility Notes

- Laravel 13 requires PHP 8.4+
- Spatie Permission 6.x is compatible with Laravel 13
- Sanctum 4.x is bundled with Laravel 13 but must be explicitly required for API token features
- Predis 2.x is the recommended Redis client; the phpredis extension is also supported
- Pest 3.x requires PHP 8.2+ and is compatible with Laravel 13's testing foundation

## No Lock File Provided

A `composer.lock` is not generated since Composer is not available in the Bolt environment. Copilot should run `composer install` after all dependencies are declared in `composer.json`.
