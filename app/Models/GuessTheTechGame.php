<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GuessTheTechGame extends Model
{
    use HasUuids;

    const UPDATED_AT = null;

    protected $table = [
        'tech_id',
        'date',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function tech(): BelongsTo
    {
        return $this->belongsTo(Tech::class);
    }

    public function attempts(): HasMany
    {
        return $this->hasMany(GuessTheTechAttempt::class);
    }
}
