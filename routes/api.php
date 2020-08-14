<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['namespace' => 'API'], function () {
    Route::post('/token', 'AuthController@token')->name('api.token');



    //Users auth
    Route::group(['prefix' => 'users'], function () {
        Route::post('/authenticate', 'AuthController@authenticate')->name('api.auth.authenticate');
        Route::post('/register', 'AuthController@register')->name('api.auth.register');
        Route::post('/password-reset', 'AuthController@passwordReset')->name('api.auth.passwordReset');
    });

    Route::group(['middleware' => 'auth:sanctum'], function () {

        Route::post('/user', 'AuthController@user')->name('api.user');

        //Users
        Route::group(['prefix' => 'users'], function () {
            Route::post('/grant_access', 'UserController@grant_access')->name('api.users.grant_access');
            Route::post('/permissions', 'UserController@permissions')->name('api.users.permissions');
            Route::post('/add_permission', 'UserController@add_permission')->name('api.users.add_permission');
            Route::post('/delete_permission', 'UserController@delete_permission')->name('api.users.delete_permission');
            Route::post('/search', 'UserController@search')->name('api.users.search');
            Route::post('/get_all', 'UserController@get_all')->name('api.users.get_all');
            Route::post('/get_all_search', 'UserController@get_all_search')->name('api.users.get_all_search');
            Route::post('/go_to_account', 'UserController@go_to_account')->name('api.users.go_to_account');
        });

        //Profile
        Route::group(['prefix' => 'profile'], function () {
            Route::post('/', 'ProfileController@index')->name('api.company.index');
            Route::post('/create', 'ProfileController@create')->name('api.company.create');
            Route::post('/get_profile', 'ProfileController@get_profile')->name('api.company.get_profile');
        });

        //Levels
        Route::group(['prefix' => 'levels'], function () {
            Route::post('/create_company', 'CompanyController@create')->name('api.levels.create');
            Route::post('/', 'LevelController@index')->name('api.levels.index');
            Route::post('/add', 'LevelController@add')->name('api.levels.add');
            Route::post('/update', 'LevelController@update')->name('api.levels.update');
            Route::post('/delete', 'LevelController@delete')->name('api.levels.delete');
        });


        //Prices
        Route::group(['prefix' => 'prices'], function () {
            Route::post('/', 'PriceController@index')->name('api.prices.index');
            Route::post('/add', 'PriceController@add')->name('api.prices.add');
            Route::post('/update', 'PriceController@update')->name('api.prices.update');
            Route::post('/delete', 'PriceController@delete')->name('api.prices.delete');
        });

        //Staff
        Route::group(['prefix' => 'staff'], function () {
            Route::post('/', 'StaffController@index')->name('api.staff.index');
            Route::post('/import', 'StaffController@import')->name('api.staff.import');

            Route::post('/add', 'StaffController@add')->name('api.staff.add');
            Route::post('/update', 'StaffController@update')->name('api.staff.update');
            Route::post('/delete', 'StaffController@delete')->name('api.staff.delete');

            Route::post('/resend_invite', 'StaffController@resend_invite')->name('api.staff.resend_invite');
        });


        //News Letter Subscriptions
        Route::group(['prefix' => 'news_subscribe'], function () {
            Route::post('/', 'NewsLetterSubscribeController@index')->name('api.news_subscribe.index');
            Route::post('/delete', 'NewsLetterSubscribeController@delete')->name('api.news_subscribe.delete');
        });

        //Api List
        Route::group(['prefix' => 'api_list'], function () {
            Route::post('/', 'ApiController@index')->name('api.api_list.index');
        });



        //Visitor Projects
        Route::group(['prefix' => 'visitor-projects'], function () {
            Route::post('/', 'VisitorProjectController@index')->name('api.visitor_projects.index');
            Route::post('/create', 'VisitorProjectController@create')->name('api.visitor_projects.create');
            Route::post('/update', 'VisitorProjectController@update')->name('api.visitor_projects.update');
            Route::post('/get_survey', 'VisitorProjectController@get_survey')->name('api.visitor_projects.get_survey');
            Route::post('/get', 'VisitorProjectController@get')->name('api.visitor_projects.get');
        });

        //Visitor Project Instances
        Route::group(['prefix' => 'visitor_project_instances'], function () {
            Route::post('/create', 'VisitorProjectInstancesController@create')->name('api.visitor_project_instances.create');
            Route::post('/update', 'VisitorProjectInstancesController@update')->name('api.visitor_project_instances.update');
            Route::post('/get', 'VisitorProjectInstancesController@get')->name('api.visitor_project_instances.get');
            Route::post('/report', 'VisitorProjectInstancesController@report')->name('api.visitor_project_instances.report');
        });
    });

    //News Letter Subscriptions
    Route::group(['prefix' => 'news_subscribe'], function () {
        Route::post('/create', 'NewsLetterSubscribeController@create')->name('api.news_subscribe.create');
    });

    //Plugin
    Route::group(['prefix' => 'plugin'], function () {
        Route::get('/rss', 'PluginController@rss')->name('api.plugin.rss');
    });

    //Captcha
    Route::get('/refresh_captcha', 'ContactController@refreshCaptcha')->name('refresh_captcha');
});

//From different namespace
Route::group(['middleware' => 'auth:sanctum'], function () {

});


//Route::middleware('auth:api')->get('/', function (Request $request) {
//});
