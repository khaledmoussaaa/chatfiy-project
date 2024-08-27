<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['middleware' => 'api'], function () {

    // Authuntication 
    Route::group(['prefix' => 'auth'], function () {
        Route::post('login', 'Auth\AuthController@login');
        Route::post('register', 'Auth\AuthController@register');
        Route::post('/forgot-password', 'Auth\AuthController@forgetPassowrd')->name('password.email');
        Route::post('/reset-password', 'Auth\AuthController@resetPassword')->name('password.reset');
    });

    // Authorizations
    Route::group(['middleware' => 'auth:api'], function () {
        // About User
        Route::group(['prefix' => 'auth'], function () {
            Route::get('me', 'Auth\AuthController@me');
            Route::post('refresh', 'Auth\AuthController@refresh');
            Route::post('logout', 'Auth\AuthController@logout');
        });

        // Chats Resource
        Route::apiResource('chats', 'Chats\ChatsController');
        Route::apiResource('messages', 'Chats\MessagesController');

        // Friends Resource
        Route::post('add/friends', 'Friends\FriendsController@addOrRejectFriend');
        Route::get('get/friends', 'Friends\FriendsController@getFriends');
        Route::get('search/friends', 'Friends\FriendsController@searchUsers');
        Route::delete('remove/friends/{friend_id}', 'Friends\FriendsController@removeFriend');
        
        // Posts Resource
        Route::apiResource('posts', 'Posts\PostsController');
        Route::post('posts/{post}', 'Posts\PostsController@update')->name('posts.update');
        Route::get('posts-friends', 'Posts\PostsController@postsFriends');
        Route::post('posts-like', 'Posts\PostsController@likeOrUnlikePost');
        Route::post('posts-comment', 'Posts\PostsController@addComment');
        Route::post('posts-getComment/{post_id}', 'Posts\PostsController@getComments');

        // Profile Resource
        Route::get('profile/me', 'Auth\AuthController@profile');
    });
});
