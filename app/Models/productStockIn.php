<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['product_name', 'quantity', 'price', 'description', 'supplier_id'])]
class productStockIn extends Model
{
    public function supplier(): BelongsTo
    {
        return $this->belongsTo(supplier::class);
    }
}
