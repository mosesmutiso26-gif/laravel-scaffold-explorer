<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AppServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Gate::before(function ($user, $ability) {
            return $user->hasRole('Administrator') ? true : null;
        });
    }
}
