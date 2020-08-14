<?php

namespace App\Http\Controllers\API;

use App\Company;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    use AuthenticatesUsers;

    //Mobile
   public function token(Request $request) {


       $request->validate([
           'email' => 'required|email',
           'password' => 'required'
       ]);

       $user = User::where('email', $request->email)->first();

       if (! $user || ! Hash::check($request->password, $user->password)) {
           return [
               'status' => 'fail',
               'msg' => 'The provided credentials are incorrect.'
           ];
       }
       //Delete previous tokens
       //$user->tokens()->whereName('mobile')->delete();

       return $user->createToken("mobile")->plainTextToken;
   }


    public function user(Request $request) {

        $user = $request->user();

        if(!empty($user->company_id)) {
           $company = Company::where("id", $user->company_id)->first();
        }

        return [
            "status" => "success",
            "id" => $user->id,
            "first_name" => $user->first_name,
            "last_name" => $user->last_name,
            "email" => $user->email,
            "role" => $user->getRoleNames()[0] ?? "user",
            "company_id" => $company->id ?? null,
            "company_name" => $company->name ?? null,
            "company_address" => $company->address ?? null
        ];
    }

   //Admin Panel
    public function authenticate(Request $request) {


        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return Response::json([
                'msg' => 'Username or password is incorrect'
            ], 401);
        }


        return [
            "status" => "success",
            "id" => $user->id,
            "first_name" => $user->first_name,
            "last_name" => $user->last_name,
            "email" => $user->email,
            "role" => $user->getRoleNames()[0] ?? "user",
            "token" => $user->createToken("admin_panel")->plainTextToken
        ];
    }

}
