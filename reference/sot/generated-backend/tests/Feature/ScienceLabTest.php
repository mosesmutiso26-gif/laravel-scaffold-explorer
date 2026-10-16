<?php

declare(strict_types=1);

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

describe('generated_not_executed', function () {})->skip('generated_not_executed');

describe('Science Lab Module', function () {
    beforeEach(function () {
        $this->admin = \App\Models\User::factory()->create();
        $this->admin->assignRole('Administrator');
        $this->actingAs($this->admin, 'sanctum');
    });

    it('lab booking conflict is prevented', function () {
        $lab = \App\Models\ScienceLab::factory()->create(['status' => \App\Enums\LabRoomStatus::Active]);

        \App\Models\LabBooking::create([
            'lab_id' => $lab->id,
            'booked_by' => $this->admin->id,
            'booking_date' => '2025-03-15',
            'start_time' => '09:00',
            'end_time' => '11:00',
            'status' => \App\Enums\LabBookingStatus::Confirmed,
        ]);

        $response = $this->postJson('/api/v1/lab-bookings', [
            'lab_id' => $lab->id,
            'booking_date' => '2025-03-15',
            'start_time' => '10:00',
            'end_time' => '12:00',
        ]);

        $response->assertStatus(422);
    });

    it('expired chemical cannot be issued', function () {
        $equipment = \App\Models\ScienceEquipment::factory()->create([
            'quantity_available' => 100,
        ]);

        $batch = \App\Models\ChemicalBatch::factory()->create([
            'science_equipment_id' => $equipment->id,
            'expiry_date' => today()->subDays(10),
            'hazard_level' => \App\Enums\ChemicalHazardLevel::Low,
        ]);

        $response = $this->postJson('/api/v1/chemical-batches/issue', [
            'chemical_batch_id' => $batch->id,
            'quantity' => 5,
        ]);

        $response->assertStatus(422);
    });

    it('stock movement prevents negative inventory', function () {
        $equipment = \App\Models\ScienceEquipment::factory()->create([
            'quantity_available' => 5,
        ]);

        $response = $this->postJson('/api/v1/science-stock-movements', [
            'science_equipment_id' => $equipment->id,
            'category' => 'issue',
            'quantity' => 20,
        ]);

        $response->assertStatus(422);
    });

    it('practical attendance uniqueness is enforced', function () {
        $practical = \App\Models\PracticalLesson::factory()->create();
        $student = \App\Models\Student::factory()->create();

        \App\Models\PracticalAttendance::create([
            'practical_lesson_id' => $practical->id,
            'student_id' => $student->id,
            'attendance_status' => 'present',
            'recorded_by' => $this->admin->id,
        ]);

        $response = $this->postJson("/api/v1/practical-lessons/{$practical->id}/attendance", [
            'records' => [
                [
                    'student_id' => $student->id,
                    'attendance_status' => 'present',
                ],
            ],
        ]);

        $response->assertStatus(422);
    });
});
