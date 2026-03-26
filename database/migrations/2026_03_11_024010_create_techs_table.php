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
        Schema::create('techs', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('image_path');
            $table->boolean('open_source');
            $table->date('release_date');
            $table->string("creator_type");
            $table->string('hint');
            $table->timestamp('created_at')->useCurrent();
        });

        // Define the tech type(s)
        Schema::create('tech_type', function (Blueprint $table) {
            $table->id();
            $table->foreignid('tech_id')->constrained('techs');
            $table->foreignid('type_id')->constrained('tech_types');
            $table->unique(['tech_id', 'type_id']);
        });

        // Define the tech area(s)
        Schema::create('tech_area', function (Blueprint $table) {
            $table->id();
            $table->foreignid('tech_id')->constrained('techs');
            $table->foreignid('area_id')->constrained('tech_areas');
            $table->unique(['tech_id', 'area_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tech_area');
        Schema::dropIfExists('tech_type');
        Schema::dropIfExists('techs');
    }
};
