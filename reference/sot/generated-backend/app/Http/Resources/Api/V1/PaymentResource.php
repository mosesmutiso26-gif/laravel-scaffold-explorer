<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'reference' => $this->reference,
            'student_id' => $this->student_id,
            'student_name' => $this->whenLoaded('student', fn() => $this->student->fullName()),
            'invoice_id' => $this->invoice_id,
            'amount' => (float) $this->amount,
            'method' => $this->method?->value,
            'status' => $this->status?->value,
            'verified_at' => $this->verified_at?->toIso8601String(),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
