<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database. 
     */

    public function run(): void
    {
        // $this->call(LaratrustSeeder::class);
        
        User::factory()->count(10)->create();

        // $user = User::create([
        //     'name' => 'User 1',
        //     'email' => 'user1@gmail.com',
        //     'phone' => '01015571129',
        //     'password' => '12345678'
        // ]);

        // $user = User::create([
        //     'name' => 'User 2',
        //     'email' => 'user2@gmail.com',
        //     'phone' => '01015571130',
        //     'password' => '12345678'
        // ]);
    }
}
