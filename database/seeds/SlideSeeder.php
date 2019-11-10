<?php

use Illuminate\Database\Seeder;
use App\Models\Slide;

class SlideSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Slide::truncate();

        for ($i = 0; $i < 4; $i++) {
            Slide::create([
                'text' => 'foto ' . ($i+1),
            ]);
        }
    }
}
