<?php

// For Auth Response
if (!function_exists('authResponse')) {
    function authResponse($token = null, $message = 'success', $success = true, $status = 200)
    {
        return response()->json([
            'token' => $token,
            'success' => $success,
            'message' => $message,
            'status' => $status,
            'expire_in' => auth()->factory()->getTTL(),
        ], $status);
    }
}

// For Content Response
if (!function_exists('contentResponse')) {
    function contentResponse($content, $message = 'success', $success = true, $status = 200)
    {
        return response()->json([
            'content' => $content,
            'success' => $success,
            'message' => $message,
            'status' => $status,
        ], $status);
    }
}

// For Success Response
if (!function_exists('messageResponse')) {
    function messageResponse($message = 'success', $success = true, $status = 200)
    {
        return response()->json([
            'success' => $success,
            'message' => $message,
            'status' => $status,
        ], $status);
    }
}
