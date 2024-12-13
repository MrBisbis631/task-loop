<?php

namespace App\Http\Resources;

use App\Enums\CompanyContactActivityStatusEnum;
use App\Enums\ContactMethodEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Spatie\TypeScriptTransformer\Attributes\TypeScriptType;
use Propaganistas\LaravelPhone\PhoneNumber;
use libphonenumber\PhoneNumberFormat;

#[TypeScriptType([
    'id' => 'number',
    'first_name' => 'string',
    'last_name' => 'string',
    'email' => 'string',
    'phone' => 'string',
    'title' => 'string',
    'job_title' => 'string',
    'preferred_contact_method' => ContactMethodEnum::class,
    'last_contacted_at' => 'string',
    'phone_readable' => 'string',
    'phone_rfc3966' => 'string',
    'notes' => 'string[]',

    'preferred_contact_method_readable' => ContactMethodEnum::class,
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
        $phone = $this->phone ? (new PhoneNumber($this->phone, "INTERNATIONAL")) : null;

        return [
            ...parent::toArray($request),

            'phone_readable' => $phone?->format(PhoneNumberFormat::NATIONAL),
            'phone_rfc3966' => $phone?->format(PhoneNumberFormat::RFC3966),

            'preferred_contact_method_readable' => ContactMethodEnum::from($this->preferred_contact_method)->readable(),
            'activity_status_readable' => CompanyContactActivityStatusEnum::from($this->activity_status)->readable(),
        ];
    }
}
