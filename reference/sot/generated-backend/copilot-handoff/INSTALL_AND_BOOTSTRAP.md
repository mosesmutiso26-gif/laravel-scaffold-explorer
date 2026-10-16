# Install and Bootstrap Guide

## Prerequisites

- PHP 8.4 with extensions: intl, mbstring, xml, mysqlnd, pdo_mysql, redis, zip, gd
- Composer 2.7+
- MySQL 8.0+ or MariaDB 10.11+
- Redis 7.0+
- Node.js 20+ and npm (for frontend assets if applicable)

## Step 1 — Create the Laravel Project

```bash
composer create-project laravel/laravel:^13.0 school-erp
cd school-erp
```

## Step 2 — Copy Generated Source

Copy all files from `generated-backend/` into the project root, preserving directory structure:

```bash
# From the generated-backend directory:
cp -r app/* /path/to/school-erp/app/
cp -r config/* /path/to/school-erp/config/
cp -r database/* /path/to/school-erp/database/
cp -r routes/* /path/to/school-erp/routes/
cp -r tests/* /path/to/school-erp/tests/
cp -r docs /path/to/school-erp/
cp .env.example /path/to/school-erp/.env
```

See `FILE_PLACEMENT_MAP.md` for the complete mapping.

## Step 3 — Install Dependencies

```bash
composer require laravel/sanctum:^4.0
composer require spatie/laravel-permission:^6.0
composer require predis/predis:^2.0
composer require barryvdh/laravel-dompdf:^3.0 --dev
composer require pestphp/pest:^3.0 --dev
composer require pestphp/pest-plugin-laravel:^3.0 --dev
composer require fakerphp/faker:^1.23 --dev
```

See `DEPENDENCY_INSTALLATION.md` for exact versions and notes.

## Step 4 — Configure Environment

Edit `.env`:

```env
APP_NAME="School ERP"
APP_ENV=local
APP_KEY=          # Run: php artisan key:generate
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=school_erp
DB_USERNAME=root
DB_PASSWORD=

CACHE_STORE=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

SANCTUM_STATEFUL_DOMAINS=localhost
```

## Step 5 — Register Providers and Middleware

Edit `bootstrap/app.php` to register middleware aliases and schedule commands. See `bootstrap/app-registration-reference.php` for the exact configuration to merge.

Key registrations:
- Middleware aliases: `active` → `EnsureAccountIsActive`, `permission` → `CheckPermission`, `correlation` → `TrackRequestCorrelation`
- Route middleware groups: apply `correlation` to API group
- Schedule commands (see `SCHEDULER_CATALOGUE.md`)

Register service providers in `config/app.php` (or `bootstrap/providers.php` in Laravel 11+):
- `App\Providers\RouteServiceProvider`
- `App\Providers\AuthServiceProvider`
- `App\Providers\EventServiceProvider`
- `App\Providers\ObserverServiceProvider`

## Step 6 — Publish Spatie Permission Assets

```bash
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
```

## Step 7 — Generate Application Key

```bash
php artisan key:generate
```

## Step 8 — Run Migrations and Seed

```bash
php artisan migrate
php artisan db:seed
```

See `MIGRATION_EXECUTION_PLAN.md` for migration order and dependency notes.

## Step 9 — Start Queue Worker and Scheduler

```bash
php artisan queue:work --tries=3 --max-time=3600
php artisan schedule:run   # Or set up cron: * * * * * cd /path && php artisan schedule:run >> /dev/null 2>&1
```

## Step 10 — Run Tests

```bash
php artisan test
# or with Pest directly:
./vendor/bin/pest
```

See `VERIFICATION_CHECKLIST.md` for the full verification process.

## Default Admin Credentials

After seeding, the default admin user is:
- **Email:** admin@school.edu
- **Password:** password

Change this immediately in production.
