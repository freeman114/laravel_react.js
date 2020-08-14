<?php

namespace App\Http\Controllers;

use App\NewsLetterSubscription;
use Illuminate\Http\Request;

class NewsLetterSubscribeController extends Controller
{
    public function __construct()
    {
    }


    public function newsSubscribedCsv(Request $request) {

        ini_set('max_execution_time', 0);

        header('Content-Description: File Transfer');
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="Subscribed Emails for news letter.csv"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        $fp = fopen('php://output', 'w');

        $arr_head[] = 'Name';
        $arr_head[] = 'Email';
        $arr_head[] = 'Created At';
        fputcsv($fp, $arr_head);

        $emails = NewsLetterSubscription::orderBy("id","DESC")->get()->toArray();
        foreach ($emails as $email) {

            unset($email['id']);
            unset($email['ip']);
            unset($email['updated_at']);
            fputcsv($fp, $email);
        }

        fclose($fp);

    }


}
