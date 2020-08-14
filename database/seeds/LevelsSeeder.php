<?php

use App\Level;
use Illuminate\Database\Seeder;

//php artisan db:seed --class=LevelsSeeder
class LevelsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Level::create(["name" => "Organization", "order" => 1]);
        Level::create(["name" => "State", "order" => 2]);
        Level::create(["name" => "County", "order" => 3]);
        Level::create(["name" => "Community", "order" => 4]);
        Level::create(["name" => "Zip", "order" => 5]);
        Level::create(["name" => "Campus", "order" => 6]);
        Level::create(["name" => "Building", "order" => 7]);
        Level::create(["name" => "Wing", "order" => 8]);
        Level::create(["name" => "Floor", "order" => 9]);
        Level::create(["name" => "Room", "order" => 10]);
    }
}
