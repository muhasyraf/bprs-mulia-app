<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $defaultUser = [
            [
                'name' => 'Ikhlasul Rahman',
                'email' => 'ikhlasman@mail.com',
                'password' => bcrypt('ikhlas'),
                'role' => 'user'
            ],
            [
                'name' => 'Adib',
                'email' => 'adib@mail.com',
                'password' => bcrypt('adib'),
                'role' => 'user'
            ],
            [
                'name' => 'Nabila',
                'email' => 'nabila@mail.com',
                'password' => bcrypt('nabila'),
                'role' => 'user'
            ],
        ];

        User::insert($defaultUser);

        $faker = Faker::create();
        for ($i = 1; $i <= 7; $i++) {
            $uniqueName = $faker->unique()->name;
            $email = strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $uniqueName)) . '@mail.com';
            User::create([
                'name' => $uniqueName,
                'email' => $email,
                'password' => bcrypt('password'),
                'role' => 'user'
            ]);
        }
    }
}
