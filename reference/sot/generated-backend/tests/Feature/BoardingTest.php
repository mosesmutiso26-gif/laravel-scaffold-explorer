<?php

// generated_not_executed — Copilot must run these tests in a real Laravel installation

use App\Models\BoardingHouse;
use App\Models\Bed;
use App\Models\BoardingPlacement;
use App\Models\Student;
use App\Services\BoardingService;
use App\Enums\BoardingPlacementStatus;
use App\Enums\BedStatus;
use App\Exceptions\BusinessRuleException;

test('can place student in vacant bed', function () {
    $house = BoardingHouse::factory()->create();
    $dorm = $house->dormitories()->create(['name' => 'Block 1', 'capacity' => 30]);
    $room = $dorm->rooms()->create(['name' => 'Room 1', 'capacity' => 8]);
    $bed = $room->beds()->create(['label' => 'B1', 'status' => BedStatus::Vacant->value]);
    $student = Student::factory()->create();
    $service = app(BoardingService::class);
    $placement = $service->placeStudent($student->id, $bed->id, 1, now()->toDateString());
    expect($placement->status)->toBe(BoardingPlacementStatus::Active);
    expect($bed->fresh()->status)->toBe(BedStatus::Occupied);
});

test('cannot place student in occupied bed', function () {
    $house = BoardingHouse::factory()->create();
    $dorm = $house->dormitories()->create(['name' => 'Block 1', 'capacity' => 30]);
    $room = $dorm->rooms()->create(['name' => 'Room 1', 'capacity' => 8]);
    $bed = $room->beds()->create(['label' => 'B1', 'status' => BedStatus::Occupied->value]);
    $student = Student::factory()->create();
    $service = app(BoardingService::class);
    expect(fn() => $service->placeStudent($student->id, $bed->id, 1, now()->toDateString()))
        ->toThrow(BusinessRuleException::class);
});

test('cannot double-enrol a student in boarding', function () {
    $house = BoardingHouse::factory()->create();
    $dorm = $house->dormitories()->create(['name' => 'Block 1', 'capacity' => 30]);
    $room = $dorm->rooms()->create(['name' => 'Room 1', 'capacity' => 8]);
    $bed1 = $room->beds()->create(['label' => 'B1', 'status' => BedStatus::Vacant->value]);
    $bed2 = $room->beds()->create(['label' => 'B2', 'status' => BedStatus::Vacant->value]);
    $student = Student::factory()->create();
    $service = app(BoardingService::class);
    $service->placeStudent($student->id, $bed1->id, 1, now()->toDateString());
    expect(fn() => $service->placeStudent($student->id, $bed2->id, 1, now()->toDateString()))
        ->toThrow(BusinessRuleException::class);
});

test('roll call auto-populates from active placements', function () {
    $house = BoardingHouse::factory()->create();
    $dorm = $house->dormitories()->create(['name' => 'Block 1', 'capacity' => 30]);
    $room = $dorm->rooms()->create(['name' => 'Room 1', 'capacity' => 8]);
    $bed = $room->beds()->create(['label' => 'B1', 'status' => BedStatus::Vacant->value]);
    $student = Student::factory()->create();
    $service = app(BoardingService::class);
    $service->placeStudent($student->id, $bed->id, 1, now()->toDateString());
    $rollCall = $service->startRollCall($house->id, now()->toDateString(), 1);
    expect($rollCall->entries)->toHaveCount(1);
    expect($rollCall->entries->first()->student_id)->toBe($student->id);
});
