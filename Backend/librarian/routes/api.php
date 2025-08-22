<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BorrowRequestController;

/*Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');*/

Route::get('/', function (){
    return 'API';
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Get all requests with advanced filtering
    Route::get('/requests/all', [BorrowRequestController::class, 'allRequests']);

    // Get specific request details
    Route::get('/requests/{id}', [BorrowRequestController::class, 'show']);

    // View pending requests 
    Route::get('/requests', [BorrowRequestController::class, 'index']);

    // Approve a borrow request
    Route::post('/requests/{id}/approve', [BorrowRequestController::class, 'approve']);

    // Reject a borrow request
    Route::post('/requests/{id}/reject', [BorrowRequestController::class, 'reject']);
    
    // Handle book return
    Route::post('/requests/{id}/return', [BorrowRequestController::class, 'returnBook']);
    
});