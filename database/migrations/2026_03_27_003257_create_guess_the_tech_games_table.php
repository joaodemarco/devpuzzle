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
        Schema::create('guess_the_tech_games', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('tech_id')->constrained()->restrictOnDelete();
            $table->date('date')->unique();
            $table->timestamp('created_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guess_the_tech_games');
    }
};
