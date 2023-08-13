<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request) 
    {
        if (!$request->ajax()) return redirect()->route('home');

        $host = User::firstOrCreate([
            'is_admin' => true
        ], [
            'first_name' => 'Олег',
            'last_name' => 'Стельмащук',
            'nickname' => 'DeProg',
            'email' => 'oleggoper@ukr.net',
            'password' => bcrypt('sedifo51'),
            'description' => 'Вітаю вас на моєму блозі.'
        ]);

        if (auth()->attempt($request->all())) {
            return $user = auth()->user();
        }

        return throw ValidationException::withMessages([
            'Неправильний логін або пароль'
        ]);
    }

    public function logout(Request $request) 
    {
        if (!$request->ajax()) return redirect()->route('home');

        auth()->logout();
        return true;
    }

    public function checkAuth(Request $request) 
    {
        if (!$request->ajax()) return redirect()->route('home');

        if (auth()->check()) {
            return $user = auth()->user();
        }

        return null;
    }
}
