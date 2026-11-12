<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class buyer_cart_product extends Model
{
    protected $fillable = [
        'buyer_cart_list_id',
        'product_id',
        'quantity',
        'unit_price',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(productStockIn::class, 'product_id');
    }
}
