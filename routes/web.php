<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
    'serverTime' => [
            'now' => now('UTC')->timestamp,
            'nextPuzzleAt' => now('UTC')->addDay()->startOfDay()->timestamp,
        ],
    ]);
});

Route::get('/about', function() {
    return Inertia::render('About', [
    'serverTime' => [
            'now' => now('UTC')->timestamp,
            'nextPuzzleAt' => now('UTC')->addDay()->startOfDay()->timestamp,
        ],
    ]);
});
