<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\TypeScriptTransformer\Attributes\LiteralTypeScriptType;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[LiteralTypeScriptType([
    'id' => 'string',
    'api_token' => 'string',
    'api_secret' => 'string',
    'api_name' => 'string',
    'label' => 'string',
    'description' => 'string',
    'api_username' => 'string',
    'expires_at' => 'string',
    'created_at' => 'string',
    'updated_at' => 'string',
])]
class ExternApiDetail extends Model
{
    use HasFactory;

    protected $fillable = ['expires_at', 'api_token', 'api_secret', 'api_name', 'label', 'description', 'api_username',];

    protected $hidden = ['api_token', 'api_secret',];

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
