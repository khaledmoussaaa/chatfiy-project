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
        $chats = Chat::where('user1_id', auth_id())->orWhere('user2_id',  auth_id())->get();
        return contentResponse($chats);
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
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
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
