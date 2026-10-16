<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CmsPage extends Model
{
    use HasFactory;

    protected $fillable = ['slug', 'title', 'content', 'status', 'last_edited_by', 'published_at'];

    protected function casts(): array
    {
        return [
            'status' => \App\Enums\CmsPageStatus::class,
            'published_at' => 'datetime',
        ];
    }

    public function lastEditedBy(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'last_edited_by');
    }
}
