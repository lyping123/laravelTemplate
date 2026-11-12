<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\buyerController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'welcome')->name('home');

Route::middleware('guest')->group(function (): void {
    Route::get('/', [AuthController::class, 'createLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'storeLogin'])->name('login.store');
    Route::get('/register', [AuthController::class, 'createRegistration'])->name('register');
    Route::post('/register', [AuthController::class, 'storeRegistration'])->name('register.store');
});

Route::middleware('auth')->group(function (): void {
    Route::get('/email/verify', [AuthController::class, 'showVerification'])->name('verification.notice');
    Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])
        ->middleware('signed')
        ->name('verification.verify');
    Route::post('/email/verification-notification', [AuthController::class, 'sendVerification'])
        ->middleware('throttle:6,1')
        ->name('verification.send');
    Route::post('/logout', [AuthController::class, 'destroySession'])->name('logout');
    Route::get('/dashboard', [AuthController::class, 'dashboard'])->name('dashboard');
    Route::get('/user-information', [AuthController::class, 'createUserInformation'])->name('user-information.create');
    Route::post('/user-information', [AuthController::class, 'addUserinformation'])->name('user-information.store');

    // products
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/products/list', [ProductController::class, 'productList'])->name('products.list');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

    // buyer
    Route::get('/buyer', [buyerController::class, 'index'])->name('buyer.index');
    Route::get('/buyer/create', [buyerController::class, 'create'])->name('buyer.create');
    Route::post('/buyer', [buyerController::class, 'store'])->name('buyer.store');
    Route::post('/buyer/cart-list', [buyerController::class, 'storeCartList'])->name('buyer.cart-list.store');
});

Route::get('/index', function () {
    return Inertia::render('index');
})->name('demo.index');

Route::post('/index', function (Request $request) {
    $data = $request->all();

    return response()->json($data);
})->name('demo.store');
