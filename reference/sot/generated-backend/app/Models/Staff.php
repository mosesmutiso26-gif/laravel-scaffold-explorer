<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Staff extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id', 'department_id', 'employee_number', 'first_name', 'last_name',
        'phone', 'email', 'date_of_birth', 'gender', 'type', 'status',
        'hire_date', 'exit_date', 'salary',
    ];

    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date',
            'hire_date' => 'date',
            'exit_date' => 'date',
            'salary' => 'decimal:2',
            'status' => \App\Enums\StaffStatus::class,
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function teacher(): HasOne
    {
        return $this->hasOne(Teacher::class);
    }

    public function leaveRequests(): HasMany
    {
        return $this->hasMany(HrLeaveRequest::class);
    }

    public function payslips(): HasMany
    {
        return $this->hasMany(HrPayslip::class);
    }

    public function fullName(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
