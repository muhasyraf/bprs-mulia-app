<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pembiayaan extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_lengkap', 'user_id', 'no_rekening', 'alamat', 'laba_usaha', 'jumlah_pengajuan', 'usaha', 'status', 'jangka_waktu', 'jaminan', 'no_telp', 'jenis_akad'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function kontrak_angsuran()
    {
        return $this->hasOne(KontrakAngsuran::class, 'pembiayaan_id');
    }

    public function angsuran()
    {
        return $this->hasManyThrough(Angsuran::class, KontrakAngsuran::class);
    }
}
