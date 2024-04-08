<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ReservationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'logIn']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logOut']);
Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'getUser']);


Route::middleware('auth:sanctum')->get('/reservations', [ReservationController::class, 'findUserReservations']);
Route::middleware('auth:sanctum')->get('/reservations/filter-date', [ReservationController::class, 'filterReservationByDate']);
Route::middleware('auth:sanctum')->get('/reservations/filter-username', [ReservationController::class, 'filterReservationByUsername']);
