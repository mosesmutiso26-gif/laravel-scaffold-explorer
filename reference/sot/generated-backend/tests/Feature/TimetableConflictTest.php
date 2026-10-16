<?php

// generated_not_executed — Copilot must run these tests in a real Laravel installation

use App\Models\TimetableVersion;
use App\Models\TimetableEntry;
use App\Models\SchoolClass;
use App\Models\Subject;
use App\Models\Room;
use App\Models\AcademicYear;
use App\Services\TimetableConflictService;
use App\Enums\TimetableVersionStatus;
use App\Exceptions\BusinessRuleException;

test('detects teacher conflict', function () {
    $year = AcademicYear::factory()->create();
    $version = TimetableVersion::create(['academic_year_id' => $year->id, 'version_label' => 'Test', 'status' => TimetableVersionStatus::Draft, 'created_by' => 1]);
    $class = SchoolClass::create(['academic_year_id' => $year->id, 'name' => 'Form 1', 'level' => 'Secondary', 'capacity' => 40]);
    $subject = Subject::create(['name' => 'Math', 'code' => 'MAT10', 'is_compulsory' => true]);
    $teacher = \App\Models\Teacher::factory()->create();
    $room = Room::create(['name' => 'R1', 'capacity' => 30, 'type' => 'Classroom', 'status' => 'Available']);
    TimetableEntry::create(['version_id' => $version->id, 'day_of_week' => 'Monday', 'period' => 'P1', 'start_time' => '08:00', 'end_time' => '08:40', 'class_id' => $class->id, 'subject_id' => $subject->id, 'teacher_id' => $teacher->id, 'room_id' => $room->id]);
    $class2 = SchoolClass::create(['academic_year_id' => $year->id, 'name' => 'Form 2', 'level' => 'Secondary', 'capacity' => 40]);
    $subject2 = Subject::create(['name' => 'Eng', 'code' => 'ENG10', 'is_compulsory' => true]);
    $room2 = Room::create(['name' => 'R2', 'capacity' => 30, 'type' => 'Classroom', 'status' => 'Available']);
    TimetableEntry::create(['version_id' => $version->id, 'day_of_week' => 'Monday', 'period' => 'P1', 'start_time' => '08:00', 'end_time' => '08:40', 'class_id' => $class2->id, 'subject_id' => $subject2->id, 'teacher_id' => $teacher->id, 'room_id' => $room2->id]);
    $service = app(TimetableConflictService::class);
    $conflicts = $service->detectConflicts($version);
    expect($conflicts)->toHaveCount(2); // teacher + class conflict for same teacher
});

test('cannot publish version with hard conflicts', function () {
    $year = AcademicYear::factory()->create();
    $version = TimetableVersion::create(['academic_year_id' => $year->id, 'version_label' => 'Test', 'status' => TimetableVersionStatus::Draft, 'created_by' => 1]);
    $class = SchoolClass::create(['academic_year_id' => $year->id, 'name' => 'Form 1', 'level' => 'Secondary', 'capacity' => 40]);
    $subject = Subject::create(['name' => 'Math', 'code' => 'MAT11', 'is_compulsory' => true]);
    $teacher = \App\Models\Teacher::factory()->create();
    TimetableEntry::create(['version_id' => $version->id, 'day_of_week' => 'Monday', 'period' => 'P1', 'start_time' => '08:00', 'end_time' => '08:40', 'class_id' => $class->id, 'subject_id' => $subject->id, 'teacher_id' => $teacher->id]);
    $class2 = SchoolClass::create(['academic_year_id' => $year->id, 'name' => 'Form 2', 'level' => 'Secondary', 'capacity' => 40]);
    $subject2 = Subject::create(['name' => 'Eng', 'code' => 'ENG11', 'is_compulsory' => true]);
    TimetableEntry::create(['version_id' => $version->id, 'day_of_week' => 'Monday', 'period' => 'P1', 'start_time' => '08:00', 'end_time' => '08:40', 'class_id' => $class2->id, 'subject_id' => $subject2->id, 'teacher_id' => $teacher->id]);
    $service = app(TimetableConflictService::class);
    expect(fn() => $service->publishDraft($version))->toThrow(BusinessRuleException::class);
});

test('can publish conflict-free version', function () {
    $year = AcademicYear::factory()->create();
    $version = TimetableVersion::create(['academic_year_id' => $year->id, 'version_label' => 'Test', 'status' => TimetableVersionStatus::Draft, 'created_by' => 1]);
    $service = app(TimetableConflictService::class);
    $published = $service->publishDraft($version);
    expect($published->status)->toBe(TimetableVersionStatus::Published);
});
