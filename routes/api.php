<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\SeatController;
use App\Http\Controllers\CategoryController;


// front end
Route::get('/categories', [CategoryController::class, 'get_items']);
Route::get('/category/{id}', [CategoryController::class, 'get_item']);

Route::get('/menus', [MenuController::class, 'get_items']);
Route::get('/menu/{id}', [MenuController::class, 'get_item']);

Route::get('/seats', [SeatController::class, 'get_items']);
Route::get('/seat/{id}', [SeatController::class, 'get_item']);

// banner, review(menu_id)
// secured individual user
// personal info, reservation, notification, cart,  order
