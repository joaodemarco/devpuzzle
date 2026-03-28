<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('guess_the_tech_attempts', function (Blueprint $table) {
            $table->id();
            $table->string('session_id');
            $table->foreignId('game_id')->constrained('guess_the_tech_games')->restrictOnDelete();
            $table->foreignId('tech_id')->constrained()->restrictOnDelete();
            $table->timestamp('created_at')->useCurrent();
            $table->index(['session_id', 'game_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guess_the_tech_attempts');
    }
};
