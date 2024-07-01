<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Pembiayaan;
use Faker\Factory as Faker;
use App\Models\User;

class PembiayaanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user_id = User::where('role', 'user')->pluck('id')->toArray();
        $faker = Faker::create();
        for ($i = 1; $i <= 30; $i++) {
            $userId = $faker->randomElement($user_id);
            $name = User::where('id', $userId)->pluck('name')->first();
            Pembiayaan::create([
                'user_id' => $userId,
                'nama_lengkap' => $name,
                'no_rekening' => $faker->bankAccountNumber,
                'usaha' => $faker->company,
                'laba_usaha' => $faker->numberBetween(50000000, 100000000),
                'alamat' => $faker->address,
                'jumlah_pengajuan' => $faker->randomElement(['5000000', '10000000', '15000000', '20000000', '25000000', '50000000', '75000000', '80000000', '90000000', '100000000']),
                'status' => 'pending',
                'jangka_waktu' => $faker->randomElement(['12 bulan', '24 bulan', '36 bulan', '48 bulan', '60 bulan']),
                'jaminan' => $faker->randomElement(['SHM/SHGB', 'BKPB Kendaraan Bermotor', 'Cash Collateral', 'Girik & Letter C']),
                'no_telp' => '08' . $faker->randomNumber(9),
                'jenis_akad' => "Mudharabah",
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
