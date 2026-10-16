<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Invoice;

class InvoicePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('finance.view');
    }

    public function view(User $user, Invoice $invoice): bool
    {
        if ($user->can('finance.view')) return true;
        if ($user->hasRole('Parent')) {
            return $invoice->student->guardians()->where('guardians.user_id', $user->id)->exists();
        }
        return false;
    }

    public function create(User $user): bool
    {
        return $user->can('finance.create');
    }

    public function update(User $user, Invoice $invoice): bool
    {
        return $user->can('finance.update');
    }

    public function delete(User $user, Invoice $invoice): bool
    {
        return $user->can('finance.delete');
    }
}
