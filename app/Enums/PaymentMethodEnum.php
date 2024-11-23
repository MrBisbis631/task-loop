<?php

namespace App\Enums;

enum PaymentMethodEnum: string
{
    case CREDIT_CARD = 'credit_card';
    case PAY_PAL = 'pay_pal';
    case BANK_TRANSFER = 'bank_transfer';

    public function readable(): string
    {
        return match ($this) {
            self::CREDIT_CARD => 'Credit Card',
            self::PAY_PAL => 'PayPal',
            self::BANK_TRANSFER => 'Bank Transfer',
        };
    }
}
