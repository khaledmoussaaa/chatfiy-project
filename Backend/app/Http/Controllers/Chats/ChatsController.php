<?php

namespace App\Http\Controllers\Chats;

use App\Http\Controllers\Controller;
use App\Models\Chat;
use Illuminate\Http\Request;

class ChatsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get all chat sessions where the user is involved
        $chats = Chat::where('user1_id', auth()->id())
            ->orWhere('user2_id', auth()->id())
            ->with(['user1.media', 'user2.media']) // Eager load media for both users
            ->get();

        // Transform the chat data to include only the contact details of the other user
        $response = $chats->map(function ($chat) {
            // Determine the other user in the chat
            $otherUser = $chat->user1_id === auth()->id() ? $chat->user2 : $chat->user1;

            return [
                'chat_id' => $chat->id,
                'id' => $otherUser->id,
                'name' => $otherUser->name,
                'email' => $otherUser->email,
                'phone' => $otherUser->phone,
                'media' => $otherUser->media->first()->original_url ?? null,
            ];
        });

        return contentResponse($response);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $userId = $request->input('user_id');

        // Validate user ID
        if ($userId == auth_id()) {
            return response()->json(['error' => 'Cannot chat with yourself'], 400);
        }

        // Find or create a chat session
        $chat = Chat::where(function ($query) use ($userId) {
            $query->where('user1_id', auth_id())
                ->where('user2_id', $userId);
        })->orWhere(function ($query) use ($userId) {
            $query->where('user1_id', $userId)
                ->where('user2_id', auth_id());
        })->first();

        if (!$chat) {
            $chat = Chat::create([
                'user1_id' => auth_id(),
                'user2_id' => $userId,
            ]);
        }

        return contentResponse($chat);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
