# Entity Relationship Matrix

## Core Relationships

| Parent | Child | FK | Type | Notes |
|--------|-------|----|------|-------|
| academic_years | terms | academic_year_id | 1:N | Terms belong to one year |
| academic_years | classes | academic_year_id | 1:N | Classes defined per year |
| departments | staff | department_id | 1:N | Staff assigned to department |
| departments | subjects | department_id | 1:N | Subjects belong to department |
| students | student_guardians | student_id | 1:N | Student has multiple guardians |
| guardians | student_guardians | guardian_id | 1:N | Guardian has multiple students |
| students | enrolments | student_id | 1:N | Student enrolment history |
| classes | enrolments | class_id | 1:N | Students in a class |
| classes | class_subjects | class_id | 1:N | Subjects taught in class |
| subjects | class_subjects | subject_id | 1:N | Classes teaching subject |
| staff | teachers | staff_id | 1:1 | Teacher extends staff |
| classes | attendance_sessions | class_id | 1:N | Sessions per class |
| attendance_sessions | attendance_records | session_id | 1:N | Records per session |
| students | attendance_records | student_id | 1:N | Student attendance history |
| assessments | grades | assessment_id | 1:N | Grades per assessment |
| students | grades | student_id | 1:N | Student grade history |
| students | report_cards | student_id | 1:N | Report card per term |
| timetable_versions | timetable_entries | version_id | 1:N | Entries per version |
| classes | timetable_entries | class_id | 1:N | Entries per class |
| students | invoices | student_id | 1:N | Invoice history |
| invoices | invoice_items | invoice_id | 1:N | Line items |
| students | payments | student_id | 1:N | Payment history |
| payments | payment_allocations | payment_id | 1:N | Allocation to invoices |
| invoices | payment_allocations | invoice_id | 1:N | Allocations received |
| suppliers | purchase_orders | supplier_id | 1:N | POs to supplier |
| purchase_orders | goods_receipts | po_id | 1:N | Receipts per PO |
| inventory_items | stock_movements | item_id | 1:N | Movement history |
| library_books | library_copies | book_id | 1:N | Physical copies |
| library_copies | library_loans | copy_id | 1:N | Loan history per copy |
| students | library_loans | student_id | 1:N | Student loan history |
| vehicles | transport_routes | vehicle_id | 1:N | Routes per vehicle |
| students | transport_assignments | student_id | 1:N | Transport assignments |
| boarding_houses | dormitories | house_id | 1:N | Dorms per house |
| dormitories | rooms | dormitory_id | 1:N | Rooms per dorm |
| rooms | beds | room_id | 1:N | Beds per room |
| students | boarding_placements | student_id | 1:N | Placement history |
| beds | boarding_placements | bed_id | 1:N | Bed occupancy history |
| boarding_houses | roll_calls | house_id | 1:N | Roll calls per house |
| students | leave_requests | student_id | 1:N | Leave history |
| sports | teams | sport_id | 1:N | Teams per sport |
| teams | squad_members | team_id | 1:N | Members per team |
| teams | training_sessions | team_id | 1:N | Sessions per team |
| teams | fixtures | team_id | 1:N | Fixtures per team |
| students | clinic_visits | student_id | 1:N | Visit history |
| clinic_visits | clinic_medications | visit_id | 1:N | Meds per visit |
| students | clinic_records | student_id | 1:N | Medical records |
| students | safeguarding_incidents | student_id | 1:N | Incident history |
| safeguarding_incidents | safeguarding_actions | incident_id | 1:N | Actions per incident |
| staff | hr_leave_requests | staff_id | 1:N | Leave history |
| hr_payroll_runs | hr_payslips | payroll_run_id | 1:N | Payslips per run |
| staff | hr_payslips | staff_id | 1:N | Payslip history |
| users | notifications | user_id | 1:N | Notifications per user |
| users | audit_entries | actor_id | 1:N | Actions by user |

## Polymorphic Relationships

| Parent | Child | Morph Columns | Use Case |
|--------|-------|---------------|----------|
| Any | documents | documentable_type, documentable_id | Attach docs to any entity |
| Any | audit_entries | auditable_type, auditable_id | Audit any entity |
| Any | stock_movements | reference_type, reference_id | Stock movements reference PO, GRN, issue |

## Pivot Tables

| Table | Links | Extra Columns |
|-------|-------|---------------|
| model_has_permissions | morph → permission | — |
| model_has_roles | morph → role | — |
| role_has_permissions | role → permission | — |
| student_guardians | student ↔ guardian | relationship, is_primary, is_emergency_contact |
| class_subjects | class ↔ subject | teacher_id, is_compulsory |
| squad_members | team ↔ student | position, jersey_number |
