<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Phone extends Model
{
    use HasFactory;

    protected $fillable = ['phone_number', 'is_default', 'label', 'verified_at', 'flags',];

    protected $casts = [
        'is_default' => 'boolean',
        'verified_at' => 'datetime',
        'flags' => 'integer',
    ];

    public function phoneable(): MorphTo
    {
        return $this->morphTo();
    }
}
