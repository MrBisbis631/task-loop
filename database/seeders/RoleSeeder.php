<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        collect(RoleEnum::all())->each(function (RoleEnum $role) {
            try {
                Role::create(['name' => $role->value]);
            } catch (\Throwable $th) {
                Log::warning($th->getMessage());
            }
        });

        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
    }
}
