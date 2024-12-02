<?php

namespace App\Enums;

enum CompanyTypeEnum: string
{
    case OTHER = 'Other';
    case SOLE_PROPRIETORSHIP = 'Sole Proprietorship';
    case PARTNERSHIP = 'Partnership';
    case LLC = 'Limited Liability Company (LLC)';
    case CORPORATION = 'Corporation (C Corp)';
    case S_CORPORATION = 'S Corporation';
    case NONPROFIT = 'Nonprofit Organization';
    case COOPERATIVE = 'Cooperative (Co-op)';

    public function readable(): string
    {
        return match ($this) {
            self::OTHER => 'Other',
            self::SOLE_PROPRIETORSHIP => 'Sole Proprietorship',
            self::PARTNERSHIP => 'Partnership',
            self::LLC => 'Limited Liability Company (LLC)',
            self::CORPORATION => 'Corporation (C Corp)',
            self::S_CORPORATION => 'S Corporation',
            self::NONPROFIT => 'Nonprofit Organization',
            self::COOPERATIVE => 'Cooperative (Co-op)',
        };
    }

    public function description(): string
    {
        return match ($this) {
            self::OTHER => 'A business entity that does not fit into any other category.',
            self::SOLE_PROPRIETORSHIP => 'Owned and operated by one individual. The owner is personally responsible for the business\'s liabilities.',
            self::PARTNERSHIP => 'Two or more individuals share ownership and responsibilities for the business. Partners share profits, losses, and liabilities.',
            self::LLC => 'Offers limited liability protection to owners while allowing pass-through taxation, making it a flexible option for small businesses.',
            self::CORPORATION => 'A legal entity separate from its owners, offering limited liability protection, but subject to double taxation on profits.',
            self::S_CORPORATION => 'Similar to a C Corporation but allows for pass-through taxation, avoiding double taxation.',
            self::NONPROFIT => 'Operates for charitable, educational, religious, or other purposes and does not distribute profits to owners or shareholders.',
            self::COOPERATIVE => 'Owned and operated by a group of individuals for their mutual benefit. Members share profits and decision-making responsibilities.',
        };
    }
}
