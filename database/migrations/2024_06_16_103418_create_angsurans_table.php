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
        Schema::create('angsurans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kontrak_angsuran_id')->constrained('kontrak_angsurans');
            $table->integer('angsuran_ke');
            $table->bigInteger('jumlah_angsuran');
            $table->date('tanggal_bayar');
            $table->enum('metode_pembayaran', ['transfer', 'tunai']);
            $table->string('bukti_pembayaran');
            $table->text('catatan')->nullable();
            $table->enum('status', ['pending', 'paid', 'rejected']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('angsurans');
    }
};
