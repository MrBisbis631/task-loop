<?php

namespace App\Enums;

enum PaymentTermEnum: string
{
    case IMMEDIATE = 'immediate';
    case NET_30 = 'net_30';
    case NET_60 = 'net_60';
    case NET_90 = 'net_90';
}
