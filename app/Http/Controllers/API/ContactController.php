<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;
use Illuminate\Validation\ValidationException;

class ContactController extends Controller
{
    public function refreshCaptcha()
    {
        return response()->json(['captcha'=> captcha_img()]);
    }

}
