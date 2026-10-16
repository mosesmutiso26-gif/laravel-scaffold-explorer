<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LibraryBook extends Model
{
    use HasFactory;

    protected $fillable = [
        'isbn', 'title', 'author', 'publisher', 'category',
        'publication_year', 'total_copies', 'available_copies', 'shelf_location',
    ];

    public function copies(): HasMany
    {
        return $this->hasMany(LibraryCopy::class, 'book_id');
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(LibraryReservation::class, 'book_id');
    }
}
