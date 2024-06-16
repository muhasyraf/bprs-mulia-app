<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KontrakAngsuran extends Model
{
    use HasFactory;

    protected $fillable = [
        'pembiayaan_id', 'angsuran_pokok', 'tanggal_jatuh_tempo', 'nisbah_nasabah', 'nisbah_bank', 'tanggal_survei'
    ];

    public function pembiayaan()
    {
        return $this->belongsTo(Pembiayaan::class);
    }

    public function angsuran()
    {
        return $this->hasMany(Angsuran::class);
    }
}
