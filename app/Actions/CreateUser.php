<?php


namespace App\Actions;


use App\Staff;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class CreateUser
{
    public function forEmployee($employee, $company_id) {
        if (!User::where("email", $employee->email)->exists()) {
            $user = User::create([
                "name" => $employee->first_name . " " . $employee->last_name,
                "first_name" => $employee->first_name,
                "last_name" => $employee->last_name,
                "email" => $employee->email,
                "password" => Hash::make(Str::random(8)),
                "company_id" => $company_id
            ]);

            $user->assignRole("staff");

            //Email
            Password::broker()->sendResetLink(["email" => $user->email]);

            $employee->user_id = $user->id;
            $employee->user_status = Staff::INVITED;
            $employee->save();
        } else {
            $employee->user_status = Staff::DUPLICATE;
            $employee->save();
        }
    }
}
