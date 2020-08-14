<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

//php artisan db:seed --class=CreateAdminSeeder
class CreateAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $password = Hash::make("password");
         $user = User::create([
             "first_name" => "Admin",
             "last_name" => "",
             "email" => "admin@admin.com",
             "password" => $password
         ]);
         $user->assignRole('admin');

        $user = User::create([
            "first_name" => "Scale",
            "last_name" => "Campaign",
            "email" => "scale@campaign.com",
            "password" => $password
        ]);
        $user->assignRole('scale_campaign');


    }
}
