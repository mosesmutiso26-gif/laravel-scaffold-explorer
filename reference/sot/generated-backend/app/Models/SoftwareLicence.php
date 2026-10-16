<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Enums\LicenceType;

class SoftwareLicence extends Model
{
    use HasFactory;

    protected $fillable = [
        'software_product_id', 'licence_type', 'licence_count',
        'allocated_count', 'renewal_date', 'owner_department', 'compliance_notes',
    ];

    protected function casts(): array
    {
        return [
            'licence_count' => 'integer',
            'allocated_count' => 'integer',
            'renewal_date' => 'date',
            'licence_type' => LicenceType::class,
        ];
    }

    public function softwareProduct(): BelongsTo
    {
        return $this->belongsTo(SoftwareProduct::class);
    }

    public function availableLicences(): int
    {
        return max(0, $this->licence_count - $this->allocated_count);
    }
}
