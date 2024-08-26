<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Spatie\MediaLibrary\InteractsWithMedia;

class Message extends Model
{
    use HasFactory, Notifiable, InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'chat_id',
        'sender_id',
        'receiver_id',
        'message',
        'seen'
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
    // Chat relationship
    public function chat()
    {
        return $this->belongsTo(Chat::class, 'chat_id');
    }

    // Sender relationship
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    // // Sender relationship
    // public function receiver()
    // {
    //     return $this->belongsTo(User::class, 'receiver_id');
    // }
}
