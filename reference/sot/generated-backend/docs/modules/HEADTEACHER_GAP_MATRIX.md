# Headteacher Portal — Gap Matrix

## Status Legend
- **Complete** — Implemented and functional
- **Partial** — Implemented but missing features
- **Blocked** — Depends on unimplemented upstream module
- **Not Implemented** — Not yet built

## Gap Analysis

| Feature | Status | Evidence | Next Action |
|---------|--------|----------|-------------|
| Executive dashboard with real KPIs | Complete | HeadteacherDashboardService::executiveSummary() | Wire to frontend |
| Daily briefing aggregation | Complete | dailyBriefing() method | Add more category sources |
| Action centre / task management | Complete | ExecutiveTask model + CRUD | Add delegation workflow UI |
| Academic performance drill-down | Complete | academicPerformance() with year/term/class filters | Add per-student drill-down |
| Academic intervention workflow | Complete | AcademicIntervention model + CRUD | Add progress tracking sessions |
| Lesson observation workflow | Complete | LessonObservation model + CRUD | Add rubric configuration |
| Attendance command centre | Partial | Present/absent counts in dashboard | Add absence pattern analysis, correction approvals |
| Discipline management | Partial | SafeguardingIncident count in dashboard | Add discipline case review + decision workflow |
| Safeguarding oversight | Partial | Open case count in dashboard | Add restricted case detail access with audit |
| Student support coordination | Not Implemented | No dedicated model | Create StudentSupportCase model |
| Staff overview | Partial | Active count + lessons today | Add leave queue, workload, substitute gaps |
| Teacher absence + substitutes | Partial | Staff absence in briefing | Connect to TimetableConflictService for substitute proposals |
| Timetable approval | Partial | ApprovalRequest supports type | Wire to TimetableController adjustment workflow |
| Timetable executive view | Not Implemented | No dedicated endpoint | Add headteacher timetable overview endpoint |
| Events + school calendar | Not Implemented | No headteacher event endpoint | Extend CmsController or create EventController |
| Finance overview | Complete | financeOverview() with fees + collections | Add bursary/concession approval queue |
| Fee approval (bursary/credit note) | Partial | ApprovalType::BursaryRequest exists | Wire to finance service for execution |
| Budget oversight | Not Implemented | No budget model | Create Budget model or integrate with procurement |
| Boarding oversight | Partial | Occupancy count in dashboard | Add roll-call exceptions, leave approvals |
| Prefect oversight | Not Implemented | No prefect model in backend | Create PrefectAppointment model |
| Sports oversight | Partial | Upcoming fixtures in dashboard | Add competition approvals |
| Parent engagement dashboard | Partial | Pending enquiries in dashboard | Add response time metrics, complaint tracking |
| Parent meeting approvals | Not Implemented | No appointment model | Create ParentAppointment model |
| Announcement composer | Not Implemented | CmsAnnouncement exists | Add audience targeting + approval workflow |
| Unified approval centre | Complete | approvalCentre() + reviewApproval() | Add per-type policy validation |
| Reports centre | Not Implemented | No export endpoints | Add ReportController methods for headteacher |
| Executive insights / trends | Not Implemented | No comparison endpoints | Add period-over-period comparison service |
| Global search | Not Implemented | | Add search endpoint with permission scoping |
| Notification dispatch on approval | Not Implemented | | Wire approval decisions to notification service |
| Configurable dashboard layout | Not Implemented | | Requires frontend layout persistence |
| Frontend React portal | Not Implemented | All backend APIs ready | Build executive portal screens |

## Summary

| Status | Count |
|--------|-------|
| Complete | 9 |
| Partial | 10 |
| Blocked | 0 |
| Not Implemented | 14 |
| **Total** | **33** |
