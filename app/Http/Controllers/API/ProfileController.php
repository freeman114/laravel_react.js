<?php

namespace App\Http\Controllers\API;

use App\BillingCompany;
use App\Company;
use App\Http\Controllers\Controller;
use App\Level;
use App\User;
use App\UserLevel;
use Illuminate\Http\Request;
use SebastianBergmann\Environment\Console;
use Spatie\Permission\Models\Role;

class ProfileController extends Controller
{
    public function __construct()
    {
    }

    public function index(Request $request)
    {
        $company = Company::where("user_id", $request->user()->id)->first();

        return [
            "status" => "success",
            "company" => $company->get(["name", "address"])
        ];
    }


    public function create(Request $request)
    {

        $request->validate([
            'companyName' => 'required',
            'companyAddress' => 'required',

            'checkItOut' => 'required',

            'firstname' => 'required',
            'lastname' => 'required',

            'contactEmail' => 'required|email',
            'contactPhone' => 'required',

            'city' => 'required',
            'country' => 'required',
            'personalAddress' => 'required',
            'state' => 'required',
            'zip' => 'required',
        ]);

        /** @var $user User */
        $user = $request->user();


        $company = Company::where("user_id", $user->id)->first();

        if (empty($company)) {
            $billing_company = BillingCompany::create([
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,

                'contactEmail' => $request->contactEmail,
                'contactPhone' => $request->contactPhone,

                'city' => $request->city,
                'country' => $request->country,
                'personalAddress' => $request->personalAddress,
                'state' => $request->state,
                'zip' => $request->zip,
            ]);

            $company = Company::create([
                'name' => $request->companyName,
                'address' => $request->companyAddress,
                'user_id' => $user->id,
                'billing_id' => $billing_company->id
            ]);

            $user->company_id = $company->id;
            $user->save();
        } else {
            $company->name = $request->companyName;
            $company->address = $request->companyAddress;
            $company->save();
        }


        $user_level = UserLevel::where("parent_id", 0)->where("user_id", $user->id)->first();
        if (empty($user_level)) {
            UserLevel::create([
                'company_id' => $company->id,
                'parent_id' => 0,
                'user_id' => $user->id,
                'level_id' => 1,
                'value' => $request->companyName
            ]);
        } else {
            $user_level->value = $request->companyName;
            $user_level->save();
        }

        //Payment
        $stripeCustomer = $user->createOrGetStripeCustomer(); //For future subscription
        $user->charge(100, $request->paymentMethodId);

        return [
            "status" => "success",
            "company" => $company->companyName
        ];
    }


    public function get_profile(Request $request)
    {



        /** @var $user User */
        $user = $request->user();

        $company = Company::where("user_id", $user->id)->first();

        if (empty($company)) {
            return [
                "status" => "success",
                "profile" => [
                    "firstname" => $user->first_name,
                    "lastname" => $user->last_name,
                    "email" => $user->email
                ]
            ];
        }

        $profile = [
            "companyName" => $company->name,
            "companyAddress" => $company->address,
            "firstname" => $user->first_name,
            "lastname" => $user->last_name,
            "email" => $user->email
        ];

        if (!empty($company->billing_id)) {
            $billing_company = BillingCompany::where("id", $company->billing_id)->first();

            if (!empty($billing_company)) {
                $profile = array_merge($profile, [
                    "firstname" => $billing_company->firstname,
                    "lastname" => $billing_company->lastname,
                    "country" => $billing_company->country,
                    "state" => $billing_company->state,
                    "city" => $billing_company->city,
                    "zip" => $billing_company->zip,
                    "personalAddress" => $billing_company->personalAddress,
                    "contactPhone" => $billing_company->contactPhone,
                    "contactEmail" => $billing_company->contactEmail,
                ]);
            }
        }



        return [
            "status" => "success",
            "profile" => $profile
        ];
    }
}
