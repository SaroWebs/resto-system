<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Auth\RegisteredUserController;

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

Route::get('/test', function () {
    return Inertia::render('TestPage');
});


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register')
    ]);
});

Route::middleware('auth')->group(function () {

    Route::controller(RegisteredUserController::class)->group(function () {
        Route::get('/dashboard', 'dashboard')->name('Dashboard');
        Route::get('/admin', 'dashboard')->name('admin');
        Route::get('/home', 'dashboard')->name('home');
    });
    Route::controller(ProfileController::class)->group(function () {
        Route::get('/profile', 'edit')->name('profile.edit');
        Route::patch('/profile', 'update')->name('profile.update');
        Route::delete('/profile', 'destroy')->name('profile.destroy');
    });
    
    Route::controller(MenuController::class)->group(function () {
        Route::get('/products', 'index');
        Route::post('/product/store', 'store');
        Route::patch('/product/{menu}', 'update');
        Route::delete('/product/{menu}', 'destroy');
        
        // data
        Route::get('/getproducts', 'get_products');
    });
    

    Route::controller(CategoryController::class)->group(function () {
        Route::get('/categories', 'index');
        Route::post('/category/store', 'store');
        Route::put('/category/{id}/update', 'update');
        Route::put('/category/{category}/updatestatus', 'updateStatus');
        Route::delete('/category/{id}', 'destroy');
    });
});


require __DIR__ . '/auth.php';
