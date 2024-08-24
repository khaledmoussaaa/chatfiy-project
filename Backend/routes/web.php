<?php

use App\Events\PrivateChannelEvent;
use App\Events\PublicChannelEvent;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test', function () {
    event(new PrivateChannelEvent(1, 'Hey 1',));
    event(new PublicChannelEvent('Hey 2'));
    return 'done';
});
