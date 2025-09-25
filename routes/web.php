<?php

use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::resource('students', StudentController::class);
});

Route::get('/students/{student}/files/{fileIndex}/download', [StudentController::class, 'downloadFile'])
    ->name('students.file.download');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
