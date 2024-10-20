<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Email extends Model
{
    use HasFactory;

    protected $fillable = ['email', 'is_default', 'label', 'verified_at', ];

    protected $casts = [
        'is_default' => 'boolean',
        'verified_at' => 'datetime',
    ];

    public function emailable(): MorphTo
    {
        return $this->morphTo();
    }
}
