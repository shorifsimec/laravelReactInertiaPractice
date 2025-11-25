<?php

use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/contact', function () {
    return Inertia::render('contact/contact-us');
})->name('contact');

Route::get('/about', function () {
    return Inertia::render('about/about-us');
})->name('about');

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::resource('students', StudentController::class);

    Route::get('contact/public-message', function () {
        return Inertia::render('contact/public-message');
    })->name('contact.public-message');

    Route::get('contact/contact-us', function () {
        return Inertia::render('contact/contact-us');
    })->name('contact.contact-us');
});

Route::get('/students/{student}/files/{fileIndex}/download', [StudentController::class, 'downloadFile'])
    ->name('students.file.download');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
