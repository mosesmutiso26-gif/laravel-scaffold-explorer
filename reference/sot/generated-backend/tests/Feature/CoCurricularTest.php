<?php

declare(strict_types=1);

namespace App;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

describe('generated_not_executed', function () {})->skip('generated_not_executed');

describe('Co-Curricular Module', function () {
    beforeEach(function () {
        $this->admin = \App\Models\User::factory()->create();
        $this->admin->assignRole('Administrator');
        $this->actingAs($this->admin, 'sanctum');
    });

    it('student can apply for club membership', function () {
        $club = \App\Models\Club::factory()->create(['status' => \App\Enums\ClubStatus::Active, 'membership_capacity' => 50]);
        $student = \App\Models\Student::factory()->create();

        $response = $this->postJson("/api/v1/clubs/{$club->id}/apply", [
            'student_id' => $student->id,
            'application_reason' => 'Interested in science',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('club_memberships', [
            'club_id' => $club->id,
            'student_id' => $student->id,
            'status' => 'applied',
        ]);
    });

    it('duplicate active membership is prevented', function () {
        $club = \App\Models\Club::factory()->create(['status' => \App\Enums\ClubStatus::Active, 'membership_capacity' => 50]);
        $student = \App\Models\Student::factory()->create();

        \App\Models\ClubMembership::create([
            'club_id' => $club->id,
            'student_id' => $student->id,
            'status' => \App\Enums\MembershipStatus::Active,
            'applied_at' => now(),
        ]);

        $response = $this->postJson("/api/v1/clubs/{$club->id}/apply", [
            'student_id' => $student->id,
        ]);

        $response->assertStatus(422);
    });

    it('membership approval works', function () {
        $club = \App\Models\Club::factory()->create(['status' => \App\Enums\ClubStatus::Active, 'membership_capacity' => 50]);
        $student = \App\Models\Student::factory()->create();
        $membership = \App\Models\ClubMembership::create([
            'club_id' => $club->id,
            'student_id' => $student->id,
            'status' => \App\Enums\MembershipStatus::Applied,
            'applied_at' => now(),
        ]);

        $response = $this->postJson("/api/v1/memberships/{$membership->id}/approve");

        $response->assertStatus(200);
        $this->assertDatabaseHas('club_memberships', [
            'id' => $membership->id,
            'status' => 'active',
        ]);
    });

    it('club capacity enforces waitlisting', function () {
        $club = \App\Models\Club::factory()->create(['status' => \App\Enums\ClubStatus::Active, 'membership_capacity' => 1]);
        $student1 = \App\Models\Student::factory()->create();
        $student2 = \App\Models\Student::factory()->create();

        \App\Models\ClubMembership::create([
            'club_id' => $club->id,
            'student_id' => $student1->id,
            'status' => \App\Enums\MembershipStatus::Active,
            'applied_at' => now(),
            'approved_at' => now(),
            'start_date' => now(),
            'approved_by' => $this->admin->id,
        ]);

        $membership2 = \App\Models\ClubMembership::create([
            'club_id' => $club->id,
            'student_id' => $student2->id,
            'status' => \App\Enums\MembershipStatus::Applied,
            'applied_at' => now(),
        ]);

        $response = $this->postJson("/api/v1/memberships/{$membership2->id}/approve");

        $response->assertStatus(200);
        $this->assertDatabaseHas('club_memberships', [
            'id' => $membership2->id,
            'status' => 'waitlisted',
        ]);
    });
});
