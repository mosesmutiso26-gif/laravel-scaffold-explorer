<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ApprovalRequest;

class ApprovalRequestFactory extends Factory
{
    protected $model = ApprovalRequest::class;

    public function definition(): array
    {
        return [
            'request_type' => fake()->randomElement([
                'timetable_adjustment', 'substitute_assignment', 'assessment_publication',
                'student_discipline', 'school_event', 'prefect_appointment',
                'boarding_exception', 'sports_event', 'parent_communication',
                'bursary_request', 'budget_request', 'staff_leave',
            ]),
            'requester_id' => \App\Models\User::factory(),
            'reason' => fake()->sentence(),
            'status' => 'pending',
        ];
    }
}
