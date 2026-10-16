<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Team extends Model
{
    use HasFactory;

    protected $fillable = ['sport_id', 'name', 'coach_id', 'category', 'status'];

    public function sport(): BelongsTo
    {
        return $this->belongsTo(Sport::class, 'sport_id');
    }

    public function coach(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'coach_id');
    }

    public function squadMembers(): HasMany
    {
        return $this->hasMany(SquadMember::class, 'team_id');
    }

    public function trainingSessions(): HasMany
    {
        return $this->hasMany(TrainingSession::class, 'team_id');
    }

    public function fixtures(): HasMany
    {
        return $this->hasMany(Fixture::class, 'team_id');
    }
}
