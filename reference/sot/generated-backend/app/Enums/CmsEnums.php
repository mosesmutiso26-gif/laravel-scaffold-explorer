<?php

namespace App\Enums;

enum CmsPageStatus: string
{
    case Draft = 'Draft';
    case Published = 'Published';
    case Archived = 'Archived';
}

enum EnquiryStatus: string
{
    case New = 'New';
    case Responded = 'Responded';
    case Closed = 'Closed';
}
