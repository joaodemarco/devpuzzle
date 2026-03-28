<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GuessTheTechAttempt extends Model
{
    const UPDATED_AT = null;

    protected $fillable = [
        'session_id',
        'game_id',
        'tech_id',
    ];

    public function game(): BelongsTo
    {
        return $this->belongsTo(GuessTheTechGame::class);
    }

    public function tech(): BelongsTo
    {
        return $this->belongsTo(Tech::class);
    }
}
