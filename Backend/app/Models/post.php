<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Post extends Model implements HasMedia
{
    use HasFactory, Notifiable, InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'title',
        'content',
    ];
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime:D-m-y h:m:a',
        'updated_at' => 'datetime:D-m-y h:m:a',
    ];


    // Spatie Media Library Collections
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('posts')->singleFile();
    }

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
