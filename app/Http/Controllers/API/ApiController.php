<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\NewsLetterSubscription;
use Illuminate\Http\Request;
use Route;

class ApiController extends Controller
{
    public function __construct()
    {
    }


    public function index(Request $request) {

        $routes = [];
        foreach (\Route::getRoutes()->getIterator() as $key => $route){
            if (strpos($route->uri, 'api') !== false){
                $routes[] = [
                    "id" => $key,
                    "uri" => $route->uri
                ];
            }
        }


        return [
            "status" => "success",
            "api_list" => $routes
        ];
    }

}
