<?php

namespace App\Enums;

enum RoleEnum: string
{
    case SUPER_ADMIN = 'super-admin';
    case ADMIN = 'admin';
    case FREELANCER = 'freelancer';
    case CLIENT = 'client';

    public static function all(): array
    {
        return [
            self::SUPER_ADMIN,
            self::ADMIN,
            self::FREELANCER,
            self::CLIENT,
        ];
    }

    public function label(): string
    {
        return match ($this) {
            self::SUPER_ADMIN => 'Super Admin',
            self::ADMIN => 'Admin',
            self::FREELANCER => 'Freelancer',
            self::CLIENT => 'Client',
        };
    }
}
