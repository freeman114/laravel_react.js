<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

//php artisan db:seed --class=CreateRolesSeeder
class CreateRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//        Role::create(['name' => 'admin']);
//        Role::create(['name' => 'manager']);
//        Role::create(['name' => 'staff']);
//        Role::create(['name' => 'scale_campaign']);
        Role::create(['name' => 'creator']);
    }
}
