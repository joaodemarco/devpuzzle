<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tech extends Model
{
    const UPDATED_AT = null;

    protected $casts = [
        'open_source' => 'boolean',
        'release_date' => 'date',
    ];

    public function types(): BelongsToMany
    {
        return $this->belongsToMany(TechType::class, 'tech_type')
            ->as('type');
    }

    public function areas(): BelongsToMany
    {
        return $this->belongsToMany(TechArea::class, 'tech_area')
            ->as('area');
    }

    public function guessTheTechGames(): HasMany
    {
        return $this->hasMany(GuessTheTechGame::class);
    }

    public function attempts(): HasMany
    {
        return $this->hasMany(GuessTheTechAttempt::class);
    }
}
