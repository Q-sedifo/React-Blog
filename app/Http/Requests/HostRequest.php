<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'first_name' => ['required', 'string', 'max:10'],
            'last_name' => ['required', 'string', 'max:16'],
            'nickname' => ['max:10'],
            'email' => ['required', 'email', 'max:30'],
            'description' => ['required', 'string', 'max:300'],
            'avatar' => ['image:jpg, jpeg, png, gif'],
            'background' => ['image:jpg, jpeg, png, gif']
        ];
    }
}
