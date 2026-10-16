<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Guardian extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id', 'first_name', 'last_name', 'phone', 'email', 'occupation', 'address',
    ];

    public function students(): BelongsToMany
    {
        return $this->belongsToMany(Student::class, 'student_guardians')
            ->withPivot('relationship', 'is_primary', 'is_emergency_contact')
            ->withTimestamps();
    }

    public function fullName(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
