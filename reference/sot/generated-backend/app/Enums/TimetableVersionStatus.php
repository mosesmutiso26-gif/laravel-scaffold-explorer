<?php

namespace App\Enums;

enum TimetableVersionStatus: string
{
    case Draft = 'Draft';
    case Published = 'Published';
    case Archived = 'Archived';
}
