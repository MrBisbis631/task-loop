<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Spatie\TypeScriptTransformer\Attributes\LiteralTypeScriptType;

#[LiteralTypeScriptType([
    'id' => 'string',
    'api_name' => 'string',
    'label' => 'string',
    'description' => 'string',
    'api_username' => 'string',
    'expires_at' => 'string',
    'created_at' => 'string',
    'updated_at' => 'string',
    'has_api_secret' => 'boolean',
    'has_api_token' => 'boolean',
])]
class ExternApiDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->getKey(),
            'api_name' => $this->api_name,
            'label' => $this->label,
            'description' => $this->description,
            'api_username' => $this->api_username,
            'expires_at' => $this->expires_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            'has_api_secret' => $this->api_secret !== null,
            'has_api_token' => $this->api_token !== null,
        ];
    }
}
