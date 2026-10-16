# Database Design

## Overview

The database uses MySQL/MariaDB with InnoDB engine. All tables use `bigIncrements` for primary keys, `timestamps()` for created_at/updated_at, and `softDeletes()` where history preservation is required.

## Conventions

- **Primary keys:** `id` (bigIncrements)
- **Foreign keys:** `<table_singular>_id` (unsignedBigInteger)
- **Status fields:** Enum-backed via PHP enum classes, stored as strings
- **Money fields:** `decimal(15,2)` — all amounts in KES
- **Timestamps:** `timestamp()` with timezone handling at app level
- **UUIDs:** Used for public-facing identifiers (admission numbers, invoice numbers)
- **Soft deletes:** On students, staff, financial records, and audit entries
- **Indexes:** All foreign keys indexed; composite indexes on common filter combinations

## Core Tables

### Auth & Identity
| Table | Purpose | Key Columns |
|-------|---------|-------------|
| users | Login identity | email, password, account_status, last_login_at |
| roles | Spatie permission roles | name, guard_name |
| permissions | Spatie permissions | name, guard_name |

### School Structure
| Table | Purpose | Key Columns |
|-------|---------|-------------|
| school_settings | School identity | name, address, phone, email, logo, timezone |
| academic_years | Academic year | year, start_date, end_date, is_current |
| terms | Terms within years | academic_year_id, name, start_date, end_date, is_current |
| departments | Academic/admin departments | name, head_staff_id, type |

### People
| Table | Purpose | Key Columns |
|-------|---------|-------------|
| students | Student records | admission_number, first_name, last_name, date_of_birth, gender, status |
| guardians | Parent/guardian records | first_name, last_name, phone, email, relationship |
| student_guardians | Student-guardian links | student_id, guardian_id, relationship, is_primary |
| staff | Staff records | employee_number, first_name, last_name, type, status |
| teachers | Teacher extensions | staff_id, department_id, tsc_number |

### Academic
| Table | Purpose | Key Columns |
|-------|---------|-------------|
| classes | Class/form definitions | name, level, academic_year_id, stream_id |
| streams | Class streams | name, class_id |
| subjects | Subject definitions | name, code, department_id |
| enrolments | Student-class links | student_id, class_id, academic_year_id, status |
| class_subjects | Subject-class links | class_id, subject_id, teacher_id |

### Attendance
| Table | Purpose | Key Columns |
|-------|---------|-------------|
| attendance_sessions | Daily/period sessions | class_id, date, period, recorded_by |
| attendance_records | Per-student attendance | session_id, student_id, status |

### Assessment
| Table | Purpose | Key Columns |
|-------|---------|-------------|
| assessments | Assessment definitions | subject_id, class_id, name, term_id, max_score, type |
| grades | Student grades | assessment_id, student_id, score, status |
| report_cards | Term reports | student_id, term_id, class_id, overall_grade, status |

### Timetable
| Table | Purpose | Key Columns |
|-------|---------|-------------|
| rooms | Physical rooms | name, building, capacity, type |
| timetable_versions | Versioned timetables | academic_year_id, version_label, status (draft/published/archived) |
| timetable_entries | Individual lessons | version_id, day, period, class_id, subject_id, teacher_id, room_id |

### Finance
| Table | Purpose | Key Columns |
|-------|---------|-------------|
| fee_structures | Fee definitions | term_id, class_level, component, amount |
| invoices | Student invoices | student_id, term_id, invoice_number, total, status |
| invoice_items | Invoice line items | invoice_id, description, amount |
| payments | Payment records | student_id, invoice_id, amount, method, reference, status |
| payment_allocations | Payment-to-invoice links | payment_id, invoice_id, amount |

### Procurement & Inventory
| Table | Purpose | Key Columns |
|-------|---------|-------------|
| suppliers | Supplier records | name, phone, email, account_number, status |
| purchase_requests | Internal requests | request_number, department_id, requested_by, status |
| purchase_orders | POs to suppliers | po_number, supplier_id, status, total |
| goods_receipts | GRNs | po_id, received_by, status |
| inventory_items | Stock items | name, sku, unit, quantity_on_hand, reorder_level |
| stock_movements | In/out movements | item_id, type, quantity, reference_type, reference_id |

### Library
| Table | Purpose | Key Columns |
|-------|---------|-------------|
| library_books | Book catalog | isbn, title, author, publisher, category, total_copies |
| library_copies | Physical copies | book_id, copy_number, status |
| library_loans | Issue/return | copy_id, student_id, issued_at, due_at, returned_at |
| library_reservations | Holds | book_id, student_id, status |
| library_fines | Overdue fines | loan_id, amount, status |

### Transport
| Table | Purpose | Key Columns |
|-------|---------|-------------|
| vehicles | Bus/van fleet | registration, capacity, type, status |
| transport_routes | Routes | name, morning_pickup, evening_dropoff, vehicle_id |
| transport_assignments | Student-route links | student_id, route_id, term_id |

### Boarding
| Table | Purpose | Key Columns |
|-------|---------|-------------|
| boarding_houses | Houses | name, matron_staff_id, capacity |
| dormitories | Dorms in houses | house_id, name, capacity |
| rooms | Rooms in dorms | dormitory_id, name, capacity |
| beds | Beds in rooms | room_id, label, status |
| boarding_placements | Student-bed links | student_id, bed_id, status, start_date, end_date |
| roll_calls | Roll call sessions | house_id, date, conducted_by, status |
| leave_requests | Leave records | student_id, type, start_date, expected_return, status |

### Sports
| Table | Purpose | Key Columns |
|-------|---------|-------------|
| sports | Sport definitions | name, season, teacher_id |
| teams | Teams | sport_id, name, coach_id, category |
| squad_members | Team members | team_id, student_id |
| training_sessions | Training | team_id, date, start_time, end_time, venue, status |
| fixtures | Matches | team_id, opponent, date, venue, result |
| equipment | Sports equipment | name, sport_id, total_quantity, available_quantity |
| equipment_issues | Issue/return | equipment_id, student_id, issued_at, returned_at |

### Health
| Table | Purpose | Key Columns |
|-------|---------|-------------|
| clinic_visits | Clinic visits | student_id, visit_date, complaint, attended_by, status |
| clinic_medications | Meds given | visit_id, medication, dosage, administered_by |
| clinic_records | Medical history | student_id, condition, recorded_by, is_confidential |

### Safeguarding
| Table | Purpose | Key Columns |
|-------|---------|-------------|
| safeguarding_incidents | Incident reports | student_id, type, severity, description, is_confidential, status |
| safeguarding_actions | Actions taken | incident_id, action, taken_by, status |

### HR
| Table | Purpose | Key Columns |
|-------|---------|-------------|
| hr_leave_requests | Staff leave | staff_id, type, start_date, end_date, status |
| hr_payroll_runs | Payroll batches | term_id, month, status, total_gross, total_net |
| hr_payslips | Individual payslips | payroll_run_id, staff_id, gross, deductions, net |

### CMS & Notifications
| Table | Purpose | Key Columns |
|-------|---------|-------------|
| cms_pages | Website pages | slug, title, content, status |
| cms_announcements | Announcements | title, body, published_at, status |
| enquiries | Public enquiries | name, email, phone, subject, message, status |
| notifications | User notifications | user_id, type, data, read_at |
| documents | Generated docs | owner_type, owner_id, type, file_path |
| audit_entries | Audit log | actor_id, action, auditable_type, auditable_id, before, after |
