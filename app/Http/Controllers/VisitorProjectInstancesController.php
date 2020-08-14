<?php

namespace App\Http\Controllers;

use App\Exports\VisitorProjectInstancesExport;
use App\VisitorProject;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class VisitorProjectInstancesController extends Controller
{
    public function __construct()
    {
    }

    public function report(Request $request) {

        $project = VisitorProject::where("id", $request->project_id)->first();

        $start_date = date('Y-m-d', strtotime($request->start_date));
        $due_date = date('Y-m-d', strtotime($request->due_date));

        $filename = $project->name . "-start-{$start_date}-end-{$due_date}";

        return Excel::download(new VisitorProjectInstancesExport($request), $filename.'.csv');
    }
}
