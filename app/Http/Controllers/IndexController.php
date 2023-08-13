<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Models\User;

class IndexController extends Controller
{
    public function index() 
    {
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
    
        return view('index');
    }
}
