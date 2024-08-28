<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class EditProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $userId = $this->route('user');

        return [
            // Edit Profile Validations
            'media' => 'sometimes|image',
            'name' => 'required|string|min:3|max:30',
            'email' => 'required|email|unique:users,email,' . $userId->id,
            'phone' => 'required|unique:users,phone,'  . $userId->id,
        ];
    }
}
