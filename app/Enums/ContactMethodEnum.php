<?php

namespace App\Enums;

enum ContactMethodEnum: string
{
    case EMAIL = 'email';
    case PHONE = 'phone';
    case SMS = 'sms';
}
