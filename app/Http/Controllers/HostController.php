<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\HostRequest;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class HostController extends Controller
{
    public function show() 
    {
        $host = User::where('is_admin', true)->first();
        return $host;
    }

    public function update(HostRequest $request)
    {
        $data = $request->validated();

        $host = User::where('is_admin', true)->first();
        $host->update($request->all());

        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $avatarName = 'avatar.' . $avatar->extension();
            
            Storage::disk('public')->putFileAs('host', $avatar, $avatarName);

            $host->avatar = $avatarName;
            $host->save();
        }
        if ($request->hasFile('background')) {
            $background = $request->file('background');
            $backgroundName = 'background.' . $background->extension();
            
            Storage::disk('public')->putFileAs('host', $background, $backgroundName);

            $host->background = $backgroundName;
            $host->save();
        }

        return $request;
    }
}
