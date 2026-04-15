<?php

namespace App\Console\Commands;

use App\Actions\Games\GuessTheTech\GenerateGuessTheTechGameAction;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Contracts\Console\Isolatable;
use DateTimeInterface;
use DateInterval;

#[Signature('game:generate-daily-guess-the-tech')]
#[Description('Generate the daily Guess the Tech game')]
class GenerateDailyGuessTheTechGame extends Command implements Isolatable
{
    /**
     * Execute the console command.
     */
    public function handle(GenerateGuessTheTechGameAction $gameGenerationAction): void
    {
        $gameGenerationAction->execute();
        $this->info('Daily game generated successfully.');
    }

    public function isolationLockExpiresAt(): DateTimeInterface|DateInterval
    {
        return now()->plus(minutes: 2);
    }
}
