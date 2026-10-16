<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Student;
use Illuminate\Auth\Access\Response;

class StudentPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('students.view');
    }

    public function view(User $user, Student $student): bool
    {
        if ($user->can('students.view')) return true;
        if ($user->hasRole('Parent')) {
            return $student->guardians()->where('guardians.user_id', $user->id)->exists();
        }
        if ($user->hasRole('Teacher')) {
            $staffId = $user->staff?->teacher?->id;
            return $staffId && $student->enrolments()
                ->whereHas('schoolClass.classSubjects', fn($q) => $q->where('teacher_id', $staffId))
                ->exists();
        }
        return false;
    }

    public function create(User $user): bool
    {
        return $user->can('students.create');
    }

    public function update(User $user, Student $student): bool
    {
        return $user->can('students.update');
    }

    public function delete(User $user, Student $student): bool
    {
        return $user->can('students.delete');
    }
}
