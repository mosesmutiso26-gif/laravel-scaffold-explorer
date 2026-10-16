<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Payment;

class PaymentPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('finance.view');
    }

    public function view(User $user, Payment $payment): bool
    {
        if ($user->can('finance.view')) return true;
        if ($user->hasRole('Parent')) {
            return $payment->student->guardians()->where('guardians.user_id', $user->id)->exists();
        }
        return false;
    }

    public function create(User $user): bool
    {
        return $user->can('finance.create');
    }

    public function verify(User $user, Payment $payment): bool
    {
        return $user->can('finance.verify');
    }

    public function reverse(User $user, Payment $payment): bool
    {
        return $user->can('finance.reverse');
    }
}
