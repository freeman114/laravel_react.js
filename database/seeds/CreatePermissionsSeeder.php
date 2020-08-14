<?php

use App\Level;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

//php artisan db:seed --class=CreatePermissionsSeeder
class CreatePermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $levels = Level::get();
        foreach ($levels as $level) {
            //Any action with level id
            Permission::create(['name' => 'all level '.$level->id]);
        }

    }
}
