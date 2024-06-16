<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Angsuran extends Model
{
    use HasFactory;

    protected $fillable = [
        'kontrak_angsuran_id', 'angsuran_ke', 'jumlah_angsuran', 'tanggal_bayar', 'metode_pembayaran', 'denda', 'catatan', 'status'
    ];

    public function kontrakAngsuran()
    {
        return $this->belongsTo(KontrakAngsuran::class);
    }
}
