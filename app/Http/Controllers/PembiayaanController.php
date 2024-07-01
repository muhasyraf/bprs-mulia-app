<?php

namespace App\Http\Controllers;

use App\Models\Pembiayaan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PembiayaanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pembiayaan = Pembiayaan::with('user')->get();
        return Inertia::render('Admin/Pembiayaan/DaftarPengajuan', [
            'pembiayaan' => $pembiayaan
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $userId = auth()->user()->id;
        return Inertia::render('Client/Pembiayaan/Create', [
            'userId' => $userId
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',
            'no_rekening' => 'required|numeric|digits_between:8,32',
            'alamat' => 'required|string|max:255',
            'laba_usaha' => 'required|numeric',
            'jumlah_pengajuan' => 'required',
            'usaha' => 'required|string|max:255',
            'jangka_waktu' => 'required|string',
            'jaminan' => 'required|string|max:255',
            'no_telp' => 'required|numeric|digits_between:10,13',
            'jenis_akad' => 'required|string|max:255',
        ]);

        Pembiayaan::create($request->all());

        return redirect()->back()->with('success', 'Pembiayaan berhasil diajukan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Pembiayaan $pembiayaan)
    {
        // dd($pembiayaan);
        return Inertia::render('Admin/Pembiayaan/DetailPengajuan', [
            'pembiayaan' => $pembiayaan
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pembiayaan $pembiayaan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pembiayaan $pembiayaan)
    {
        $request->validate([
            'status' => 'required'
        ]);

        $pembiayaan->update($request->all());

        return redirect()->back()->with('success', 'Pembiayaan berhasil ditolak');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pembiayaan $pembiayaan)
    {
        //
    }
}
