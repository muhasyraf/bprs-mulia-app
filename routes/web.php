<?php

use App\Http\Controllers\AngsuranController;
use App\Http\Controllers\KontrakAngsuranController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PembiayaanController;
use App\Models\Angsuran;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);

    // redirect to dashboard
    return redirect()->route('dashboard');
});

Route::get('/dashboard', function () {
    // if not authenticated, redirect to login
    if (!auth()->check()) {
        return redirect()->route('login');
    }
    // if it's admin, redirect to pembiayaan index
    if (auth()->user()->role == 'admin') {
        return redirect()->route('pembiayaan.index');
    }
    $userId = auth()->user()->id;
    $pembiayaans = \App\Models\Pembiayaan::with('kontrak_angsuran')->where('user_id', $userId)->get();
    $kontrakAngsurans = \App\Models\KontrakAngsuran::with('pembiayaan', 'angsuran')->whereHas('pembiayaan', function ($query) use ($userId) {
        $query->where('user_id', $userId);
    })->get();
    return Inertia::render('Dashboard', [
        'pembiayaans' => $pembiayaans,
        'kontrakAngsurans' => $kontrakAngsurans
    ]);
})
    ->name('dashboard');
//    ->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('pembiayaan', PembiayaanController::class);
    Route::resource('kontrak-angsuran', KontrakAngsuranController::class);
    Route::resource('angsuran', AngsuranController::class);
});


Route::get('/uikit/button', function () {
    return Inertia::render('main/uikit/button/page');
})->name('button');





require __DIR__ . '/auth.php';
