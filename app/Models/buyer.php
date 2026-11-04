<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

// #[Fillable('id', 'buyer_name', 'ic', 'contact_number', 'lime_address', 'state', 'zipcode', 'country')]
class buyer extends Model
{
    protected $table = "buyer";
    protected $fillable = ['id', 'buyer_name', 'ic', 'contact_number', 'line_address', 'state', 'zipcode', 'country'];
}
