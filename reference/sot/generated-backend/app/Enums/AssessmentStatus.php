<?php

namespace App\Enums;

enum AssessmentStatus: string
{
    case Draft = 'Draft';
    case Published = 'Published';
    case Closed = 'Closed';
}

enum GradeStatus: string
{
    case Entered = 'Entered';
    case Moderated = 'Moderated';
    case Published = 'Published';
}

enum ReportCardStatus: string
{
    case Draft = 'Draft';
    case Published = 'Published';
}
