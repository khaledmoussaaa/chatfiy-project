<?php

// For Auth Response
if (!function_exists('authResponse')) {
    function authResponse($token = null, $message = null, $status = 200)
    {
        return response()->json([
            'token' => $token,
            'user_id' => auth()->user()->id,
            'message' => $message,
            'status' => $status,
            'expire_in' => auth()->factory()->getTTL(),
        ], $status);
    }
}

// For Content Response
if (!function_exists('contentResponse')) {
    function contentResponse($content, $message = null, $status = 200)
    {
        return response()->json([
            'content' => $content,
            'message' => $message,
            'status' => $status,
        ], $status);
    }
}

// For Success Response
if (!function_exists('successResponse')) {
    function successResponse($message = null, $status = 200)
    {
        return response()->json([
            'message' => $message,
            'status' => $status,
        ], $status);
    }
}

// For Failed Response
if (!function_exists('failedResponse')) {
    function failedResponse($error = null, $status = 404)
    {
        return response()->json([
            'error' => $error,
            'status' => $status,
        ], $status);
    }
}
