<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $casts = [
        'created_at' => 'datetime:d.m.Y',
        'updated_at' => 'datetime:d.m.Y',
    ];

    protected $fillable = [
        'name', 'content', 'post_id'
    ];

    public function post() 
    {
        return $this->belongsTo(Post::class);
    }
}
