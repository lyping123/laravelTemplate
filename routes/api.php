<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\apiController;

Route::prefix('v1')->group(function () {
    Route::get('/access-token', [apiController::class, 'getAccessToken']);
    Route::get('/tin-number', [apiController::class, 'getTinNumber']);
});
