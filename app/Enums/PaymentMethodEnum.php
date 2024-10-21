<?php

namespace App\Enums;

enum PaymentMethodEnum: string
{
    case CREDIT_CARD = 'credit_card';
    case PAY_PAL = 'pay_pal';
    case BANK_TRANSFER = 'bank_transfer';
}
