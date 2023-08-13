<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\HostController;

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

Route::get('/host', [HostController::class, 'show']);

Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/popular', [PostController::class, 'popular']);
Route::get('/posts/last', [PostController::class, 'last']);
Route::get('/posts/{id}', [PostController::class, 'show']);
Route::get('/posts/search/{value}', [PostController::class, 'search']);

Route::get('/comments/last', [CommentController::class, 'last']);
Route::get('/comments/{postId}', [CommentController::class, 'index']);
Route::post('/posts/{id}/comments', [CommentController::class, 'store']);

Route::middleware('guest')->group(function() {
    Route::post('/loginAuth', [AuthController::class, 'login']);
});

Route::middleware('auth')->group(function() {
    Route::get('/logout', [AuthController::class, 'logout']);

    Route::post('/posts', [PostController::class, 'store']);
    Route::put('/posts/{id}', [PostController::class, 'update']);
    Route::delete('/posts/{id}', [PostController::class, 'destroy']);

    Route::put('/host', [HostController::class, 'update']);
});

Route::get('/checkAuth', [AuthController::class, 'checkAuth']);
