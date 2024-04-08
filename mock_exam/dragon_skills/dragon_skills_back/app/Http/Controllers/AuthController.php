<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'username' => 'required|string|unique:users',
            'password' => 'required|string',
        ]);

        $uuid = Str::uuid()->toString();
        $user = User::create([
            'id' => "1",
            'name' => $request->name,
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'administrator' => false,
            'points' => 0,
        ]);

        return response()->json($user, 201);
    }

    public function logIn(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where("username", $request->username)->first();
        if ($user && Hash::check($request->password, $user->password)) {
            $token = $user->createToken($user->id)->plainTextToken;
            return response()->json([$token], 200);
        }

        return response()->json(["message" => 'Credenciales no validas'], 401);
    }

    public function logOut(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(["message" => "Se ha cerrado sesión correctamente"], 200);
    }

    public function getUser(Request $request)
    {
        return response()->json($request->user(), 201);
    }
}
