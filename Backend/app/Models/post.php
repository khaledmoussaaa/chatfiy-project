<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Spatie\MediaLibrary\InteractsWithMedia;

class Post extends Model
{
    use HasFactory, Notifiable, InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'content',
    ];
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime:Y-m-d h:m:a',
        'updated_at' => 'datetime:Y-m-d h:m:a',
    ];

    // --------------------- Relations --------------------- //
    // User relationship
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Likes relationship
    public function likes()
    {
        return $this->hasMany(Like::class, 'post_id');
    }

    // Comments relationship
    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id');
    }
}
