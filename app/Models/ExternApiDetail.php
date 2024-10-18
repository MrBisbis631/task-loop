<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravel\Scout\Searchable;
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
    use HasFactory, Searchable;

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

    /**
     * Get the indexable data array for the model.
     *
     * @return array<string, mixed>
     */
    public function toSearchableArray()
    {
        return [
            'id' => (string)$this->getKey(),
            'user_id' => (string)$this->user_id,
            'created_at' => $this->created_at?->timestamp ?? 0,
            'expires_at' => $this->expires_at?->timestamp ?? 0,
            'api_name' => $this->api_name,
            'label' => $this->label ?? '',
            'description' => $this->description ?? '',
            'api_username' => $this->api_username,
        ];
    }
}
