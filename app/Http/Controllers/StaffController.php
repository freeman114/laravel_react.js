<?php

namespace App\Http\Controllers;

use App\Exports\StaffExport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class StaffController extends Controller
{
    public function __construct()
    {
    }

    public function template(Request $request) {
        return Excel::download(new StaffExport, 'staff.xlsx');
    }
}
