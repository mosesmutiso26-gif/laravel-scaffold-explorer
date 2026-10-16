<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\SchoolSetting;
use App\Models\AcademicYear;
use App\Models\Term;
use App\Models\Department;
use App\Models\Staff;
use App\Models\Teacher;
use App\Models\Student;
use App\Models\Guardian;
use App\Models\Subject;
use App\Models\SchoolClass;
use App\Models\Enrolment;
use App\Models\LibraryBook;
use App\Models\InventoryItem;
use App\Models\Supplier;
use App\Models\Vehicle;
use App\Models\BoardingHouse;
use App\Models\Sport;
use App\Models\ActivityCategory;
use App\Models\Club;
use App\Models\ClubMembership;
use App\Models\ScienceLab;
use App\Models\ScienceEquipment;
use App\Models\ChemicalBatch;
use App\Models\ComputerLab;
use App\Models\Workstation;
use App\Models\IctAsset;
use App\Models\SoftwareProduct;
use App\Models\SoftwareLicence;
use App\Models\ExecutiveTask;
use App\Models\ApprovalRequest;
use App\Models\DailyBriefingItem;
use App\Models\AcademicIntervention;
use App\Enums\AccountStatus;
use App\Enums\StudentStatus;
use App\Enums\StaffStatus;
use App\Enums\ClubStatus;
use App\Enums\MembershipStatus;
use App\Enums\LabRoomStatus;
use App\Enums\EquipmentCondition;
use App\Enums\ChemicalHazardLevel;
use App\Enums\IctDeviceStatus;
use App\Enums\WorkstationStatus;
use App\Enums\IctDeviceType;
use App\Enums\ApprovalStatus;
use App\Enums\ApprovalType;
use App\Enums\ExecutiveTaskPriority;
use App\Enums\InterventionStatus;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // School Settings
        SchoolSetting::create([
            'name' => 'Riverside Academy',
            'motto' => 'Knowledge, Integrity, Service',
            'address' => '123 Riverside Drive, Nairobi, Kenya',
            'phone' => '+254700123456',
            'email' => 'info@riverside-academy.local',
            'timezone' => 'Africa/Nairobi',
        ]);

        // Roles & Permissions
        $adminRole = Role::firstOrCreate(['name' => 'Administrator', 'guard_name' => 'sanctum']);
        $teacherRole = Role::firstOrCreate(['name' => 'Teacher', 'guard_name' => 'sanctum']);
        $parentRole = Role::firstOrCreate(['name' => 'Parent', 'guard_name' => 'sanctum']);
        $bursarRole = Role::firstOrCreate(['name' => 'Bursar', 'guard_name' => 'sanctum']);
        $nurseRole = Role::firstOrCreate(['name' => 'Nurse', 'guard_name' => 'sanctum']);
        $librarianRole = Role::firstOrCreate(['name' => 'Librarian', 'guard_name' => 'sanctum']);
        $headteacherRole = Role::firstOrCreate(['name' => 'Headteacher', 'guard_name' => 'sanctum']);
        $coCurricularRole = Role::firstOrCreate(['name' => 'CoCurricular Coordinator', 'guard_name' => 'sanctum']);
        $labTechRole = Role::firstOrCreate(['name' => 'Lab Technician', 'guard_name' => 'sanctum']);
        $ictTechRole = Role::firstOrCreate(['name' => 'ICT Technician', 'guard_name' => 'sanctum']);

        $permissions = [
            'students.view', 'students.create', 'students.update', 'students.delete',
            'finance.view', 'finance.create', 'finance.update', 'finance.verify', 'finance.reverse',
            'hr.view', 'hr.create', 'hr.update', 'hr.delete',
            'library.manage', 'transport.manage', 'boarding.manage',
            'sports.manage', 'clinic.manage', 'safeguarding.manage',
            'timetable.manage', 'attendance.manage', 'assessment.manage',
            'inventory.manage', 'procurement.manage', 'cms.manage',
            'cocurricular.manage', 'science-lab.manage', 'computer-lab.manage',
            'headteacher.dashboard', 'headteacher.approvals', 'headteacher.reports',
        ];
        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm, 'guard_name' => 'sanctum']);
        }
        $adminRole->givePermissionTo($permissions);
        $bursarRole->givePermissionTo(['finance.view', 'finance.create', 'finance.verify', 'finance.reverse']);
        $teacherRole->givePermissionTo(['students.view', 'attendance.manage', 'assessment.manage', 'timetable.manage']);
        $parentRole->givePermissionTo(['students.view']);
        $nurseRole->givePermissionTo(['clinic.manage', 'students.view']);
        $librarianRole->givePermissionTo(['library.manage']);
        $headteacherRole->givePermissionTo(['headteacher.dashboard', 'headteacher.approvals', 'headteacher.reports', 'students.view']);
        $coCurricularRole->givePermissionTo(['cocurricular.manage', 'students.view']);
        $labTechRole->givePermissionTo(['science-lab.manage']);
        $ictTechRole->givePermissionTo(['computer-lab.manage']);

        // Admin user
        $admin = User::create([
            'email' => 'admin@riverside.test',
            'password' => bcrypt('password'),
            'first_name' => 'System',
            'last_name' => 'Administrator',
            'account_status' => AccountStatus::Active->value,
        ]);
        $admin->assignRole($adminRole);

        // Academic Year & Terms
        $year = AcademicYear::create([
            'year' => '2026/2027',
            'start_date' => '2026-01-06',
            'end_date' => '2026-12-16',
            'is_current' => true,
        ]);
        $term1 = Term::create(['academic_year_id' => $year->id, 'name' => 'Term 1', 'start_date' => '2026-01-06', 'end_date' => '2026-04-09', 'is_current' => true]);
        $term2 = Term::create(['academic_year_id' => $year->id, 'name' => 'Term 2', 'start_date' => '2026-05-04', 'end_date' => '2026-08-07', 'is_current' => false]);
        $term3 = Term::create(['academic_year_id' => $year->id, 'name' => 'Term 3', 'start_date' => '2026-09-01', 'end_date' => '2026-12-16', 'is_current' => false]);

        // Departments
        $sciDept = Department::create(['name' => 'Science', 'type' => 'Academic']);
        $humDept = Department::create(['name' => 'Humanities', 'type' => 'Academic']);
        $langDept = Department::create(['name' => 'Languages', 'type' => 'Academic']);
        $mathDept = Department::create(['name' => 'Mathematics', 'type' => 'Academic']);
        $adminDept = Department::create(['name' => 'Administration', 'type' => 'Administrative']);

        // Staff
        $staff = Staff::factory()->count(15)->create(['department_id' => $sciDept->id]);
        Staff::factory()->count(10)->create(['department_id' => $humDept->id]);
        Staff::factory()->count(5)->create(['department_id' => $adminDept->id, 'type' => 'Administrative']);

        // Teachers
        $teachingStaff = Staff::where('type', 'Teaching')->limit(12)->get();
        foreach ($teachingStaff as $ts) {
            Teacher::create([
                'staff_id' => $ts->id,
                'department_id' => $ts->department_id,
                'tsc_number' => 'TSC-' . fake()->unique()->numberBetween(100000, 999999),
                'qualification' => 'BEd',
                'specialization' => fake()->randomElement(['Mathematics', 'English', 'Biology', 'Chemistry', 'Physics', 'History']),
            ]);
        }

        // Subjects
        $subjects = ['Mathematics', 'English', 'Kiswahili', 'Biology', 'Chemistry', 'Physics', 'History', 'Geography', 'CRE', 'Business Studies'];
        foreach ($subjects as $subj) {
            $dept = match(true) {
                str_contains($subj, 'Bio') || str_contains($subj, 'Chem') || str_contains($subj, 'Phys') => $sciDept,
                str_contains($subj, 'Hist') || str_contains($subj, 'Geo') || str_contains($subj, 'CRE') => $humDept,
                str_contains($subj, 'Math') => $mathDept,
                default => $langDept,
            };
            Subject::create(['department_id' => $dept->id, 'name' => $subj, 'code' => strtoupper(substr($subj, 0, 3)) . fake()->unique()->numberBetween(10, 99), 'is_compulsory' => true]);
        }

        // Classes
        $form1 = SchoolClass::create(['academic_year_id' => $year->id, 'name' => 'Form 1', 'level' => 'Secondary', 'capacity' => 40]);
        $form2 = SchoolClass::create(['academic_year_id' => $year->id, 'name' => 'Form 2', 'level' => 'Secondary', 'capacity' => 40]);
        $form3 = SchoolClass::create(['academic_year_id' => $year->id, 'name' => 'Form 3', 'level' => 'Secondary', 'capacity' => 40]);
        $form4 = SchoolClass::create(['academic_year_id' => $year->id, 'name' => 'Form 4', 'level' => 'Secondary', 'capacity' => 40]);

        // Students & Guardians
        $students = Student::factory()->count(60)->create();
        foreach ($students as $student) {
            $guardian = Guardian::factory()->create();
            $student->guardians()->attach($guardian->id, ['relationship' => fake()->randomElement(['Father', 'Mother']), 'is_primary' => true, 'is_emergency_contact' => true]);
            $class = collect([$form1, $form2, $form3, $form4])->random();
            Enrolment::create([
                'student_id' => $student->id,
                'class_id' => $class->id,
                'academic_year_id' => $year->id,
                'status' => 'Active',
                'enrolment_date' => '2026-01-06',
            ]);
        }

        // Library Books
        LibraryBook::factory()->count(30)->create()->each(function ($book) {
            for ($i = 1; $i <= $book->total_copies; $i++) {
                $book->copies()->create(['copy_number' => 'C-' . str_pad($i, 3, '0', STR_PAD_LEFT), 'status' => 'Available']);
            }
            $book->update(['available_copies' => $book->total_copies]);
        });

        // Inventory
        InventoryItem::factory()->count(25)->create();

        // Suppliers
        Supplier::factory()->count(8)->create();

        // Vehicles
        Vehicle::factory()->count(5)->create();

        // Boarding Houses
        BoardingHouse::factory()->count(4)->create()->each(function ($house) {
            for ($d = 1; $d <= 2; $d++) {
                $dorm = $house->dormitories()->create(['name' => "Block {$d}", 'capacity' => 30]);
                for ($r = 1; $r <= 4; $r++) {
                    $room = $dorm->rooms()->create(['name' => "Room {$r}", 'capacity' => 8]);
                    for ($b = 1; $b <= 8; $b++) {
                        $room->beds()->create(['label' => "B{$b}", 'status' => 'Vacant']);
                    }
                }
            }
        });

        // Sports
        Sport::factory()->count(6)->create()->each(function ($sport) {
            $sport->teams()->create(['name' => $sport->name . ' Team A', 'category' => 'U15', 'status' => 'Active']);
            $sport->teams()->create(['name' => $sport->name . ' Team B', 'category' => 'U17', 'status' => 'Active']);
        });

        // Co-Curricular
        $stem = ActivityCategory::create(['name' => 'STEM', 'description' => 'Science, Technology, Engineering, Mathematics']);
        $arts = ActivityCategory::create(['name' => 'Arts', 'description' => 'Creative and performing arts']);
        $service = ActivityCategory::create(['name' => 'Service', 'description' => 'Community service and leadership']);

        $clubs = [
            ['name' => 'Science Club', 'code' => 'SCI-001', 'category_id' => $stem->id, 'capacity' => 30],
            ['name' => 'Coding Club', 'code' => 'COD-001', 'category_id' => $stem->id, 'capacity' => 25],
            ['name' => 'Drama Club', 'code' => 'DRA-001', 'category_id' => $arts->id, 'capacity' => 20],
            ['name' => 'Environment Club', 'code' => 'ENV-001', 'category_id' => $service->id, 'capacity' => 40],
        ];
        foreach ($clubs as $c) {
            $club = Club::create([
                'name' => $c['name'],
                'code' => $c['code'],
                'activity_category_id' => $c['category_id'],
                'membership_capacity' => $c['capacity'],
                'teacher_patron_id' => Staff::inRandomOrder()->first()->id,
                'academic_year_id' => $year->id,
                'status' => ClubStatus::Active,
                'meeting_venue' => 'Lab ' . fake()->numberBetween(1, 5),
                'meeting_schedule' => 'Fridays 4:00 PM',
            ]);
            $members = $students->random(min(10, $students->count()));
            foreach ($members as $s) {
                ClubMembership::create([
                    'club_id' => $club->id,
                    'student_id' => $s->id,
                    'status' => MembershipStatus::Active,
                    'applied_at' => now()->subDays(30),
                    'approved_at' => now()->subDays(25),
                    'start_date' => now()->subDays(25),
                    'approved_by' => $admin->id,
                ]);
            }
        }

        // Science Labs
        $chemLab = ScienceLab::create([
            'name' => 'Chemistry Lab', 'code' => 'LAB-CHEM', 'type' => 'chemistry',
            'capacity' => 30, 'status' => LabRoomStatus::Active,
            'safety_rules' => 'Wear goggles and lab coat at all times',
            'required_ppe' => 'Goggles, gloves, lab coat',
        ]);
        $bioLab = ScienceLab::create([
            'name' => 'Biology Lab', 'code' => 'LAB-BIO', 'type' => 'biology',
            'capacity' => 30, 'status' => LabRoomStatus::Active,
        ]);
        $physLab = ScienceLab::create([
            'name' => 'Physics Lab', 'code' => 'LAB-PHY', 'type' => 'physics',
            'capacity' => 25, 'status' => LabRoomStatus::Active,
        ]);

        $equipmentData = [
            ['lab_id' => $chemLab->id, 'name' => 'Beakers 250ml', 'code' => 'EQ-BK250', 'qty' => 50, 'category' => 'Glassware'],
            ['lab_id' => $chemLab->id, 'name' => 'Test Tubes', 'code' => 'EQ-TT10', 'qty' => 100, 'category' => 'Glassware'],
            ['lab_id' => $bioLab->id, 'name' => 'Microscopes', 'code' => 'EQ-MIC', 'qty' => 12, 'category' => 'Instruments'],
            ['lab_id' => $physLab->id, 'name' => 'Voltmeters', 'code' => 'EQ-VLT', 'qty' => 15, 'category' => 'Instruments'],
        ];
        foreach ($equipmentData as $eq) {
            $equipment = ScienceEquipment::create([
                'science_lab_id' => $eq['lab_id'],
                'item_code' => $eq['code'],
                'name' => $eq['name'],
                'category' => $eq['category'],
                'quantity_available' => $eq['qty'],
                'quantity_reserved' => 0,
                'quantity_damaged' => 0,
                'condition' => EquipmentCondition::Good,
                'reorder_threshold' => 5,
            ]);

            if ($eq['name'] === 'Test Tubes') {
                ChemicalBatch::create([
                    'science_equipment_id' => $equipment->id,
                    'batch_number' => 'BATCH-001',
                    'quantity' => 20,
                    'expiry_date' => today()->addDays(20),
                    'hazard_level' => ChemicalHazardLevel::Low,
                    'disposal_status' => 'not_required',
                ]);
                ChemicalBatch::create([
                    'science_equipment_id' => $equipment->id,
                    'batch_number' => 'BATCH-002',
                    'quantity' => 10,
                    'expiry_date' => today()->subDays(5),
                    'hazard_level' => ChemicalHazardLevel::Medium,
                    'disposal_status' => 'pending',
                ]);
            }
        }

        // Computer Labs
        $ictLab1 = ComputerLab::create([
            'name' => 'ICT Lab 1', 'code' => 'ICT-001', 'capacity' => 30,
            'status' => LabRoomStatus::Active,
        ]);
        $ictLab2 = ComputerLab::create([
            'name' => 'ICT Lab 2', 'code' => 'ICT-002', 'capacity' => 25,
            'status' => LabRoomStatus::Active,
        ]);

        for ($i = 1; $i <= 20; $i++) {
            $asset = IctAsset::create([
                'asset_tag' => 'AST-' . str_pad($i, 4, '0', STR_PAD_LEFT),
                'serial_number' => 'SN-' . fake()->unique()->uuid(),
                'device_type' => IctDeviceType::Desktop,
                'manufacturer' => 'Dell',
                'model' => 'OptiPlex 3090',
                'ram_gb' => 8,
                'storage_gb' => 256,
                'operating_system' => 'Windows 11',
                'condition' => 'good',
            ]);
            Workstation::create([
                'computer_lab_id' => $ictLab1->id,
                'workstation_number' => 'WS-' . str_pad($i, 2, '0', STR_PAD_LEFT),
                'ict_asset_id' => $asset->id,
                'device_status' => IctDeviceStatus::Operational,
                'workstation_status' => WorkstationStatus::Available,
            ]);
        }
        for ($i = 21; $i <= 25; $i++) {
            $asset = IctAsset::create([
                'asset_tag' => 'AST-' . str_pad($i, 4, '0', STR_PAD_LEFT),
                'serial_number' => 'SN-' . fake()->unique()->uuid(),
                'device_type' => IctDeviceType::Desktop,
                'manufacturer' => 'HP',
                'model' => 'ProDesk 400',
                'ram_gb' => 8,
                'storage_gb' => 512,
                'operating_system' => 'Windows 11',
                'condition' => 'fair',
            ]);
            Workstation::create([
                'computer_lab_id' => $ictLab2->id,
                'workstation_number' => 'WS-' . str_pad($i, 2, '0', STR_PAD_LEFT),
                'ict_asset_id' => $asset->id,
                'device_status' => $i <= 23 ? IctDeviceStatus::Operational : IctDeviceStatus::Faulty,
                'workstation_status' => $i <= 23 ? WorkstationStatus::Available : WorkstationStatus::Unavailable,
            ]);
        }

        $msOffice = SoftwareProduct::create([
            'name' => 'Microsoft Office 2021', 'version' => '2021',
            'category' => 'productivity', 'supported_os' => 'Windows, macOS',
        ]);
        SoftwareLicence::create([
            'software_product_id' => $msOffice->id,
            'licence_type' => 'volume',
            'licence_count' => 50,
            'responsible_department' => 'IT Department',
        ]);

        // Headteacher Portal
        $headteacherUser = User::create([
            'email' => 'headteacher@riverside.test',
            'password' => bcrypt('password'),
            'first_name' => 'Jane',
            'last_name' => 'Mwangi',
            'account_status' => AccountStatus::Active->value,
        ]);
        $headteacherUser->assignRole($headteacherRole);

        ExecutiveTask::create([
            'title' => 'Review Q1 academic performance',
            'assigned_by' => $admin->id,
            'assigned_to' => $headteacherUser->id,
            'priority' => ExecutiveTaskPriority::High,
            'status' => 'pending',
            'due_date' => today()->addDays(7),
        ]);
        ExecutiveTask::create([
            'title' => 'Approve sports day budget',
            'assigned_by' => $admin->id,
            'assigned_to' => $headteacherUser->id,
            'priority' => ExecutiveTaskPriority::Medium,
            'status' => 'pending',
            'due_date' => today()->addDays(3),
        ]);

        ApprovalRequest::create([
            'request_type' => ApprovalType::SchoolEvent,
            'requester_id' => $admin->id,
            'reason' => 'Requesting approval for annual science fair',
            'status' => ApprovalStatus::Pending,
        ]);

        DailyBriefingItem::create([
            'briefing_date' => today(),
            'category' => 'attendance',
            'title' => '5 students absent without explanation',
            'description' => 'Form 2 and Form 3 have unexplained absences today',
            'severity' => 'high',
            'status' => 'new',
        ]);
        DailyBriefingItem::create([
            'briefing_date' => today(),
            'category' => 'facilities',
            'title' => 'ICT Lab 2 has 2 faulty workstations',
            'description' => 'Workstations 24 and 25 reported faulty',
            'severity' => 'medium',
            'status' => 'new',
        ]);

        $interventionStudent = $students->first();
        AcademicIntervention::create([
            'student_id' => $interventionStudent->id,
            'class_id' => $form1->id,
            'academic_year_id' => $year->id,
            'concern_description' => 'Below-average performance in Mathematics',
            'responsible_staff_id' => $teachingStaff->first()->id,
            'status' => InterventionStatus::Active,
            'review_date' => today()->addDays(30),
            'success_criteria' => 'Improve to at least 50% in next assessment',
        ]);
    }
}
