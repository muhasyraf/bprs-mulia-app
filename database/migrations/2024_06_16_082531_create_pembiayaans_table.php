<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pembiayaans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->string('nama_lengkap');
            $table->string('no_rekening');
            $table->string('alamat');
            $table->bigInteger('laba_usaha');
            $table->enum('jumlah_pengajuan', [5000000, 10000000, 15000000, 20000000, 25000000, 50000000, 75000000, 80000000, 90000000, 100000000]);
            $table->string('usaha');
            $table->enum('status', ['pending', 'approved', 'rejected']);
            $table->enum('jangka_waktu', ['12 bulan', '24 bulan', '36 bulan', '48 bulan', '60 bulan']);
            $table->enum('jaminan', ['SHM/SHGB', 'BKPB Kendaraan Bermotor', 'Cash Collateral', 'Girik & Letter C']);
            $table->string('no_telp');
            $table->string('jenis_akad');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembiayaans');
    }
};
