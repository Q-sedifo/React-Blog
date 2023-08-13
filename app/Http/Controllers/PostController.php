<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use App\Http\Requests\PostEditRequest;
use App\Models\Post; 
use Image;

class PostController extends Controller
{
    public function index() 
    {
        $posts = Post::orderBy('created_at', 'desc')->withCount('comments')->get();
        return $posts;
    }

    public function store(PostRequest $request) 
    {
        $validate = $request->validated();

        if ($request->hasFile('image')) {
            // Preview image
            $image = $request->file('image');
            $fileName = md5(time()) . '.' . $image->extension();

            Image::make($image)->fit(1920, 1080)->save(public_path('uploads/posts/') . $fileName);
            Image::make($image)->fit(480, 270)->save(public_path('uploads/posts/prev_') . $fileName);
        }

        $post = Post::create($request->all());
        $post->image = $fileName;
        $post->save();

        return true;
    }

    public function update(PostEditRequest $request, $id) 
    {
        $validate = $request->validated();

        $post = Post::findOrFail($id);

        if ($request->hasFile('image')) {
            // Deleting previous post images
            $imgPath = public_path('uploads/posts/' . $post->image);
            $thumbnailImgPath = public_path('uploads/posts/prev_' . $post->image);

            if (file_exists($imgPath)) unlink($imgPath);
            if (file_exists($thumbnailImgPath)) unlink($thumbnailImgPath);

            // Preview image
            $image = $request->file('image');
            $extension = $image->extension();
            $fileName = md5(time()) . '.' . $extension;

            Image::make($image)->fit(1920, 1080)->save(public_path('uploads/posts/') . $fileName);
            Image::make($image)->fit(480, 270)->save(public_path('uploads/posts/prev_') . $fileName);
        }

        $post->update($request->all());

        if ($request->hasFile('image')) {
            $post->image = $fileName;
            $post->save();
        }

        return $post;
    }

    public function popular() 
    {
        $mostPopularPosts = Post::where('views', '>', '0')->orderBy('views', 'desc')->skip(0)->take(6)->get([
            'id', 'title', 'views', 'image'
        ]);
        return $mostPopularPosts;
    }

    public function last() 
    {
        $posts = Post::latest('created_at')->limit(10)->get();
        return $posts;
    }

    public function show($postId) 
    {
        $post = Post::findOrFail($postId);
        $post->views = $post->views + 1;
        $post->save();

        return $post;
    }

    public function destroy($postId) 
    {
        $post = Post::findOrFail($postId);

        $imgPath = storage_path('app/public/posts/' . $post->image);
        $thumbnailImgPath = storage_path('app/public/posts/prev_' . $post->image);

        $post->comments()->delete();
        $post->delete();

        if (file_exists($imgPath)) {
            unlink($imgPath);
        }
        if (file_exists($thumbnailImgPath)) {
            unlink($thumbnailImgPath);
        }
    }

    public function search($value)
    {
        $posts = Post::where('title', 'like', '%' . $value . '%')
            ->orWhere('id', $value)
            ->withCount('comments')
            ->get();
        return $posts;
    }
}
