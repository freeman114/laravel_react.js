<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Price;
use Illuminate\Http\Request;

class PriceController extends Controller
{

    public function index(Request $request)
    {
        $prices = Price::all();
        return [
            "status" => "success",
            "prices" => $prices
        ];
    }

    public function add(Request $request)
    {
        $price = Price::create($request->all());
        return [
            "status" => "success",
            "price" => $price
        ];
    }

    public function update(Request $request)
    {

        $price = Price::where("id", $request->id)->first();

        if(empty($price)) {
            return [
                "status" => "fail"
            ];
        }

        $price->count_min = $request->count_min;
        $price->count_max = $request->count_max;
        $price->sum_minimum = $request->sum_minimum;
        $price->record_cost = $request->record_cost;
        $price->currency = $request->currency;
        $price->note = $request->note;
        $price->discount = $request->discount;
        $price->days_in_month = $request->days_in_month;
        $price->save();

        return [
            "status" => "success",
            "price" => $price
        ];
    }

    public function delete(Request $request)
    {
        $price = Price::where("id", $request->id);

        if(empty($price->first())) {
            return [
                "status" => "fail"
            ];
        }

        $price->delete();

        return [
            "status" => "success"
        ];
    }
}
