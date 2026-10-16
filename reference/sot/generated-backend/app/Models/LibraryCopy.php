<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LibraryCopy extends Model
{
    use HasFactory;

    protected $fillable = ['book_id', 'copy_number', 'status'];

    protected function casts(): array
    {
        return ['status' => \App\Enums\LibraryCopyStatus::class];
    }

    public function book(): BelongsTo
    {
        return $this->belongsTo(LibraryBook::class, 'book_id');
    }

    public function loans(): HasMany
    {
        return $this->hasMany(LibraryLoan::class, 'copy_id');
    }
}
