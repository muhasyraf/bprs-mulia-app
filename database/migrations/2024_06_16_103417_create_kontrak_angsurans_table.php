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
        Schema::create('kontrak_angsurans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pembiayaan_id')->constrained('pembiayaans');
            $table->bigInteger('angsuran_pokok');
            $table->date('tanggal_jatuh_tempo');
            $table->bigInteger('nisbah_nasabah');
            $table->bigInteger('nisbah_bank');
            $table->date('tanggal_survei');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kontrak_angsurans');
    }
};
