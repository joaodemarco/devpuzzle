<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GuessTheTechController;

Route::inertia('/', 'Home')->name('home');
Route::inertia('/about', 'About')->name('about');

// Game routes
Route::get('/guess-the-tech', [GuessTheTechController::class, 'index'])->name('guess-the-tech.index');
Route::inertia('/reveal-the-tech', 'RevealTheTech')->name('reveal-the-tech.index');
