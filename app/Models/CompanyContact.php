<?php

namespace App\Models;

use App\Enums\CompanyContactActivityStatusEnum;
use App\Enums\ContactMethodEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\TypeScriptTransformer\Attributes\TypeScriptType;

#[TypeScriptType([
    'first_name' => 'string',
    'last_name' => 'string',
    'email' => 'string',
    'phone' => 'string',
    'title' => 'string',
    'job_title' => 'string',
    'preferred_contact_method' => 'string',
    'last_contacted_at' => 'string',
    'notes' => 'string',
])]
class CompanyContact extends Model
{
    /** @use HasFactory<\Database\Factories\CompanyContactFactory> */
    use HasFactory, \Znck\Eloquent\Traits\BelongsToThrough;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'title',
        'job_title',
        'preferred_contact_method',
        'last_contacted_at',
        'notes',
        'activity_status',
    ];

    protected $cast = [
        'last_contacted_at' => 'date',
        'preferred_contact_method' => ContactMethodEnum::class,
        'notes' => 'array',
        'activity_status' => CompanyContactActivityStatusEnum::class,
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function user(): \Znck\Eloquent\Relations\BelongsToThrough
    {
        return $this->belongsToThrough(User::class, Company::class);
    }
}
