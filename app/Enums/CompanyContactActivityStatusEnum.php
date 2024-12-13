<?php

namespace App\Enums;

enum CompanyContactActivityStatusEnum: string
{
    case UNKNOWN = "unknown";
    case ACTIVE = "active";
    case INACTIVE = "inactive";
    case IN_VACATION = "in_vacation";

    public function readable(): string
    {
        return match ($this) {
            self::UNKNOWN => "Unknown",
            self::ACTIVE => 'Active',
            self::INACTIVE => 'Inactive',
            self::IN_VACATION => 'In vacation',
        };
    }

    public static function toArray(): array
    {
        return collect(self::cases())->map(fn($case) => [
            "value" => $case->value,
            "label" => $case->readable(),
        ])->toArray();
    }
}
