<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
    protected $fillable = [
        "title",
        "price",
        "description",
        "image",
        "stock",
        "provider_id"
    ];

    public function provider(): BelongsTo
    {
        return $this->belongsTo(Provider::class, 'foreign_key', 'local_key');
    }
}
