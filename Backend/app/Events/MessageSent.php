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

    /**
     * Create a new event instance.
     */
    public function __construct(public $data, public $receiver)
    {
        $this->data = $data;
        $this->receiver = $receiver;
    }


    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('messages.' . $this->receiver),
        ];
    }

    /**
     * Get the channels the event should broadcast as.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastAs()
    {
        return 'MessageSent';
    }

    /**
     * Get the channels the event should broadcast as.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastWith()
    {
        return [
            'content' =>  $this->data,
        ];
    }
}
