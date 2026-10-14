<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['address', 'city', 'state', 'zip_code', 'user_id'])]
class user_address extends Model
{
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
