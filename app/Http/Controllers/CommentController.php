<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CommentRequest;
use App\Models\Comment; 

class CommentController extends Controller
{
    public function index($postId)
    {
        $comments = Comment::where('post_id', $postId)->orderBy('created_at', 'desc')->get();
        return $comments;
    }

    public function store(CommentRequest $request, $postId) 
    {
        $validated = $request->validated();

        Comment::create([
            'name' => $request->name,
            'content' => $request->content,
            'post_id' => $postId
        ]);

        return $request;
    }

    public function last() 
    {
        $comments = Comment::latest('created_at')->with('post:id,image')->limit(5)->get();
        return $comments;
    }
}
