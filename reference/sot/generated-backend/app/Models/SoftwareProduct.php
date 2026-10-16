<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Enums\SoftwareCategory;

class SoftwareProduct extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 'version', 'category', 'purpose', 'supported_os',
        'installation_requirements',
    ];

    protected function casts(): array
    {
        return [
            'category' => SoftwareCategory::class,
        ];
    }

    public function licences(): HasMany
    {
        return $this->hasMany(SoftwareLicence::class);
    }

    public function installations(): HasMany
    {
        return $this->hasMany(SoftwareInstallation::class);
    }
}
