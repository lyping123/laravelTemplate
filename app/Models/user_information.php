<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['name', 'ic', 'tin_number', 'phone_number', 'user_id'])]
class user_information extends Model
{
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
