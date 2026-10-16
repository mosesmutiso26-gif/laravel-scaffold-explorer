<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Staff;

class StaffPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('hr.view');
    }

    public function view(User $user, Staff $staff): bool
    {
        if ($user->can('hr.view')) return true;
        return $user->staff?->id === $staff->id;
    }

    public function create(User $user): bool
    {
        return $user->can('hr.create');
    }

    public function update(User $user, Staff $staff): bool
    {
        return $user->can('hr.update');
    }

    public function delete(User $user, Staff $staff): bool
    {
        return $user->can('hr.delete');
    }
}
