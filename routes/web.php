<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Mews\Captcha\Facades\Captcha;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/privacy', function () {
    return view('privacy');
});

Route::get('/terms', function () {
    return view('terms');
});

Route::get('/apps', function () {
    return view('apps');
});

Route::group(['prefix' => 'contact'], function () {
    Route::get('/', function () {
        return view('contact');
    });
    Route::post('/submit', 'ContactController@submit')->name('contact.submit');
});




Route::get('/features', function () {
    return view('features');
});

Route::get('/help', function () {
    return view('help');
});



Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::group(['prefix' => 'staff'], function () {
    Route::get('/template', 'StaffController@template')->name('staff.template');
});


Route::group(['prefix' => 'visitor_project_instances'], function () {
    Route::get('/report/{project_id}/{start_date}/{due_date}', 'VisitorProjectInstancesController@report')->name('visitor_project_instances.report');
});

Route::group(['middleware' => ['auth.api'],'prefix' => 'news-letter-subs'], function () {
    Route::get('/csv', 'NewsLetterSubscribeController@newsSubscribedCsv')->name('news_letter_subs.csv');
});

include("blogetc.php");
