# Headteacher Dashboard Metrics

All metrics are calculated from real backend queries in `HeadteacherDashboardService::executiveSummary()`.

## Metric Definitions

| Metric | Data Source | Calculation |
|--------|-------------|-------------|
| enrolled_students | Student model | `Student::where('status', 'Active')->count()` |
| present_today | AttendanceRecord | Count where date = today AND status = present |
| absent_today | AttendanceRecord | Count where date = today AND status = absent |
| attendance_percentage | AttendanceRecord | (present / (present + absent)) × 100 |
| active_staff | Staff model | `Staff::where('status', 'Active')->count()` |
| lessons_today | TimetableEntry | Count where day_of_week = today's weekday |
| pending_approvals | ApprovalRequest | Count where status = pending |
| overdue_tasks | ExecutiveTask | Count where due_date < now AND status != completed |
| urgent_tasks | ExecutiveTask | Count where priority = urgent AND status != completed |
| outstanding_fees | Invoice | Sum of balance_due where status in (issued, partially_paid, overdue) |
| verified_collections | Payment | Sum of amount where status = verified AND created this term |
| pending_interventions | AcademicIntervention | Count where status in (proposed, active, under_review) |
| open_safeguarding | SafeguardingIncident | Count where status = open |
| boarding_occupancy | BoardingPlacement | Count where status = active |
| upcoming_fixtures | Fixture | Count where fixture_date >= today AND result = pending |
| pending_enquiries | Enquiry | Count where status = pending |

## Daily Briefing Categories

| Category | Source | Aggregation |
|----------|--------|-------------|
| Calendar events | SchoolSetting / CmsAnnouncement | Today's events |
| Attendance exceptions | AttendanceRecord | Unexplained absences |
| Teacher absences | Staff + TimetableEntry | Absent teachers with lessons today |
| Timetable problems | TimetableEntry | Uncovered lessons, conflicts |
| Assessment deadlines | Assessment | Due this week |
| Boarding roll calls | RollCall | Pending or exception roll calls |
| Sports fixtures | Fixture | Today's and upcoming |
| Facilities incidents | LabIncident / SafeguardingIncident | Open urgent items |
| Parent enquiries | Enquiry | Awaiting response |
| Pending approvals | ApprovalRequest | Requires headteacher decision |

## Finance Overview Metrics

| Metric | Source | Calculation |
|--------|--------|-------------|
| outstanding_fees | Invoice | Sum balance_due across non-settled invoices |
| verified_collections | Payment | Sum amount where status = verified, current term |
| collection_rate | Derived | verified_collections / (outstanding_fees + verified_collections) × 100 |

## Academic Performance Metrics

| Metric | Source | Calculation |
|--------|--------|-------------|
| total_assessments | Assessment | Count for academic year + term |
| grades_recorded | Grade | Count of non-null marks |
| missing_marks | Grade | Count of null marks for past assessments |
| average_score | Grade | Average of all recorded marks |
| completion_percentage | Derived | (grades_recorded / total_expected) × 100 |

## Filter Parameters

All dashboard endpoints accept:
- `date` — defaults to today
- `academic_year_id` — defaults to active year
- `term_id` — defaults to active term
