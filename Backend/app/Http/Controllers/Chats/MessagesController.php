<?php

namespace App\Http\Controllers\Chats;

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
        if (!($chat->user1_id == auth_id() || $chat->user2_id == auth_id())) {
            return messageResponse('Unauthorized', false, 403);
        }

        // Get messages for the chat session
        $messages = $chat->messages()->orderBy('created_at')->get();
        return contentResponse($messages);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MessageRequest $request)
    {
        // Request Input Validated
        $data = $request->validated();
        $data['sender_id'] = auth_id();

        // Ensure the chat belongs to the sender
        $chat = Chat::findOrFail($data['chat_id']);
        if (!($chat->user1_id == $data['sender_id'] || $chat->user2_id == $data['sender_id'])) {
            return messageResponse('Unauthorized', false, 403);
        }

        // Create and save the message
        $message = Message::create($data);
        return messageResponse();
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
