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
        $posts = Post::where('user_id', auth_id())->with('user', 'likes', 'comments')->get();
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
            $post->addMediaFromRequest('meida')->toMediaCollection('posts');
        }
        return messageResponse();
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //Show Specific Post
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
        $userId = auth_id();
        $user = auth()->user();

        // Get the IDs of friends
        $friendIds = $user->getFriendIds()->push($userId);

        // Fetch posts made by friends
        $posts = Post::whereIn('user_id', $friendIds)
            ->with(['user', 'likes', 'comments'])
            ->latest() // Optional: to get the most recent posts first
            ->get();

        return contentResponse($posts);
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
