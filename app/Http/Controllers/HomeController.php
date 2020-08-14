<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if(empty($user)) {
            return redirect("/");
        }

        $user = [
            "status" => "success",
            "id" => $user->id,
            "first_name" => $user->first_name,
            "last_name" => $user->last_name,
            "email" => $user->email,
            "role" => $user->getRoleNames()[0] ?? "user",
            "token" => $user->createToken("admin_panel")->plainTextToken
        ];


        $cookie = Cookie::make("user", json_encode($user), 0, null, null, false, false);
        $cookie = Cookie::make("register", json_encode("register"), 0, null, null, false, false);
        return redirect("/admin/dashboard/admin")->withCookie($cookie);

    }
}
