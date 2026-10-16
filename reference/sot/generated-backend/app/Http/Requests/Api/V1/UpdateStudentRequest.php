<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStudentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'first_name' => ['sometimes', 'string', 'max:100'],
            'last_name' => ['sometimes', 'string', 'max:100'],
            'date_of_birth' => ['sometimes', 'date'],
            'mode' => ['sometimes', 'in:Day,Boarding'],
            'status' => ['sometimes', 'string'],
            'exit_date' => ['nullable', 'date'],
            'exit_reason' => ['nullable', 'string'],
        ];
    }
}
