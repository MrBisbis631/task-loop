<?php

namespace App\Http\Resources;

use App\Enums\CompanyContactActivityStatusEnum;
use App\Enums\ContactMethodEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Spatie\TypeScriptTransformer\Attributes\TypeScriptType;

#[TypeScriptType([
    'first_name' => 'string',
    'last_name' => 'string',
    'email' => 'string',
    'phone' => 'string',
    'title' => 'string',
    'job_title' => 'string',
    'preferred_contact_method' => ContactMethodEnum::class,
    'last_contacted_at' => 'string',
    'notes' => 'string[]',

    'preferred_contact_method_readable' => 'string',
    'activity_status' => CompanyContactActivityStatusEnum::class,

    'activity_status_readable' => 'string',
])]
class CompanyContactResource extends JsonResource
{
    public static $wrap = null;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            ...parent::toArray($request),

            'preferred_contact_method_readable' => $this->preferred_contact_method->readable(),
            'activity_status_readable' => $this->activity_status->readable(),
        ];
    }
}
