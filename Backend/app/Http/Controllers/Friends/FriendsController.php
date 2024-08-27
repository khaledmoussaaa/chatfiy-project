<?php

namespace App\Http\Controllers\Friends;

use App\Http\Controllers\Controller;
use App\Http\Requests\Friends\FriendRequest;
use App\Models\Friend;
use App\Models\User;
use Illuminate\Http\Request;

class FriendsController extends Controller
{
    // Add a friend
    public function addOrRejectFriend(FriendRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth_id();

        $userId = auth_id();
        $friendId = $data['friend_id'];

        if ($data['friend_id'] == $data['user_id']) {
            return messageResponse('Cannot add yourself as a friend', 400);
        }

        $friend = Friend::where(function ($query) use ($userId, $friendId) {
            $query->where('user_id', $userId)
                ->where('friend_id', $friendId);
        })->orWhere(function ($query) use ($userId, $friendId) {
            $query->where('user_id', $friendId)
                ->where('friend_id', $userId);
        })->first();

        if ($friend) {
            $friend->update($data);
        } else {
            $friend = Friend::create($data);
        }

        return messageResponse();
    }

    // Get the list of friends
    public function getFriends(string $status)
    {
        $userId = auth_id();

        // Get the list of friends where the user is either the requester or the receiver
        $friends = User::whereIn('id', function ($query) use ($userId, $status) {
            $query->select('friend_id')
                ->from('friends')
                ->where('user_id', $userId)
                ->where('status', $status);
        })->orWhereIn('id', function ($query) use ($userId, $status) {
            $query->select('user_id')
                ->from('friends')
                ->where('friend_id', $userId)
                ->where('status', $status);
        })->get();

        // Append is_friend key to each user
        $friends = $friends->map(function ($friend) use ($userId, $status) {
            $isFriend = Friend::where(function ($query) use ($userId, $friend, $status) {
                $query->where('user_id', $userId)
                    ->where('friend_id', $friend->id)
                    ->where('status', $status);
            })->orWhere(function ($query) use ($userId, $friend, $status) {
                $query->where('user_id', $friend->id)
                    ->where('friend_id', $userId)
                    ->where('status', $status);
            })->exists();

            return $friend;
        });

        return contentResponse($friends);
    }

    public function removeFriend(string $friend_id)
    {
        $userId = auth_id();
        $friendId = $friend_id;

        $friend = Friend::where(function ($query) use ($userId, $friendId) {
            $query->where('user_id', $userId)
                ->where('friend_id', $friendId);
        })->orWhere(function ($query) use ($userId, $friendId) {
            $query->where('user_id', $friendId)
                ->where('friend_id', $userId);
        })->where('status', 'accepted')->first();

        if ($friend) {
            $friend->forceDelete();
        }

        return messageResponse();
    }

    // Search users and return with is_friend attribute
    public function searchUsers()
    {
        $searchFriends = User::get();
        return contentResponse($searchFriends->load('media'));
    }
}
