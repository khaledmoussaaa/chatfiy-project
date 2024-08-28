<?php

namespace App\Http\Controllers\Posts;

use App\Http\Controllers\Controller;
use App\Http\Requests\Posts\CommentRequest;
use App\Http\Requests\Posts\LikeOrUnlikePostRequest;
use App\Http\Requests\Posts\PostRequest;
use App\Models\Comment;
use App\Models\Like;
use App\Models\Post;
use App\Models\User;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::where('user_id', auth_id())->with('media', 'user', 'likes', 'comments')->get();
        return contentResponse($posts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostRequest $request)
    {
        // Create a new post
        $data = $request->validated();
        $data['user_id'] = auth_id();

        $post = Post::create($data);
        if ($request->hasFile('media')) {
            $post->addMediaFromRequest('media')->toMediaCollection('posts');
        }
        return messageResponse();
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //Show Specific Post
        $post->getFirstMediaUrl('posts');
        return contentResponse($post);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //Show Specific Post
        return contentResponse($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PostRequest $request, Post $post)
    {
        // Create a new post
        $data = $request->validated();
        $data['user_id'] = auth_id();

        $post->update($data);
        if ($request->hasFile('media')) {
            $post->addMediaFromRequest('meida')->toMediaCollection('posts');
        }
        return messageResponse();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function postsFriends()
    {
        $userId = auth()->user()->id;

        // Get the list of friend IDs where the user is either the requester or the receiver
        $friendIds = User::whereIn('id', function ($query) use ($userId) {
            $query->select('friend_id')
                ->from('friends')
                ->where('user_id', $userId)
                ->where('status', 'accepted');
        })->orWhereIn('id', function ($query) use ($userId) {
            $query->select('user_id')
                ->from('friends')
                ->where('friend_id', $userId)
                ->where('status', 'accepted');
        })->pluck('id');

        // Include the authenticated user's ID
        $friendIds->push($userId);

        // Fetch the latest posts made by friends or by the user themselves
        $posts = Post::whereIn('user_id', $friendIds)
            ->with(['media', 'user.media', 'likes', 'comments.user'])
            ->latest()
            ->get();

        // Structure the response with the necessary fields
        $response = $posts->map(function ($post) use ($userId) {
            return [
                'user_id' => $post->user->id,
                'user_name' => $post->user->name,
                'user_media' => $post->user->media->first() ? $post->user->media->first()->original_url : null,
                'post_id' => $post->id,
                'post_media' => $post->media->first()->original_url ?? null,
                'title' => $post->title,
                'content' => $post->content,
                'created_at' => $post->created_at->format('Y-m-d H:i:s'),
                'isLiked' => $post->likes->contains('user_id', $userId),
                'total_likes' => $post->likes->count(),
                'comments' => $post->comments->map(function ($comment) {
                    return [
                        'user_id' => $comment->user->id,
                        'user_name' => $comment->user->name,
                        'user_media' => $comment->user->media->first()->original_url ?? null,
                        'comment' => $comment->comment,
                        'created_at' => $comment->created_at->format('Y-m-d H:i:s')
                    ];
                }),
                'likes' => $post->likes->map(function ($like) {
                    return [
                        'user_id' => $like->user->id,
                        'user_name' => $like->user->name,
                        'user_media' => $like->user->media->first()->original_url ?? null
                    ];
                }),
            ];
        });

        return contentResponse($response);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function likeOrUnlikePost(LikeOrUnlikePostRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth_id();

        $userId = $data['user_id'];
        $postId = $data['post_id'];

        $post = Post::find($postId);

        if (!$post) {
            return messageResponse('Post not found..!', 404);
        }

        $like = Like::where('post_id', $postId)->where('user_id', $userId)->first();

        if ($like) {
            // Unlike the post
            $like->delete();
            $post->decrement('total_likes');
            $message = 'Post unliked';
        } else {
            // Like the post
            Like::create($data);
            $post->increment('total_likes');
            $message = 'Post liked';
        }

        return messageResponse($message);
    }

    // Add a comment to a post
    public function addComment(CommentRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth_id();

        $comment = Comment::create($data);
        return messageResponse();
    }

    // Get comments for a specific post
    public function getComments(string $post_id)
    {
        $comments = Comment::where('post_id', $post_id)->with('user')->get();
        return contentResponse($comments);
    }
}
