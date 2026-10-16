<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CompetitionEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'competition_id', 'student_id', 'entry_status', 'result_position',
        'result_notes', 'judges', 'certificate_path',
    ];

    protected function casts(): array
    {
        return [
            'judges' => 'array',
        ];
    }

    public function competition(): BelongsTo
    {
        return $this->belongsTo(Competition::class);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}
