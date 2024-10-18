<?php

namespace Database\Seeders;

use App\Actions\Fortify\CreateNewUser;
use App\Enums\RoleEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;
use Laravel\Jetstream\Rules\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(CreateNewUser $createNewUser): void
    {
        try {
            // seed super admin user
            $createNewUser->create([
                "name" => RoleEnum::SUPER_ADMIN->label(),
                "email"=> config("app.super_admin_email"),
                "password"=> config("app.super_admin_password"),
                "password_confirmation"=> config("app.super_admin_password"),
                'terms' => true,
            ])->assignRole(RoleEnum::SUPER_ADMIN);
        } catch (\Throwable $th) {
            Log::warning("Failed to seed super admin user: {$th->getMessage()}");
        }
    }
}
