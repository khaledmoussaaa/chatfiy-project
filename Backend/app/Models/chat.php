<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Chat extends Model
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user1_id',
        'user2_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime:Y-m-d h:m:a',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'updated_at',
    ];

    // --------------------- Relations --------------------- //   
    // User 1 relationship
    public function user1()
    {
        return $this->belongsTo(User::class, 'user1_id');
    }

    // User 2 relationship
    public function user2()
    {
        return $this->belongsTo(User::class, 'user2_id');
    }

    // Messages relationship
    public function messages()
    {
        return $this->hasMany(Message::class, 'chat_id');
    }

    // Latest message relationship
    public function latestMessage()
    {
        return $this->hasOne(Message::class, 'chat_id')->latest();
    }
}
