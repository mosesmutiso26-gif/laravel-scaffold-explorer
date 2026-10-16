<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClinicMedication extends Model
{
    use HasFactory;

    protected $fillable = ['visit_id', 'medication', 'dosage', 'frequency', 'administered_by'];

    public function visit(): BelongsTo
    {
        return $this->belongsTo(ClinicVisit::class, 'visit_id');
    }

    public function administeredBy(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'administered_by');
    }
}
