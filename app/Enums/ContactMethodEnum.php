<?php

namespace App\Enums;

enum ContactMethodEnum: string
{
    case OTHER = 'other';
    case EMAIL = 'email';
    case PHONE = 'phone';
    case SMS = 'sms';

    public function readable(): string
    {
        return match ($this) {
            self::OTHER => 'Other',
            self::EMAIL => 'Email',
            self::PHONE => 'Phone',
            self::SMS => 'SMS',
        };
    }

    public static function toArray(): array
    {
        return collect(self::cases())->map(fn($case) => [
            'value' => $case->value,
            'label' => $case->readable(),
        ])->toArray();
    }
}
