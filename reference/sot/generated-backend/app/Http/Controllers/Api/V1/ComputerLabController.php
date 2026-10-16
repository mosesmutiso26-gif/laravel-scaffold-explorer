<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use App\Services\LabBookingService;
use App\Models\ComputerLab;
use App\Models\Workstation;
use App\Models\IctAsset;
use App\Models\SoftwareProduct;
use App\Models\SoftwareLicence;
use App\Models\SoftwareInstallation;
use App\Models\ComputerLabBooking;
use App\Models\ComputerPractical;
use App\Models\WorkstationAssignment;
use App\Models\TechnicalTicket;
use App\Models\AssetAudit;
use Illuminate\Http\Request;

class ComputerLabController extends BaseApiController
{
    public function __construct(
        private readonly LabBookingService $labService,
    ) {}

    public function dashboard()
    {
        return $this->success($this->labService->computerLabDashboardStats());
    }

    public function labsIndex(Request $request)
    {
        $query = ComputerLab::query()->with(['technician']);
        if ($request->filled('status')) $query->where('status', $request->status);
        return $this->paginated($query->paginate($request->per_page ?? 20));
    }

    public function labStore(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:computer_labs,code',
            'building' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'capacity' => 'nullable|integer|min:1',
            'technician_id' => 'nullable|exists:staff,id',
            'status' => 'nullable|string|in:active,unavailable,maintenance,closed',
        ]);
        $lab = ComputerLab::create($validated);
        return $this->success($lab, 'Computer lab created', 201);
    }

    public function labShow(ComputerLab $lab)
    {
        $lab->load(['technician', 'workstations', 'bookings']);
        return $this->success($lab);
    }

    public function labUpdate(Request $request, ComputerLab $lab)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'capacity' => 'nullable|integer|min:1',
            'technician_id' => 'nullable|exists:staff,id',
            'status' => 'nullable|string|in:active,unavailable,maintenance,closed',
        ]);
        $lab->update($validated);
        return $this->success($lab, 'Computer lab updated');
    }

    public function workstationsIndex(Request $request)
    {
        $query = Workstation::query()->with(['computerLab', 'ictAsset']);
        if ($request->filled('computer_lab_id')) $query->where('computer_lab_id', $request->computer_lab_id);
        if ($request->filled('status')) $query->where('workstation_status', $request->status);
        if ($request->filled('device_status')) $query->where('device_status', $request->device_status);
        return $this->paginated($query->paginate($request->per_page ?? 20));
    }

    public function workstationStore(Request $request)
    {
        $validated = $request->validate([
            'computer_lab_id' => 'required|exists:computer_labs,id',
            'workstation_number' => 'required|string|max:50',
            'ict_asset_id' => 'nullable|exists:ict_assets,id',
            'device_status' => 'nullable|string|in:operational,faulty,under_repair,decommissioned,missing',
            'workstation_status' => 'nullable|string|in:available,assigned,unavailable',
        ]);
        $workstation = Workstation::create($validated);
        return $this->success($workstation, 'Workstation created', 201);
    }

    public function workstationUpdate(Request $request, Workstation $workstation)
    {
        $validated = $request->validate([
            'device_status' => 'nullable|string|in:operational,faulty,under_repair,decommissioned,missing',
            'workstation_status' => 'nullable|string|in:available,assigned,unavailable',
            'ict_asset_id' => 'nullable|exists:ict_assets,id',
        ]);
        $workstation->update($validated);
        return $this->success($workstation, 'Workstation updated');
    }

    public function ictAssetsIndex(Request $request)
    {
        $query = IctAsset::query()->with(['workstation.computerLab']);
        if ($request->filled('device_type')) $query->where('device_type', $request->device_type);
        if ($request->filled('condition')) $query->where('condition', $request->condition);
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('asset_tag', 'like', "%{$request->search}%")
                  ->orWhere('serial_number', 'like', "%{$request->search}%")
                  ->orWhere('manufacturer', 'like', "%{$request->search}%");
            });
        }
        return $this->paginated($query->paginate($request->per_page ?? 20));
    }

    public function ictAssetStore(Request $request)
    {
        $validated = $request->validate([
            'asset_tag' => 'required|string|max:100|unique:ict_assets,asset_tag',
            'serial_number' => 'nullable|string|max:255|unique:ict_assets,serial_number',
            'device_type' => 'required|string|in:desktop,laptop,projector,printer,router,switch,other',
            'manufacturer' => 'nullable|string|max:255',
            'model' => 'nullable|string|max:255',
            'processor' => 'nullable|string|max:255',
            'ram_gb' => 'nullable|integer|min:0',
            'storage_gb' => 'nullable|integer|min:0',
            'operating_system' => 'nullable|string|max:255',
            'hostname' => 'nullable|string|max:255',
            'condition' => 'nullable|string|in:good,fair,damaged,under_repair,disposed',
            'warranty_expiry' => 'nullable|date',
        ]);
        $asset = IctAsset::create($validated);
        return $this->success($asset, 'ICT asset created', 201);
    }

    public function softwareProductsIndex(Request $request)
    {
        $query = SoftwareProduct::query()->with(['licences', 'installations']);
        if ($request->filled('category')) $query->where('category', $request->category);
        return $this->paginated($query->paginate($request->per_page ?? 20));
    }

    public function softwareProductStore(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'version' => 'nullable|string|max:100',
            'category' => 'nullable|string|in:operating_system,productivity,development,educational,security,utility,other',
            'supported_os' => 'nullable|string',
            'installation_requirements' => 'nullable|string',
            'owner_department' => 'nullable|string|max:255',
        ]);
        $product = SoftwareProduct::create($validated);
        return $this->success($product, 'Software product created', 201);
    }

    public function softwareLicencesIndex(Request $request)
    {
        $query = SoftwareLicence::query()->with(['product']);
        if ($request->filled('product_id')) $query->where('software_product_id', $request->product_id);
        if ($request->filled('licence_type')) $query->where('licence_type', $request->licence_type);
        return $this->paginated($query->paginate($request->per_page ?? 20));
    }

    public function softwareLicenceStore(Request $request)
    {
        $validated = $request->validate([
            'software_product_id' => 'required|exists:software_products,id',
            'licence_type' => 'required|string|in:perpetual,subscription,open_source,volume,oem',
            'licence_count' => 'required|integer|min:1',
            'renewal_date' => 'nullable|date',
            'expiry_date' => 'nullable|date',
            'responsible_department' => 'nullable|string|max:255',
            'compliance_notes' => 'nullable|string',
        ]);
        $licence = SoftwareLicence::create($validated);
        return $this->success($licence, 'Software licence created', 201);
    }

    public function bookingsIndex(Request $request)
    {
        $query = ComputerLabBooking::query()->with(['computerLab', 'bookedByUser', 'schoolClass']);
        if ($request->filled('computer_lab_id')) $query->where('computer_lab_id', $request->computer_lab_id);
        if ($request->filled('status')) $query->where('status', $request->status);
        if ($request->filled('from_date')) $query->where('booking_date', '>=', $request->from_date);
        if ($request->filled('to_date')) $query->where('booking_date', '<=', $request->to_date);
        $query->orderBy('booking_date', 'desc');
        return $this->paginated($query->paginate($request->per_page ?? 20));
    }

    public function bookingStore(Request $request)
    {
        $validated = $request->validate([
            'computer_lab_id' => 'required|exists:computer_labs,id',
            'class_id' => 'nullable|exists:classes,id',
            'subject' => 'nullable|string|max:255',
            'booking_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'expected_students' => 'required|integer|min:1',
            'required_workstations' => 'required|integer|min:1',
            'software_requirements' => 'nullable|string',
            'hardware_requirements' => 'nullable|string',
            'accessibility_requirements' => 'nullable|string',
        ]);
        $booking = $this->labService->createComputerLabBooking(
            $validated['computer_lab_id'],
            $request->user()->id,
            $validated['booking_date'],
            $validated['start_time'],
            $validated['end_time'],
            $validated['expected_students'],
            $validated['required_workstations'],
            $validated['class_id'] ?? null,
            $validated['subject'] ?? null,
        );
        return $this->success($booking, 'Computer lab booking created', 201);
    }

    public function bookingConfirm(int $bookingId)
    {
        $booking = $this->labService->confirmComputerLabBooking($bookingId);
        return $this->success($booking, 'Booking confirmed');
    }

    public function bookingCancel(Request $request, int $bookingId)
    {
        $validated = $request->validate(['reason' => 'required|string']);
        $booking = $this->labService->cancelComputerLabBooking($bookingId, $validated['reason']);
        return $this->success($booking, 'Booking cancelled');
    }

    public function practicalsIndex(Request $request)
    {
        $query = ComputerPractical::query()->with(['subject', 'schoolClass', 'teacher', 'lab']);
        if ($request->filled('status')) $query->where('status', $request->status);
        if ($request->filled('lab_id')) $query->where('computer_lab_id', $request->lab_id);
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
            'computer_lab_id' => 'nullable|exists:computer_labs,id',
            'title' => 'required|string|max:255',
            'learning_objectives' => 'nullable|string',
            'instructions' => 'nullable|string',
            'required_software' => 'nullable|string',
            'assessment_rubric' => 'nullable|string',
            'submission_deadline' => 'nullable|date',
        ]);
        $validated['status'] = 'draft';
        $practical = ComputerPractical::create($validated);
        return $this->success($practical, 'Computer practical created', 201);
    }

    public function workstationAssignments(Request $request, int $bookingId)
    {
        $validated = $request->validate([
            'assignments' => 'required|array',
            'assignments.*.student_id' => 'required|exists:students,id',
            'assignments.*.workstation_id' => 'required|exists:workstations,id',
        ]);

        $created = [];
        foreach ($validated['assignments'] as $assignment) {
            $created[] = WorkstationAssignment::create([
                'computer_lab_booking_id' => $bookingId,
                'workstation_id' => $assignment['workstation_id'],
                'student_id' => $assignment['student_id'],
                'assigned_by' => $request->user()->id,
            ]);
        }
        return $this->success($created, 'Workstation assignments created', 201);
    }

    public function ticketsIndex(Request $request)
    {
        $query = TechnicalTicket::query()->with(['workstation.computerLab', 'ictAsset', 'reportedByUser', 'assignedToUser']);
        if ($request->filled('status')) $query->where('status', $request->status);
        if ($request->filled('priority')) $query->where('priority', $request->priority);
        return $this->paginated($query->paginate($request->per_page ?? 20));
    }

    public function ticketStore(Request $request)
    {
        $validated = $request->validate([
            'workstation_id' => 'required|exists:workstations,id',
            'ict_asset_id' => 'nullable|exists:ict_assets,id',
            'description' => 'required|string',
            'priority' => 'nullable|string|in:low,medium,high,critical',
        ]);
        $ticket = $this->labService->createTechnicalTicket(
            $validated['workstation_id'],
            $request->user()->id,
            $validated['description'],
            $validated['priority'] ?? 'medium',
            $validated['ict_asset_id'] ?? null,
        );
        return $this->success($ticket, 'Technical ticket created', 201);
    }

    public function ticketAdvance(Request $request, int $ticketId)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:open,triaged,assigned,in_progress,waiting_for_info,waiting_for_parts,resolved,verified,closed',
            'assigned_to' => 'nullable|exists:users,id',
        ]);
        $ticket = $this->labService->advanceTicketStatus($ticketId, $validated['status'], $validated['assigned_to'] ?? null);
        return $this->success($ticket, 'Ticket status updated');
    }

    public function auditsIndex(Request $request)
    {
        $query = AssetAudit::query()->with(['lab', 'auditor']);
        if ($request->filled('status')) $query->where('status', $request->status);
        return $this->paginated($query->paginate($request->per_page ?? 20));
    }

    public function auditStore(Request $request)
    {
        $validated = $request->validate([
            'computer_lab_id' => 'required|exists:computer_labs,id',
            'auditor_id' => 'nullable|exists:users,id',
            'scheduled_date' => 'required|date',
            'expected_asset_count' => 'nullable|integer|min:0',
        ]);
        $validated['status'] = 'scheduled';
        $audit = AssetAudit::create($validated);
        return $this->success($audit, 'Asset audit created', 201);
    }
}
