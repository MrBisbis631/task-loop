<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExternApiDetail extends Model
{
    use HasFactory;

    protected $fillable = ['expires_at', 'api_token', 'api_secret', 'api_name', 'label', 'description',];

    protected $casts = [
        'expires_at' => 'datetime',
        'api_token' => 'encrypted',
        'api_secret' => 'encrypted',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
