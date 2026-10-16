<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'invoice_number' => $this->invoice_number,
            'student_id' => $this->student_id,
            'student_name' => $this->whenLoaded('student', fn() => $this->student->fullName()),
            'term' => $this->whenLoaded('term', fn() => $this->term->name),
            'total' => (float) $this->total,
            'paid' => (float) $this->paid,
            'balance' => (float) $this->balance,
            'status' => $this->status?->value,
            'issue_date' => $this->issue_date?->toDateString(),
            'due_date' => $this->due_date?->toDateString(),
            'items' => InvoiceItemResource::collection($this->whenLoaded('items')),
        ];
    }
}
