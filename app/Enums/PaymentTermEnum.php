<?php

namespace App\Enums;

enum PaymentTermEnum: string
{
    case IMMEDIATE = 'immediate';
    case NET_30 = 'net_30';
    case NET_60 = 'net_60';
    case NET_90 = 'net_90';

    public function readable(): string
    {
        return match ($this) {
            self::IMMEDIATE => 'Immediate',
            self::NET_30 => 'Net 30',
            self::NET_60 => 'Net 60',
            self::NET_90 => 'Net 90',
        };
    }
}
