<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class buyer_cart_list extends Model
{
    protected $fillable = [
        'buyer_id',
        'invoice_number',
        'status',
        'total_price',
        'payment_method',
    ];

    public function ProductsList(): HasMany
    {
        return $this->hasMany(buyer_cart_product::class, 'buyer_cart_list_id');
    }

    public function buyer(): BelongsTo
    {
        return $this->belongsTo(buyer::class, 'buyer_id');
    }
}
