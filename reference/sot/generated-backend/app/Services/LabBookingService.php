<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\LabBooking;
use App\Models\ComputerLabBooking;
use App\Models\ScienceLab;
use App\Models\ComputerLab;
use App\Models\ScienceEquipment;
use App\Models\ChemicalBatch;
use App\Models\ScienceStockMovement;
use App\Models\PracticalLesson;
use App\Models\PracticalAttendance;
use App\Models\SafetyInspection;
use App\Models\LabIncident;
use App\Models\LabMaintenanceRequest;
use App\Models\Workstation;
use App\Models\TechnicalTicket;
use App\Models\IctAsset;
use App\Models\AssetAudit;
use App\Enums\LabBookingStatus;
use App\Enums\PracticalStatus;
use App\Enums\StockMovementCategory;
use App\Enums\EquipmentCondition;
use App\Enums\ChemicalHazardLevel;
use App\Enums\LabRoomStatus;
use App\Enums\IctDeviceStatus;
use App\Enums\WorkstationStatus;
use App\Enums\TechnicalTicketStatus;
use App\Enums\TechnicalTicketPriority;
use App\Exceptions\BusinessRuleException;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class LabBookingService
{
    public function createScienceLabBooking(int $labId, int $bookedBy, string $bookingDate, string $startTime, string $endTime, ?int $practicalLessonId = null, ?string $purpose = null): LabBooking
    {
        $lab = ScienceLab::findOrFail($labId);

        if ($lab->status === LabRoomStatus::Closed || $lab->status === LabRoomStatus::Maintenance) {
            throw new BusinessRuleException("Laboratory '{$lab->name}' is not available for booking.");
        }

        $booking = new LabBooking([
            'lab_id' => $labId,
            'practical_lesson_id' => $practicalLessonId,
            'booked_by' => $bookedBy,
            'booking_date' => $bookingDate,
            'start_time' => $startTime,
            'end_time' => $endTime,
            'purpose' => $purpose,
            'status' => LabBookingStatus::Pending,
        ]);

        if ($booking->hasConflict()) {
            throw new BusinessRuleException('A confirmed booking already exists for this lab on the requested date and time.');
        }

        $booking->save();
        return $booking;
    }

    public function confirmScienceLabBooking(int $bookingId): LabBooking
    {
        $booking = LabBooking::findOrFail($bookingId);

        if ($booking->status !== LabBookingStatus::Pending) {
            throw new BusinessRuleException('Only pending bookings can be confirmed.');
        }

        if ($booking->hasConflict()) {
            throw new BusinessRuleException('A conflict was detected before confirmation. Another confirmed booking overlaps.');
        }

        $booking->update(['status' => LabBookingStatus::Confirmed]);
        return $booking->fresh();
    }

    public function cancelScienceLabBooking(int $bookingId, string $reason): LabBooking
    {
        $booking = LabBooking::findOrFail($bookingId);
        $booking->update([
            'status' => LabBookingStatus::Cancelled,
            'cancellation_reason' => $reason,
        ]);
        return $booking->fresh();
    }

    public function createComputerLabBooking(int $labId, int $bookedBy, string $bookingDate, string $startTime, string $endTime, int $expectedStudents, int $requiredWorkstations, ?int $classId = null, ?string $subject = null): ComputerLabBooking
    {
        $lab = ComputerLab::findOrFail($labId);

        if ($lab->status === LabRoomStatus::Closed || $lab->status === LabRoomStatus::Maintenance) {
            throw new BusinessRuleException("Computer lab '{$lab->name}' is not available for booking.");
        }

        $operationalCount = $lab->getOperationalWorkstationCount();
        if ($requiredWorkstations > $operationalCount) {
            throw new BusinessRuleException("Requested {$requiredWorkstations} workstations but only {$operationalCount} operational workstations are available.");
        }

        $booking = new ComputerLabBooking([
            'computer_lab_id' => $labId,
            'booked_by' => $bookedBy,
            'class_id' => $classId,
            'subject' => $subject,
            'booking_date' => $bookingDate,
            'start_time' => $startTime,
            'end_time' => $endTime,
            'expected_students' => $expectedStudents,
            'required_workstations' => $requiredWorkstations,
            'status' => LabBookingStatus::Pending,
        ]);

        if ($booking->hasConflict()) {
            throw new BusinessRuleException('A confirmed booking already exists for this computer lab on the requested date and time.');
        }

        $booking->save();
        return $booking;
    }

    public function confirmComputerLabBooking(int $bookingId): ComputerLabBooking
    {
        $booking = ComputerLabBooking::findOrFail($bookingId);

        if ($booking->status !== LabBookingStatus::Pending) {
            throw new BusinessRuleException('Only pending bookings can be confirmed.');
        }

        if ($booking->hasConflict()) {
            throw new BusinessRuleException('A conflict was detected before confirmation.');
        }

        $booking->update(['status' => LabBookingStatus::Confirmed]);
        return $booking->fresh();
    }

    public function cancelComputerLabBooking(int $bookingId, string $reason): ComputerLabBooking
    {
        $booking = ComputerLabBooking::findOrFail($bookingId);
        $booking->update([
            'status' => LabBookingStatus::Cancelled,
            'cancellation_reason' => $reason,
        ]);
        return $booking->fresh();
    }

    public function advancePracticalStatus(int $practicalId, string $targetStatus): PracticalLesson
    {
        $practical = PracticalLesson::findOrFail($practicalId);
        $target = PracticalStatus::from($targetStatus);

        if ($target === PracticalStatus::Completed) {
            $booking = $practical->bookings()->where('status', LabBookingStatus::Confirmed)->first();
            if (!$booking) {
                throw new BusinessRuleException('Practical cannot be completed without a confirmed lab booking.');
            }
        }

        $practical->update(['status' => $target]);
        return $practical->fresh();
    }

    public function recordStockMovement(int $equipmentId, string $category, float $quantity, ?string $reason = null, ?int $batchId = null, int $userId = null): ScienceStockMovement
    {
        $equipment = ScienceEquipment::findOrFail($equipmentId);

        return DB::transaction(function () use ($equipment, $category, $quantity, $reason, $batchId, $userId): ScienceStockMovement {
            $current = (float) $equipment->quantity_available;
            $reserved = (float) ($equipment->quantity_reserved ?? 0);

            $newQuantity = match (StockMovementCategory::from($category)) {
                StockMovementCategory::Receipt => $current + $quantity,
                StockMovementCategory::Issue, StockMovementCategory::Consumption, StockMovementCategory::Damage, StockMovementCategory::Disposal => $current - $quantity,
                StockMovementCategory::Return => $current + $quantity,
                StockMovementCategory::Adjustment => $quantity,
                StockMovementCategory::Reservation => $current,
            };

            if ($newQuantity < 0) {
                throw new BusinessRuleException('Stock movement would result in negative inventory.');
            }

            $movement = ScienceStockMovement::create([
                'science_equipment_id' => $equipmentId,
                'chemical_batch_id' => $batchId,
                'category' => StockMovementCategory::from($category),
                'quantity' => $quantity,
                'balance_after' => $newQuantity,
                'reason' => $reason,
                'recorded_by' => $userId,
            ]);

            $equipment->update(['quantity_available' => $newQuantity]);

            return $movement;
        });
    }

    public function issueChemicalBatch(int $batchId, float $quantity, int $userId): ScienceStockMovement
    {
        $batch = ChemicalBatch::findOrFail($batchId);

        if ($batch->isExpired()) {
            throw new BusinessRuleException('Expired chemicals cannot be issued for practical use.');
        }

        if ($batch->hazard_level === ChemicalHazardLevel::Restricted) {
            throw new BusinessRuleException('Restricted chemicals require special authorization for issue.');
        }

        return $this->recordStockMovement($batch->science_equipment_id, 'issue', $quantity, "Issued from batch {$batch->batch_number}", $batchId, $userId);
    }

    public function recordPracticalAttendance(int $practicalId, array $records, int $recordedBy): array
    {
        $created = [];

        DB::transaction(function () use ($practicalId, $records, $recordedBy, &$created): void {
            foreach ($records as $record) {
                $existing = PracticalAttendance::where('practical_lesson_id', $practicalId)
                    ->where('student_id', $record['student_id'])
                    ->exists();

                if ($existing) {
                    throw new BusinessRuleException("Attendance already recorded for student {$record['student_id']} in this practical.");
                }

                $created[] = PracticalAttendance::create([
                    'practical_lesson_id' => $practicalId,
                    'student_id' => $record['student_id'],
                    'attendance_status' => $record['attendance_status'],
                    'observation_marks' => $record['observation_marks'] ?? null,
                    'technique_marks' => $record['technique_marks'] ?? null,
                    'safety_marks' => $record['safety_marks'] ?? null,
                    'teacher_feedback' => $record['teacher_feedback'] ?? null,
                    'recorded_by' => $recordedBy,
                ]);
            }
        });

        return $created;
    }

    public function createTechnicalTicket(int $workstationId, int $reportedBy, string $description, string $priority = 'medium', ?int $deviceId = null): TechnicalTicket
    {
        $workstation = Workstation::findOrFail($workstationId);

        $ticket = TechnicalTicket::create([
            'workstation_id' => $workstationId,
            'ict_asset_id' => $deviceId,
            'reported_by' => $reportedBy,
            'description' => $description,
            'priority' => TechnicalTicketPriority::from($priority),
            'status' => TechnicalTicketStatus::Open,
        ]);

        if ($priority === 'critical') {
            $workstation->update(['device_status' => IctDeviceStatus::Faulty]);
        }

        return $ticket;
    }

    public function advanceTicketStatus(int $ticketId, string $targetStatus, ?int $assignedTo = null): TechnicalTicket
    {
        $ticket = TechnicalTicket::findOrFail($ticketId);
        $target = TechnicalTicketStatus::from($targetStatus);

        if ($target === TechnicalTicketStatus::Resolved) {
            if ($ticket->workstation) {
                $ticket->workstation->update([
                    'device_status' => IctDeviceStatus::Operational,
                    'workstation_status' => WorkstationStatus::Available,
                ]);
            }
        }

        $updateData = ['status' => $target];
        if ($assignedTo) $updateData['assigned_to'] = $assignedTo;

        $ticket->update($updateData);
        return $ticket->fresh();
    }

    public function scienceLabDashboardStats(): array
    {
        return [
            'total_labs' => ScienceLab::count(),
            'available_labs' => ScienceLab::where('status', LabRoomStatus::Active)->count(),
            'occupied_labs' => LabBooking::where('status', LabBookingStatus::Confirmed)
                ->where('booking_date', today())->distinct('lab_id')->count(),
            'upcoming_practicals' => PracticalLesson::whereIn('status', [PracticalStatus::Approved, PracticalStatus::Scheduled])
                ->whereHas('bookings', fn($q) => $q->where('booking_date', '>=', today()))->count(),
            'awaiting_preparation' => PracticalLesson::where('status', PracticalStatus::Scheduled)->count(),
            'equipment_good' => ScienceEquipment::where('condition', EquipmentCondition::Good)->count(),
            'equipment_damaged' => ScienceEquipment::where('condition', EquipmentCondition::Damaged)->count(),
            'equipment_under_repair' => ScienceEquipment::where('condition', EquipmentCondition::UnderRepair)->count(),
            'low_stock_items' => ScienceEquipment::whereColumn('quantity_available', '<=', 'reorder_threshold')->count(),
            'expired_chemicals' => ChemicalBatch::where('expiry_date', '<', today())->count(),
            'approaching_expiry' => ChemicalBatch::where('expiry_date', '>=', today())
                ->where('expiry_date', '<=', today()->addDays(30))->count(),
            'overdue_inspections' => SafetyInspection::where('status', 'overdue')->count(),
            'open_incidents' => LabIncident::whereIn('status', ['open', 'under_review', 'action_assigned'])->count(),
            'maintenance_requests' => LabMaintenanceRequest::whereNotIn('status', ['closed', 'verified'])->count(),
        ];
    }

    public function computerLabDashboardStats(): array
    {
        return [
            'total_labs' => ComputerLab::count(),
            'available_labs' => ComputerLab::where('status', LabRoomStatus::Active)->count(),
            'total_workstations' => Workstation::count(),
            'operational_workstations' => Workstation::where('device_status', IctDeviceStatus::Operational)->count(),
            'faulty_devices' => Workstation::where('device_status', IctDeviceStatus::Faulty)->count(),
            'under_repair_devices' => Workstation::where('device_status', IctDeviceStatus::UnderRepair)->count(),
            'upcoming_lessons' => \App\Models\ComputerPractical::whereIn('status', [PracticalStatus::Approved, PracticalStatus::Scheduled])->count(),
            'open_tickets' => TechnicalTicket::whereNotIn('status', [TechnicalTicketStatus::Closed, TechnicalTicketStatus::Verified])->count(),
            'critical_tickets' => TechnicalTicket::where('priority', TechnicalTicketPriority::Critical)
                ->whereNotIn('status', [TechnicalTicketStatus::Closed, TechnicalTicketStatus::Verified])->count(),
            'pending_audits' => AssetAudit::whereNotIn('status', ['completed', 'reconciled'])->count(),
        ];
    }
}
