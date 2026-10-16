<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HrPayslip extends Model
{
    use HasFactory;

    protected $fillable = ['payroll_run_id', 'staff_id', 'gross', 'deductions', 'net', 'deduction_breakdown'];

    protected function casts(): array
    {
        return [
            'gross' => 'decimal:2',
            'deductions' => 'decimal:2',
            'net' => 'decimal:2',
            'deduction_breakdown' => 'array',
        ];
    }

    public function payrollRun(): BelongsTo
    {
        return $this->belongsTo(HrPayrollRun::class, 'payroll_run_id');
    }

    public function staff(): BelongsTo
    {
        return $this->belongsTo(Staff::class);
    }
}
