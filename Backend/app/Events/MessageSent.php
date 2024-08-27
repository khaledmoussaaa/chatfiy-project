<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $data;
    public $chatId;

    /**
     * Create a new event instance.
     */
    public function __construct($data, $chatId)
    {
        $this->data = $data;
        $this->chatId = $chatId;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('chat.' . $this->chatId),
        ];
    }

    /**
     * Get the broadcast event name.
     *
     * @return string
     */
    public function broadcastAs(): string
    {
        return 'MessageSent';
    }

    /**
     * Get the data to broadcast.
     *
     * @return array
     */
    public function broadcastWith(): array
    {
        return [
            'content' => $this->data,
        ];
    }
}