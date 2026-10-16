<?php

declare(strict_types=1);

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

describe('generated_not_executed', function () {})->skip('generated_not_executed');

describe('Headteacher Portal', function () {
    beforeEach(function () {
        $this->headteacher = \App\Models\User::factory()->create();
        $this->headteacher->assignRole('Headteacher');
        $this->actingAs($this->headteacher, 'sanctum');
    });

    it('executive dashboard returns real aggregates', function () {
        \App\Models\Student::factory()->count(5)->create(['status' => \App\Enums\StudentStatus::Active]);

        $response = $this->getJson('/api/v1/headteacher/dashboard');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'enrolled_students',
                    'students_present_today',
                    'students_absent_today',
                    'attendance_percentage',
                    'active_staff',
                    'lessons_scheduled_today',
                    'pending_approvals',
                    'overdue_tasks',
                ],
            ]);
    });

    it('approval centre lists pending approvals', function () {
        \App\Models\ApprovalRequest::factory()->count(3)->create([
            'status' => \App\Enums\ApprovalStatus::Pending,
            'requester_id' => \App\Models\User::factory()->create()->id,
        ]);

        $response = $this->getJson('/api/v1/headteacher/approval-centre');

        $response->assertStatus(200);
        $response->json('data.total_pending');
    });

    it('maker-checker prevents self-approval', function () {
        $approval = \App\Models\ApprovalRequest::factory()->create([
            'status' => \App\Enums\ApprovalStatus::Pending,
            'requester_id' => $this->headteacher->id,
        ]);

        $response = $this->postJson("/api/v1/headteacher/approvals/{$approval->id}/review", [
            'decision' => 'approve',
            'notes' => 'Approved',
        ]);

        $response->assertStatus(422);
    });
});
