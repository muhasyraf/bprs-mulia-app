<?php

namespace App\Http\Controllers;

use App\Models\KontrakAngsuran;
use App\Models\Pembiayaan;
use App\Models\Angsuran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KontrakAngsuranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = auth()->user()->id;
        $kontrakAngsurans = KontrakAngsuran::with('pembiayaan', 'angsuran')->whereHas('pembiayaan', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->get();

        return Inertia::render('Client/Angsuran/KontrakAngsuran', [
            'userId' => $userId,
            'kontrakAngsurans' => $kontrakAngsurans,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $request->merge([
            'tanggal_jatuh_tempo' => date('Y-m-d', strtotime($request->tanggal_jatuh_tempo)),
            'tanggal_survei' => date('Y-m-d', strtotime($request->tanggal_survei)),
        ]);
        $request->validate([
            'pembiayaan_id' => 'required|exists:pembiayaans,id',
            'angsuran_pokok' => 'required|numeric',
            'tenor' => 'required',
            'tanggal_jatuh_tempo' => 'required|date',
            'nisbah_nasabah' => 'required|numeric',
            'nisbah_bank' => 'required|numeric',
            'tanggal_survei' => 'required|date',
        ]);

        Pembiayaan::find($request->pembiayaan_id)->update([
            'status' => 'approved'
        ]);
        KontrakAngsuran::create($request->all());

        return redirect()->back()->with('success', 'Permohonan pembiayaan berhasil disetujui');
    }

    /**
     * Display the specified resource.
     */
    public function show(KontrakAngsuran $kontrakAngsuran)
    {
        // get kontrak angsuran detail with pembiayaan relation
        $kontrakAngsuran = KontrakAngsuran::with('pembiayaan', 'angsuran')->find($kontrakAngsuran->id);
        return Inertia::render('Client/Angsuran/BayarAngsuran', [
            'kontrakAngsuran' => $kontrakAngsuran
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(KontrakAngsuran $kontrakAngsuran)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, KontrakAngsuran $kontrakAngsuran)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KontrakAngsuran $kontrakAngsuran)
    {
        //
    }
}
