<?php

namespace App\Http\Controllers\Friends;

use App\Http\Controllers\Controller;
use App\Http\Requests\Friends\FriendRequest;
use App\Models\Friend;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

        if ($data['status'] == 'rejected' && $friend) {
            $friend->forceDelete();
            return messageResponse();
        }

        if ($friend) {
            $friend->update($data);
        } else {
            $data['status'] = 'pending';
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
        })
            ->orWhereIn('id', function ($query) use ($userId, $status) {
                $query->select('user_id')
                    ->from('friends')
                    ->where('friend_id', $userId)
                    ->where('status', $status);
            })
            ->get()
            ->map(function ($friend) use ($userId, $status) {
                $friendship = DB::table('friends')
                    ->where(function ($query) use ($friend, $userId, $status) {
                        $query->where('user_id', $userId)
                            ->where('friend_id', $friend->id)
                            ->where('status', $status);
                    })
                    ->orWhere(function ($query) use ($friend, $userId, $status) {
                        $query->where('friend_id', $userId)
                            ->where('user_id', $friend->id)
                            ->where('status', $status);
                    })
                    ->first();

                // Attach the user_id from the friends table
                $friend->snedFriend_id = $friendship->user_id;
                return $friend;
            });

        return contentResponse($friends->load('media'));
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
    
    public function searchUsers()
    {
        $userId = auth_id();
    
        // Get all users
        $users = User::all()->map(function ($user) use ($userId) {
            // Check if the current user is a friend of the authenticated user
            $isFriend = DB::table('friends')
                ->where(function ($query) use ($user, $userId) {
                    $query->where('user_id', $userId)
                        ->where('friend_id', $user->id);
                })
                ->orWhere(function ($query) use ($user, $userId) {
                    $query->where('friend_id', $userId)
                        ->where('user_id', $user->id);
                })
                ->exists();
    
            // Attach the isFriend attribute to the user
            $user->isFriend = $isFriend;
            return $user;
        });
    
        return contentResponse($users->load('media'));
    }
    
}
