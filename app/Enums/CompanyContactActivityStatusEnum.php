<?php

namespace App\Enums;

enum CompanyContactActivityStatusEnum: string
{
    case ACTIVE = "active";
    case INACTIVE = "inactive";
    case IN_VALIDATION = "in_validation";

    public function readable(): string
    {
        return match ($this) {
            self::ACTIVE => 'Active',
            self::INACTIVE => 'Inactive',
            self::IN_VALIDATION => 'In Validation',
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
