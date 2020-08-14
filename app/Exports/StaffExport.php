<?php

namespace App\Exports;

use App\Staff;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;


class StaffExport implements FromView
{
    public function view(): View
    {
        //For template get only head row
        return view('exports.staff');
    }

}