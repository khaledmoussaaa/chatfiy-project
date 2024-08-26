<?php

namespace App\Http\Controllers\Chats;

use App\Events\MessageSent;
use App\Http\Controllers\Controller;
use App\Http\Requests\Chats\MessageRequest;
use App\Models\Chat;
use App\Models\Message;
use Illuminate\Http\Request;

class MessagesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function show($chat_id)
    {
        // Ensure the chat belongs to the user
        $chat = Chat::findOrFail($chat_id);
        if (!($chat->user1_id == auth()->id() || $chat->user2_id == auth()->id())) {
            return messageResponse('Unauthorized', false, 403);
        }

        // Get messages for the chat session
        $messages = $chat->messages()->orderBy('created_at')->get();

        // Add 'isSender' key and flatten the sender details
        $messages->transform(function ($message) {
            $message->isSender = $message->sender_id == auth()->id();
            $message->user_id = $message->sender->id;
            $message->name = $message->sender->name;
            $message->media = $message->sender->media->isNotEmpty() ? $message->sender->media->first()->original_url : null;
            unset($message->sender);
            return $message;
        });

        return contentResponse($messages);
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(MessageRequest $request)
    {
        // Request Input Validated
        $data = $request->validated();
        $data['sender_id'] = auth()->id();

        // Ensure the chat belongs to the sender
        $chat = Chat::findOrFail($data['chat_id']);
        if (!($chat->user1_id == $data['sender_id'] || $chat->user2_id == $data['sender_id'])) {
            return messageResponse('Unauthorized', false, 403);
        }

        // Create and save the message
        $message = Message::create($data);

        // Fetch the message with the required format
        $data = [
            'id' => $message->id,
            'user_id' => $message->sender_id,
            'message' => $message->message,
            'seen' => 0,
            'chat_id' => $message->chat_id,
            'created_at' => $message->created_at,
            'isSender' => $message->sender_id == auth()->id(),
            'user_id' => $message->sender->id,
            'name' =>  $message->sender->name,
            'media' => $message->sender->media->isNotEmpty() ? $message->sender->media->first()->original_url : null,
        ];

        broadcast(new MessageSent($data, $chat->user2_id))->toOthers();
        return contentResponse($data);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
