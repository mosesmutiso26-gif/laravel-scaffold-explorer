<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LibraryLoan extends Model
{
    use HasFactory;

    protected $fillable = [
        'copy_id', 'student_id', 'issued_by', 'issued_at', 'due_date',
        'returned_at', 'received_by', 'status',
    ];

    protected function casts(): array
    {
        return [
            'issued_at' => 'datetime',
            'due_date' => 'date',
            'returned_at' => 'datetime',
            'status' => \App\Enums\LoanStatus::class,
        ];
    }

    public function copy(): BelongsTo
    {
        return $this->belongsTo(LibraryCopy::class, 'copy_id');
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function issuedBy(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'issued_by');
    }
}
