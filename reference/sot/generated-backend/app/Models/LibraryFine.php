<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LibraryFine extends Model
{
    use HasFactory;

    protected $fillable = ['loan_id', 'student_id', 'amount', 'status'];

    protected function casts(): array
    {
        return ['amount' => 'decimal:2', 'status' => \App\Enums\FineStatus::class];
    }

    public function loan(): BelongsTo
    {
        return $this->belongsTo(LibraryLoan::class);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}
