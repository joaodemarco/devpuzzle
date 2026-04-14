<?php

namespace Database\Seeders;

use App\Models\Tech;
use App\Models\TechArea;
use App\Models\TechType;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class TechSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get(database_path('data/techs.json'));
        $techs = json_decode($json, true);

        foreach ($techs as $techData){
            $tech = Tech::create([
                'name' => $techData['name'],
                'slug' => $techData['slug'],
                'image_path' => "techs/{$techData['slug']}.png",
                'open_source' => $techData['open_source'],
                'release_date' => Carbon::createFromDate($techData['release_date'], 1, 1),
                'creator_type' => $techData['creator_type'],
                'hint' => $techData['hint'],
            ]);

            $typesIds = [];
            foreach ($techData['types'] as $type) {
                $type = TechType::firstOrCreate([
                    'name' => $type,
                    'slug' => Str::slug($type),
                ]);
                $typesIds[] = $type->id;
            }
            $tech->types()->sync($typesIds);

            $areasIds = [];
            foreach ($techData['areas'] as $area) {
                $area = TechArea::firstOrCreate([
                    'name' => $area,
                    'slug' => Str::slug($area),
                ]);
                $areasIds[] = $area->id;
            }
            $tech->areas()->sync($areasIds);
        }
    }
}
