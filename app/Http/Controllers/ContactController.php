<?php

namespace App\Http\Controllers;

use App\Exports\StaffExport;
use App\Mail\SupportNotify;
use App\Support;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Mail;

class ContactController extends Controller
{
    public function __construct()
    {
    }

    public function submit(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'body' => 'required',
            'captcha' => 'required|captcha'
        ],
            [
                'captcha.captcha' => 'Invalid captcha code.'
            ]);

        $support = Support::create($request->except("token"));
        Mail::to(config("mail.notify_email"))->queue(new SupportNotify($support));

        return back()->with("success", "Thank you for contacting us. We will respond to you as soon as possible.");
    }
}
