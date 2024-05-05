<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use App\Models\SystemAdmin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        DB::beginTransaction();

        try {
            $user = new User([
                'name' => 'System Admin',
                'email' => 'system@resto.com',
                'profile_image' => '/images/default/profile.png',
                'password' => Hash::make('resto@123'),
            ]);
            $user->save();

            if ($user->id) {
                $sys = new SystemAdmin([
                    'user_id' => $user->id,
                    'role' => 'administrator',
                    'active' => 1,
                ]);
                $sys->save();
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
        }
    }
}
