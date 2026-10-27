<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['company_name', 'contact_person', 'contact_number', 'email'])]
class supplier extends Model
{
    public function productStockIns(): HasMany
    {
        return $this->hasMany(productStockIn::class);
    }
}
