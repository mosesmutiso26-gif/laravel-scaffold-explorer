<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'admission_number' => $this->admission_number,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'full_name' => $this->fullName(),
            'date_of_birth' => $this->date_of_birth?->toDateString(),
            'gender' => $this->gender,
            'mode' => $this->mode,
            'status' => $this->status?->value,
            'admission_date' => $this->admission_date?->toDateString(),
            'guardians' => \App\Http\Resources\Api\V1\GuardianResource::collection($this->whenLoaded('guardians')),
            'current_class' => $this->whenLoaded('currentEnrolment', fn() => $this->currentEnrolment?->schoolClass?->name),
        ];
    }
}
