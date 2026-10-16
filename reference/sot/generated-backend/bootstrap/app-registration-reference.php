<?php

// Bootstrap app registration reference for Laravel 13
// Copilot: Merge these registrations into bootstrap/app.php
// Do NOT copy this file directly — use it as a reference for what to register.

use App\Http\Middleware\CheckPermission;
use App\Http\Middleware\EnsureAccountIsActive;
use App\Http\Middleware\TrackRequestCorrelation;
use App\Providers\AppServiceProvider;
use App\Providers\AuthServiceProvider;
use App\Providers\EventServiceProvider;
use App\Providers\ObserverServiceProvider;
use App\Providers\RouteServiceProvider;

// In Laravel 13, bootstrap/app.php uses withMiddleware() and withProviders()
// Reference registrations:

$middleware = [
    \Illuminate\Authentication\Middleware\Authenticate::class,
    EnsureAccountIsActive::class,
    TrackRequestCorrelation::class,
];

$middlewareAliases = [
    'permission' => CheckPermission::class,
    'active' => EnsureAccountIsActive::class,
    'correlation' => TrackRequestCorrelation::class,
];

$providers = [
    AppServiceProvider::class,
    AuthServiceProvider::class,
    EventServiceProvider::class,
    ObserverServiceProvider::class,
    RouteServiceProvider::class,
];

$scheduledCommands = [
    // See docs/operations/SCHEDULER_CATALOGUE.md for full list
    // 'send-fee-reminders' => 'daily',
    // 'check-overdue-library-items' => 'daily',
    // 'check-lab-stock-expiry' => 'weekly',
    // 'generate-activity-reminders' => 'daily',
];

// Throttle configuration
$throttle = [
    'global' => env('RATE_LIMIT_GLOBAL', 60),
    'auth' => env('RATE_LIMIT_AUTH', 5),
];
