<?php

namespace App\Http\Controllers\Auth;

// Controller
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgetPassword;
// Requests
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\ResetPassword;
// Illuminate
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Password;
// Models
use App\Models\User;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    // Get a JWT via given credentials.
    public function login(LoginRequest $request)
    {
        $token = auth()->attempt($request->validated());

        if (!$token) {
            return messageResponse('Unauthorized', false, 401);
        }
        return authResponse($token, 'Login Successfully');
    }

    // Get a JWT via given registred.
    public function register(RegisterRequest $request)
    {
        DB::beginTransaction();
        try {
            $user = User::create($request->validated());

            if ($request->hasFile('media')) {
                $user->addMediaFromRequest('media')->toMediaCollection('avatars');
            }

            if (!$user) {
                return messageResponse('An occured error..!!', false, 500);
            }
            $token = auth()->login($user);
            DB::commit();
            return authResponse($token, 'Register Successfully');
        } catch (\Throwable $error) {
            DB::rollBack();
            return messageResponse($error->getMessage(), false, 401);
        }
    }

    // Get the authenticated User.
    public function profile()
    {
        try {
            // Load the authenticated user with their posts, likes, and comments
            $user = auth()->user();
            $userId = auth()->user()->id;

            $response = $user->posts->map(function ($post) use ($userId) {
                return [
                    'user_id' => $post->user->id,
                    'user_name' => $post->user->name,
                    'user_media' => $post->user->media->first() ? $post->user->media->first()->original_url : null,
                    'post_id' => $post->id,
                    'post_media' => $post->media->first()->original_url,
                    'title' => $post->title,
                    'content' => $post->content,
                    'created_at' => $post->created_at->format('Y-m-d H:i:s'),
                    'isLiked' => $post->likes->contains('user_id', $userId),
                    'total_likes' => $post->likes->count(),
                    'comments' => $post->comments->map(function ($comment) {
                        return [
                            'user_id' => $comment->user->id,
                            'user_name' => $comment->user->name,
                            'user_media' => $comment->user->media->first()->original_url,
                            'comment' => $comment->comment,
                            'created_at' => $comment->created_at->format('Y-m-d H:i:s')
                        ];
                    }),
                    'likes' => $post->likes->map(function ($like) {
                        return [
                            'user_id' => $like->user->id,
                            'user_name' => $like->user->name,
                            'user_media' => $like->user->media->first()->original_url
                        ];
                    }),
                ];
            });

            return contentResponse($response);
        } catch (\Throwable $error) {
            return messageResponse($error->getMessage(), false, 401);
        }
    }

    public function me()
    {
        return contentResponse(auth()->user());
    }

    // Log the user out (Invalidate the token).
    public function logout()
    {
        try {
            auth()->logout();
            return messageResponse('Logged out successfully');
        } catch (\Throwable $error) {
            return messageResponse($error, false, 401);
        }
    }

    // Forget Password
    public function forgetPassowrd(ForgetPassword $request)
    {
        $status = Password::sendResetLink($request->validated());
        return $status === Password::RESET_LINK_SENT ? messageResponse('Reset link send successfully') : messageResponse('Failed, ' . $status, false, 403);
    }

    // Reset Password
    public function resetPassword(ResetPassword $request)
    {
        $status = Password::reset($request->validated(), function (User $user, string $password) {
            $user->forceFill(['password' => $password])->save();
            event(new PasswordReset($user));
        });
        return $status === Password::PASSWORD_RESET ? messageResponse('Password reseted successfully') : messageResponse('Failed, ' . $status, false, 403);
    }

    // Refresh a token.
    public function refresh()
    {
        try {
            return contentResponse(auth()->refresh());
        } catch (\Throwable $error) {
            return messageResponse('Failed, occured error..!', false, 401);
        }
    }
}
