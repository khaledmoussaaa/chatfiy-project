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
        'updated_at' => 'datetime:Y-m-d h:m:a',
    ];

    // --------------------- Relations --------------------- //   
    // Users relationship
    public function users()
    {
        return $this->belongsToMany(User::class, 'chats', 'user1_id', 'user2_id');
    }

    // Messages relationship
    public function messages()
    {
        return $this->hasMany(Message::class, 'chat_id');
    }
}
