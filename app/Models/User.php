<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\RoleEnum;
use App\Traits\Emailable;
use App\Traits\Phoneable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Jetstream\HasTeams;
use Laravel\Sanctum\HasApiTokens;
use Spatie\TypeScriptTransformer\Attributes\LiteralTypeScriptType;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[LiteralTypeScriptType([
    'id' => 'string',
    'name' => 'string',
    'email' => 'string',
    'role' => 'RoleEnum',
    'password' => 'string',
    'profile_photo_url' => 'string',
    'email_verified_at' => 'string',
    'externApiDetails' => "ExternApiDetail[]",
])]
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, HasProfilePhoto, HasTeams, Notifiable, TwoFactorAuthenticatable, Emailable, Phoneable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'profile_photo_url',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => RoleEnum::class,
            'role_verified_at' => 'datetime',
        ];
    }

    public function externApiDetails(): HasMany
    {
        return $this->hasMany(ExternApiDetail::class);
    }

    public function companies(): HasMany
    {
        return $this->hasMany(Company::class);
    }

    public function companyContacts(): HasManyThrough
    {
        return $this->hasManyThrough(CompanyContact::class, Company::class);
    }

    public function roleVerifiedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'role_verified_by');
    }

    public function usersVerifiedRole(): HasMany
    {
        return $this->hasMany(User::class, 'role_verified_by');
    }

    /**
     * @param RoleEnum[]|RoleEnum $roles The role(s) to check against
     * @return bool Whether the user has the role(s)
     */
    public function hasRole(RoleEnum|array $roles): bool
    {
        return is_array($roles) ?
            in_array($this->role, $roles) :
            $this->role === $roles;
    }
}
