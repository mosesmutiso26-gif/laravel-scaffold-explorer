<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CmsAnnouncement extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'body', 'status', 'created_by', 'published_at'];

    protected function casts(): array
    {
        return [
            'status' => \App\Enums\CmsPageStatus::class,
            'published_at' => 'datetime',
        ];
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'created_by');
    }
}
