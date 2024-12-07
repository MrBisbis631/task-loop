<?php

namespace App\Enums;

enum CompanyTypeEnum: string
{
    case OTHER = 'other';
    case SINGLE = 'single';
    case MARRIED_FILING_JOINTLY = 'married_filing_jointly';
    case MARRIED_FILING_SEPARATELY = 'married_filing_separately';
    case HEAD_OF_HOUSEHOLD = 'head_of_household';
    case QUALIFYING_WIDOWER = 'qualifying_widower';
    case SOLE_PROPRIETORSHIP = 'sole_proprietorship';
    case PARTNERSHIP = 'partnership';
    case CORPORATION = 'corporation';
    case NON_PROFIT = 'non_profit';

    public function description(): string
    {
        return match ($this) {
            self::OTHER => 'Other tax filing status.',
            self::SINGLE => 'Single individual filing taxes.',
            self::MARRIED_FILING_JOINTLY => 'Married individuals filing jointly.',
            self::MARRIED_FILING_SEPARATELY => 'Married individuals filing separately.',
            self::HEAD_OF_HOUSEHOLD => 'Single individual supporting a household.',
            self::QUALIFYING_WIDOWER => 'Widow or widower meeting specific criteria.',
            self::SOLE_PROPRIETORSHIP => 'Business operated by one individual.',
            self::PARTNERSHIP => 'Business owned by two or more partners.',
            self::CORPORATION => 'Legally distinct business entity.',
            self::NON_PROFIT => 'Organization not operating for profit.',
        };
    }

    public function readable(): string
    {
        return match ($this) {
            self::OTHER => 'Other',
            self::SINGLE => 'Single',
            self::MARRIED_FILING_JOINTLY => 'Married Jointly',
            self::MARRIED_FILING_SEPARATELY => 'Married Separately',
            self::HEAD_OF_HOUSEHOLD => 'Head of Household',
            self::QUALIFYING_WIDOWER => 'Qualifying Widow(er)',
            self::SOLE_PROPRIETORSHIP => 'Sole Proprietorship',
            self::PARTNERSHIP => 'Partnership',
            self::CORPORATION => 'Corporation',
            self::NON_PROFIT => 'Non-Profit Organization',
        };
    }

    public static function toArray(): array
    {
        return collect(self::cases())->map(fn ($item) => [
            'value' => $item->value,
            'readable' => $item->readable(),
            'description' => $item->description(),
        ])->toArray();
    }
}
