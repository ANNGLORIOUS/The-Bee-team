<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request) {
        $fields = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|string|in:Reader,Librarian,Admin',
            'contact' => 'nullable|string|max:15',
        ]);

        $user = User::create($fields);

        $token = $user->createToken($request->name);

        return[
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    
    }
    public function login(Request $request) {
    $request->validate([
        'email' => 'required|string|email|max:255|exists:users',
        'password' => 'required|string|min:8',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response([
            'message' => 'Invalid credentials'
        ], 401);
    }

    if ($user->role !== 'Librarian') {
        return response([
            'message' => 'Only Librarians are allowed to log in'
        ], 403);
    }

    $token = $user->createToken($user->name)->plainTextToken;

    return [
        'user' => $user,
        'token' => $token
    ];
}

    public function logout(Request $request) {
        $request->user()->tokens()->delete();
    }
}
