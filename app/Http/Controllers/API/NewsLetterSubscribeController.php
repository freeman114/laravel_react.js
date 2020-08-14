<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\NewsLetterSubscription;
use Illuminate\Http\Request;

class NewsLetterSubscribeController extends Controller
{
    public function __construct()
    {
    }


    public function index(Request $request) {

        $subscriptions = NewsLetterSubscription::orderBy("id","DESC")->get();

        return [
            "status" => "success",
            "subscriptions" => $subscriptions
        ];
    }

    public function create(Request $request) {

        $request->validate([
            "name" => "required",
            "email" => "required|unique:news_letter_subscriptions,email|email"
        ]);

        $request->merge(["ip" => $request->ip()]);
        $subscription = NewsLetterSubscription::create($request->all());
        return [
            "status" => "success",
            "subscription" => $subscription
        ];
    }

    public function delete(Request $request) {
        if(!empty($request->id)) {
            NewsLetterSubscription::where("id", $request->id)->delete();
            return [
                "status" => "success"
            ];
        }

        return [
            "status" => "fail"
        ];
    }
}
