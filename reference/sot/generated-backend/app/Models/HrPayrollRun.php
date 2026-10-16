<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class HrPayrollRun extends Model
{
    use HasFactory;

    protected $fillable = ['term_id', 'month', 'status', 'total_gross', 'total_deductions', 'total_net', 'approved_by', 'approved_at'];

    protected function casts(): array
    {
        return [
            'total_gross' => 'decimal:2',
            'total_deductions' => 'decimal:2',
            'total_net' => 'decimal:2',
            'approved_at' => 'datetime',
            'status' => \App\Enums\PayrollRunStatus::class,
        ];
    }

    public function term(): BelongsTo
    {
        return $this->belongsTo(Term::class);
    }

    public function payslips(): HasMany
    {
        return $this->hasMany(HrPayslip::class, 'payroll_run_id');
    }
}
