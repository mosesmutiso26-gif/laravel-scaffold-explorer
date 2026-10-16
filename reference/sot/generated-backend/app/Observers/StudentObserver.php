<?php

namespace App\Observers;

use App\Models\Student;

class StudentObserver
{
    public function created(Student $student): void
    {
        \App\Events\StudentAdmitted::dispatchIf(false, $student);
    }
}
