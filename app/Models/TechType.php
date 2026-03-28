<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class TechType extends Model
{
    const UPDATED_AT = null;

    public function techs(): BelongsToMany
    {
        return $this->belongsToMany(Tech::class, 'tech_type')
            ->as('tech');
    }
}
