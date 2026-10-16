<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ClubLeadership extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'club_id', 'student_id', 'position', 'appointed_at', 'ends_at',
        'appointed_by', 'approval_status',
    ];

    protected function casts(): array
    {
        return [
            'appointed_at' => 'date',
            'ends_at' => 'date',
        ];
    }

    public function club(): BelongsTo
    {
        return $this->belongsTo(Club::class);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function appointer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'appointed_by');
    }
}
