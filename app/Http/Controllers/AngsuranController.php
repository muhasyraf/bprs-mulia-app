<?php

namespace App\Http\Controllers;

use App\Models\Angsuran;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\KontrakAngsuran;
use Illuminate\Support\Facades\Storage;

class AngsuranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // get angsuran data with kontrak angsuran that has pembiayaan data
        $kontrakAngsuran = KontrakAngsuran::with('pembiayaan', 'angsuran')->get();
        // dd($angsuran);
        return Inertia::render('Admin/Angsuran/DaftarAngsuran', [
            'kontrakAngsuran' => $kontrakAngsuran
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        // dd($request->kontrakAngsuranId);
        $kontrakAngsuran = KontrakAngsuran::with('pembiayaan')->find($request->kontrakAngsuranId);
        // dd($kontrakAngsuran);
        return Inertia::render('Client/Angsuran/BayarAngsuran', [
            'kontrakAngsuran' => $kontrakAngsuran
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $request->merge([
            'tanggal_bayar' => date('Y-m-d', strtotime($request->tanggal_bayar)),
        ]);
        $request->validate([
            'kontrak_angsuran_id' => 'required|exists:kontrak_angsurans,id',
            'angsuran_ke' => 'required|numeric',
            'jumlah_angsuran' => 'required|numeric',
            'tanggal_bayar' => 'required|date',
            'metode_pembayaran' => 'required|string|max:255',
            'bukti_pembayaran' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
            'catatan' => 'nullable|string',
        ]);

        $status = 'pending';
        $file = $request->file('bukti_pembayaran');
        $fileName = $request->kontrak_angsuran_id . '_' . $request->angsuran_ke . '_' . time() . '.' . $file->getClientOriginalExtension();

        Storage::putFileAs('public/bukti_pembayaran', $file, $fileName);
        Angsuran::create([
            'kontrak_angsuran_id' => $request->kontrak_angsuran_id,
            'angsuran_ke' => $request->angsuran_ke,
            'jumlah_angsuran' => $request->jumlah_angsuran,
            'tanggal_bayar' => $request->tanggal_bayar,
            'metode_pembayaran' => $request->metode_pembayaran,
            'bukti_pembayaran' => $fileName,
            'catatan' => $request->catatan,
            'status' => $status,
        ]);

        KontrakAngsuran::find($request->kontrak_angsuran_id)->update([
            'tanggal_jatuh_tempo' => date('Y-m-d', strtotime('+1 month', strtotime($request->tanggal_bayar))),
        ]);

        return redirect()->back()->with('success', 'Angsuran berhasil dibayar');
    }

    /**
     * Display the specified resource.
     */
    public function show(Angsuran $angsuran)
    {
        $kontrakAngsuran = KontrakAngsuran::with('pembiayaan', 'angsuran')->find($angsuran->kontrak_angsuran_id);
        // dd($kontrakAngsuran);
        $storagePath = Storage::url('bukti_pembayaran/' . $angsuran->bukti_pembayaran);
        return Inertia::render('Admin/Angsuran/DetailAngsuran', [
            'angsuran' => $angsuran,
            'kontrakAngsuran' => $kontrakAngsuran,
            'storagePath' => $storagePath
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Angsuran $angsuran)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Angsuran $angsuran)
    {
        $request->validate([
            'status' => 'required'
        ]);

        $angsuran->update($request->all());

        return redirect()->back()->with('success', 'Status angsuran berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Angsuran $angsuran)
    {
        //
    }
}
