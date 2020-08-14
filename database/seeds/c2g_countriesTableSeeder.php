<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class c2g_countriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('c2g_countries')->insert([
            [
                'code' => 'US',
                'country' => 'United States'
            ],
            [
                'code' => 'AF',
                'country' => 'Afghanistan'
            ],
            [
                'code' => 'AL',
                'country' => 'Albania'
            ]
        ]);
    }
}
