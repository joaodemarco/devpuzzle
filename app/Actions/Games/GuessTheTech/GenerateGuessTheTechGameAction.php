<?php

namespace App\Actions\Games\GuessTheTech;

use App\Models\GuessTheTechGame;
use App\Models\Tech;

class GenerateGuessTheTechGameAction
{
    public function execute(): GuessTheTechGame
    {
        return GuessTheTechGame::firstOrCreate(
            ['date' => now('UTC')->toDateString()],
            ['tech_id' => $this->getRandomTechId()]
        );
    }

    private function getRandomTechId(): int
    {
        $recentTechsIds = GuessTheTechGame::query()
            ->where('date', '>=', now('UTC')->subDays(14)->toDateString())
            ->pluck('tech_id');

        return Tech::query()
            ->whereNotIn('id', $recentTechsIds)
            ->inRandomOrder()
            ->value('id');
    }
}
