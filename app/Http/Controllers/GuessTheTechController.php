<?php

namespace App\Http\Controllers;

use App\Actions\Games\GuessTheTech\GenerateGuessTheTechGameAction;
use Inertia\Inertia;
use Illuminate\Http\Request;

class GuessTheTechController extends Controller
{
    public function index(GenerateGuessTheTechGameAction $gameGenerator)
    {
        // Ensure today's game exists, creating it if it doesn't
        $gameGenerator->execute();

        return Inertia::render('GuessTheTech');
    }
}
