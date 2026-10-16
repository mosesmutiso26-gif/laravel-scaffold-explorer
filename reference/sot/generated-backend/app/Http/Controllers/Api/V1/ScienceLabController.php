<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use App\Services\LabBookingService;
use App\Models\ScienceLab;
use App\Models\ScienceEquipment;
use App\Models\ChemicalBatch;
use App\Models\PracticalLesson;
use App\Models\LabBooking;
use App\Models\ScienceStockMovement;
use App\Models\SafetyInspection;
use App\Models\LabIncident;
use App\Models\LabMaintenanceRequest;
use Illuminate\Http\Request;

class ScienceLabController extends BaseApiController
{
    public function __construct(
        private readonly LabBookingService $labService,
    ) {}

    public function dashboard()
    {
        return $this->success($this->labService->scienceLabDashboardStats());
    }

    public function labsIndex(Request $request)
    {
        $query = ScienceLab::query()->with(['technician']);
        if ($request->filled('type')) $query->where('type', $request->type);
        if ($request->filled('status')) $query->where('status', $request->status);
        return $this->paginated($query->paginate($request->per_page ?? 20));
    }

    public function labStore(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:science_labs,code',
            'building' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'type' => 'required|string|in:chemistry,biology,physics,general_science,computer',
            'capacity' => 'nullable|integer|min:1',
            'technician_id' => 'nullable|exists:staff,id',
            'opening_hours' => 'nullable|string|max:255',
            'safety_rules' => 'nullable|string',
            'required_ppe' => 'nullable|string',
            'emergency_instructions' => 'nullable|string',
            'status' => 'nullable|string|in:active,unavailable,maintenance,closed',
        ]);
        $lab = ScienceLab::create($validated);
        return $this->success($lab, 'Science lab created', 201);
    }

    public function labShow(ScienceLab $lab)
    {
        $lab->load(['technician', 'equipment', 'bookings', 'practicals', 'inspections']);
        return $this->success($lab);
    }

    public function labUpdate(Request $request, ScienceLab $lab)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'type' => 'sometimes|string|in:chemistry,biology,physics,general_science,computer',
            'capacity' => 'nullable|integer|min:1',
            'technician_id' => 'nullable|exists:staff,id',
            'status' => 'nullable|string|in:active,unavailable,maintenance,closed',
            'safety_rules' => 'nullable|string',
            'required_ppe' => 'nullable|string',
        ]);
        $lab->update($validated);
        return $this->success($lab, 'Science lab updated');
    }

    public function equipmentIndex(Request $request)
    {
        $query = ScienceEquipment::query()->with(['lab', 'supplier']);
        if ($request->filled('lab_id')) $query->where('science_lab_id', $request->lab_id);
        if ($request->filled('condition')) $query->where('condition', $request->condition);
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                  ->orWhere('item_code', 'like', "%{$request->search}%");
            });
        }
        return $this->paginated($query->paginate($request->per_page ?? 20));
    }

    public function equipmentStore(Request $request)
    {
        $validated = $request->validate([
            'science_lab_id' => 'required|exists:science_labs,id',
            'item_code' => 'required|string|max:100|unique:science_equipment,item_code',
            'name' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'quantity_available' => 'required|numeric|min:0',
            'quantity_reserved' => 'nullable|numeric|min:0',
            'quantity_damaged' => 'nullable|numeric|min:0',
            'storage_location' => 'nullable|string|max:255',
            'condition' => 'nullable|string|in:good,fair,damaged,under_repair,disposed',
            'reorder_threshold' => 'nullable|numeric|min:0',
            'supplier_id' => 'nullable|exists:suppliers,id',
            'serial_number' => 'nullable|string|max:255',
        ]);
        $equipment = ScienceEquipment::create($validated);
        return $this->success($equipment, 'Equipment created', 201);
    }

    public function chemicalBatchesIndex(Request $request)
    {
        $query = ChemicalBatch::query()->with(['equipment.lab']);
        if ($request->filled('equipment_id')) $query->where('science_equipment_id', $request->equipment_id);
        if ($request->filled('expired') && $request->boolean('expired')) {
            $query->where('expiry_date', '<', today());
        }
        if ($request->filled('approaching_expiry') && $request->boolean('approaching_expiry')) {
            $query->where('expiry_date', '>=', today())
                  ->where('expiry_date', '<=', today()->addDays(30));
        }
        return $this->paginated($query->paginate($request->per_page ?? 20));
    }

    public function chemicalBatchStore(Request $request)
    {
        $validated = $request->validate([
            'science_equipment_id' => 'required|exists:science_equipment,id',
            'batch_number' => 'required|string|max:100',
            'formula' => 'nullable|string|max:255',
            'concentration' => 'nullable|string|max:255',
            'container_size' => 'nullable|string|max:255',
            'quantity' => 'required|numeric|min:0',
            'unit_of_measure' => 'nullable|string|max:50',
            'expiry_date' => 'nullable|date',
            'supplier_id' => 'nullable|exists:suppliers,id',
            'storage_location' => 'nullable|string|max:255',
            'hazard_level' => 'nullable|string|in:low,medium,high,corrosive,flammable,toxic,restricted',
            'required_ppe' => 'nullable|string',
            'sds_reference' => 'nullable|string|max:255',
            'minimum_stock_level' => 'nullable|numeric|min:0',
            'disposal_status' => 'nullable|string|in:not_required,pending,disposed',
        ]);
        $batch = ChemicalBatch::create($validated);
        return $this->success($batch, 'Chemical batch created', 201);
    }

    public function practicalsIndex(Request $request)
    {
        $query = PracticalLesson::query()->with(['subject', 'schoolClass', 'stream', 'teacher', 'lab', 'bookings']);
        if ($request->filled('status')) $query->where('status', $request->status);
        if ($request->filled('lab_id')) $query->where('science_lab_id', $request->lab_id);
        if ($request->filled('teacher_id')) $query->where('teacher_id', $request->teacher_id);
        return $this->paginated($query->paginate($request->per_page ?? 20));
    }

    public function practicalStore(Request $request)
    {
        $validated = $request->validate([
            'subject_id' => 'required|exists:subjects,id',
            'class_id' => 'required|exists:classes,id',
            'stream_id' => 'nullable|exists:streams,id',
            'academic_year_id' => 'required|exists:academic_years,id',
            'term_id' => 'nullable|exists:terms,id',
            'teacher_id' => 'required|exists:teachers,id',
            'science_lab_id' => 'nullable|exists:science_labs,id',
            'title' => 'required|string|max:255',
            'learning_objectives' => 'nullable|string',
            'date' => 'nullable|date',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i|after:start_time',
            'safety_precautions' => 'nullable|string',
            'risk_assessment' => 'nullable|string',
            'student_grouping' => 'nullable|string',
            'expected_observations' => 'nullable|string',
            'assessment_rubric' => 'nullable|string',
            'preparation_instructions' => 'nullable|string',
        ]);
        $validated['status'] = 'draft';
        $practical = PracticalLesson::create($validated);
        return $this->success($practical, 'Practical lesson created', 201);
    }

    public function advancePracticalStatus(Request $request, int $practicalId)
    {
        $validated = $request->validate(['status' => 'required|string|in:draft,submitted,reviewed,approved,scheduled,prepared,in_progress,completed,assessed,cancelled']);
        $practical = $this->labService->advancePracticalStatus($practicalId, $validated['status']);
        return $this->success($practical, 'Practical status updated');
    }

    public function bookingsIndex(Request $request)
    {
        $query = LabBooking::query()->with(['lab', 'practicalLesson', 'bookedByUser']);
        if ($request->filled('lab_id')) $query->where('lab_id', $request->lab_id);
        if ($request->filled('status')) $query->where('status', $request->status);
        if ($request->filled('from_date')) $query->where('booking_date', '>=', $request->from_date);
        if ($request->filled('to_date')) $query->where('booking_date', '<=', $request->to_date);
        $query->orderBy('booking_date', 'desc');
        return $this->paginated($query->paginate($request->per_page ?? 20));
    }

    public function bookingStore(Request $request)
    {
        $validated = $request->validate([
            'lab_id' => 'required|exists:science_labs,id',
            'practical_lesson_id' => 'nullable|exists:practical_lessons,id',
            'booking_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'purpose' => 'nullable|string',
        ]);
        $booking = $this->labService->createScienceLabBooking(
            $validated['lab_id'],
            $request->user()->id,
            $validated['booking_date'],
            $validated['start_time'],
            $validated['end_time'],
            $validated['practical_lesson_id'] ?? null,
            $validated['purpose'] ?? null,
        );
        return $this->success($booking, 'Lab booking created', 201);
    }

    public function bookingConfirm(int $bookingId)
    {
        $booking = $this->labService->confirmScienceLabBooking($bookingId);
        return $this->success($booking, 'Booking confirmed');
    }

    public function bookingCancel(Request $request, int $bookingId)
    {
        $validated = $request->validate(['reason' => 'required|string']);
        $booking = $this->labService->cancelScienceLabBooking($bookingId, $validated['reason']);
        return $this->success($booking, 'Booking cancelled');
    }

    public function stockMovementStore(Request $request)
    {
        $validated = $request->validate([
            'science_equipment_id' => 'required|exists:science_equipment,id',
            'category' => 'required|string|in:receipt,issue,return,consumption,damage,disposal,adjustment,reservation',
            'quantity' => 'required|numeric|min:0',
            'reason' => 'nullable|string',
            'chemical_batch_id' => 'nullable|exists:chemical_batches,id',
        ]);
        $movement = $this->labService->recordStockMovement(
            $validated['science_equipment_id'],
            $validated['category'],
            (float) $validated['quantity'],
            $validated['reason'] ?? null,
            $validated['chemical_batch_id'] ?? null,
            $request->user()->id,
        );
        return $this->success($movement, 'Stock movement recorded', 201);
    }

    public function issueChemical(Request $request)
    {
        $validated = $request->validate([
            'chemical_batch_id' => 'required|exists:chemical_batches,id',
            'quantity' => 'required|numeric|min:0',
        ]);
        $movement = $this->labService->issueChemicalBatch(
            $validated['chemical_batch_id'],
            (float) $validated['quantity'],
            $request->user()->id,
        );
        return $this->success($movement, 'Chemical issued', 201);
    }

    public function practicalAttendance(Request $request, int $practicalId)
    {
        $validated = $request->validate([
            'records' => 'required|array',
            'records.*.student_id' => 'required|exists:students,id',
            'records.*.attendance_status' => 'required|string|in:present,absent,late,excused',
            'records.*.observation_marks' => 'nullable|numeric|min:0',
            'records.*.technique_marks' => 'nullable|numeric|min:0',
            'records.*.safety_marks' => 'nullable|numeric|min:0',
            'records.*.teacher_feedback' => 'nullable|string',
        ]);
        $created = $this->labService->recordPracticalAttendance($practicalId, $validated['records'], $request->user()->id);
        return $this->success($created, 'Attendance recorded', 201);
    }

    public function inspectionsIndex(Request $request)
    {
        $query = SafetyInspection::query()->with(['lab', 'findings']);
        if ($request->filled('lab_id')) $query->where('science_lab_id', $request->lab_id);
        if ($request->filled('status')) $query->where('status', $request->status);
        return $this->paginated($query->paginate($request->per_page ?? 20));
    }

    public function inspectionStore(Request $request)
    {
        $validated = $request->validate([
            'science_lab_id' => 'required|exists:science_labs,id',
            'inspector_id' => 'nullable|exists:users,id',
            'scheduled_date' => 'required|date',
            'checklist' => 'nullable|array',
            'status' => 'nullable|string|in:scheduled,in_progress,completed,overdue',
        ]);
        $inspection = SafetyInspection::create($validated);
        return $this->success($inspection, 'Safety inspection created', 201);
    }

    public function incidentsIndex(Request $request)
    {
        $query = LabIncident::query()->with(['lab']);
        if ($request->filled('lab_id')) $query->where('science_lab_id', $request->lab_id);
        if ($request->filled('status')) $query->where('status', $request->status);
        if ($request->filled('severity')) $query->where('severity', $request->severity);
        return $this->paginated($query->paginate($request->per_page ?? 20));
    }

    public function incidentStore(Request $request)
    {
        $validated = $request->validate([
            'science_lab_id' => 'required|exists:science_labs,id',
            'incident_date' => 'required|date',
            'description' => 'required|string',
            'severity' => 'required|string|in:minor,moderate,serious,critical',
            'people_involved' => 'nullable|string',
            'immediate_actions' => 'nullable|string',
            'reported_by' => 'nullable|exists:users,id',
        ]);
        $validated['status'] = 'open';
        $incident = LabIncident::create($validated);
        return $this->success($incident, 'Incident recorded', 201);
    }

    public function maintenanceIndex(Request $request)
    {
        $query = LabMaintenanceRequest::query()->with(['lab', 'equipment']);
        if ($request->filled('status')) $query->where('status', $request->status);
        return $this->paginated($query->paginate($request->per_page ?? 20));
    }

    public function maintenanceStore(Request $request)
    {
        $validated = $request->validate([
            'science_lab_id' => 'required|exists:science_labs,id',
            'science_equipment_id' => 'nullable|exists:science_equipment,id',
            'fault_description' => 'required|string',
            'priority' => 'nullable|string|in:low,medium,high,urgent',
            'reported_by' => 'nullable|exists:users,id',
        ]);
        $validated['status'] = 'reported';
        $request2 = LabMaintenanceRequest::create($validated);
        return $this->success($request2, 'Maintenance request created', 201);
    }
}
