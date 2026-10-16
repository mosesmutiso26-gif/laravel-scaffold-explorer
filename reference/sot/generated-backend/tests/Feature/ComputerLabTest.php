<?php

declare(strict_types=1);

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

describe('generated_not_executed', function () {})->skip('generated_not_executed');

describe('Computer Lab Module', function () {
    beforeEach(function () {
        $this->admin = \App\Models\User::factory()->create();
        $this->admin->assignRole('Administrator');
        $this->actingAs($this->admin, 'sanctum');
    });

    it('computer lab booking conflict is prevented', function () {
        $lab = \App\Models\ComputerLab::factory()->create(['status' => \App\Enums\LabRoomStatus::Active]);

        \App\Models\ComputerLabBooking::create([
            'computer_lab_id' => $lab->id,
            'booked_by' => $this->admin->id,
            'booking_date' => '2025-03-20',
            'start_time' => '09:00',
            'end_time' => '11:00',
            'expected_students' => 20,
            'required_workstations' => 20,
            'status' => \App\Enums\LabBookingStatus::Confirmed,
        ]);

        $response = $this->postJson('/api/v1/computer-lab-bookings', [
            'computer_lab_id' => $lab->id,
            'booking_date' => '2025-03-20',
            'start_time' => '10:00',
            'end_time' => '12:00',
            'expected_students' => 15,
            'required_workstations' => 15,
        ]);

        $response->assertStatus(422);
    });

    it('booking capacity validated against operational workstations', function () {
        $lab = \App\Models\ComputerLab::factory()->create(['status' => \App\Enums\LabRoomStatus::Active]);

        \App\Models\Workstation::factory()->count(10)->create([
            'computer_lab_id' => $lab->id,
            'device_status' => \App\Enums\IctDeviceStatus::Operational,
            'workstation_status' => \App\Enums\WorkstationStatus::Available,
        ]);

        $response = $this->postJson('/api/v1/computer-lab-bookings', [
            'computer_lab_id' => $lab->id,
            'booking_date' => '2025-03-25',
            'start_time' => '09:00',
            'end_time' => '11:00',
            'expected_students' => 50,
            'required_workstations' => 50,
        ]);

        $response->assertStatus(422);
    });

    it('technical ticket lifecycle advances correctly', function () {
        $workstation = \App\Models\Workstation::factory()->create([
            'device_status' => \App\Enums\IctDeviceStatus::Operational,
            'workstation_status' => \App\Enums\WorkstationStatus::Available,
        ]);

        $ticket = \App\Models\TechnicalTicket::factory()->create([
            'workstation_id' => $workstation->id,
            'reported_by' => $this->admin->id,
            'status' => \App\Enums\TechnicalTicketStatus::Open,
            'priority' => \App\Enums\TechnicalTicketPriority::Medium,
        ]);

        $response = $this->postJson("/api/v1/technical-tickets/{$ticket->id}/advance", [
            'status' => 'resolved',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('technical_tickets', [
            'id' => $ticket->id,
            'status' => 'resolved',
        ]);
    });
});
