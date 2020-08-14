<?php

namespace App\Http\Controllers\API;

use App\Company;
use App\Http\Controllers\Controller;
use App\Level;
use App\UserLevel;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class PluginController extends Controller
{

    public function __construct()
    {
    }


    public function rss(Request $request)
    {
        return file_get_contents('http://news.care-steps.com/~api/papers/636688ac-33a3-4342-b37e-a99f5b267568/rss');
    }


}
