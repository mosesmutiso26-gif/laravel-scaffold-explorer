# Headteacher API Matrix

All routes under `/api/v1/` with `auth:sanctum` middleware.

| Method | Route | Controller Method | Permission | Purpose |
|--------|-------|-------------------|------------|---------|
| GET | `headteacher/dashboard` | dashboard | headteacher.dashboard | Executive summary KPIs |
| GET | `headteacher/daily-briefing` | dailyBriefing | headteacher.dashboard | Today's aggregated briefing |
| GET | `headteacher/action-centre` | actionCentre | headteacher.dashboard | Consolidated task list |
| GET | `headteacher/academic-performance` | academicPerformance | headteacher.dashboard | Academic metrics + drill-down |
| GET | `headteacher/finance-overview` | financeOverview | headteacher.dashboard | Fee collection + balances |
| GET | `headteacher/staff-overview` | staffOverview | headteacher.dashboard | Staff attendance + workload |
| GET | `headteacher/approval-centre` | approvalCentre | headteacher.approvals | Pending approvals list |
| POST | `headteacher/approvals/{id}/review` | reviewApproval | headteacher.approvals | Approve/reject/return |
| GET | `executive-tasks` | tasksIndex | headteacher.dashboard | List executive tasks |
| POST | `executive-tasks` | taskStore | headteacher.dashboard | Create task |
| PATCH | `executive-tasks/{task}` | taskUpdate | headteacher.dashboard | Update task status |
| POST | `briefing-items/{id}/review` | briefingItemReview | headteacher.dashboard | Mark briefing item reviewed |
| GET | `academic-interventions` | interventionsIndex | headteacher.dashboard | List interventions |
| POST | `academic-interventions` | interventionStore | headteacher.dashboard | Create intervention |
| PATCH | `academic-interventions/{id}` | interventionUpdate | headteacher.dashboard | Update intervention |
| GET | `lesson-observations` | observationsIndex | headteacher.dashboard | List observations |
| POST | `lesson-observations` | observationStore | headteacher.dashboard | Create observation |
| PATCH | `lesson-observations/{id}` | observationUpdate | headteacher.dashboard | Update observation |

## Response Shapes

### GET `headteacher/dashboard`
```json
{
  "data": {
    "enrolled_students": 450,
    "present_today": 420,
    "absent_today": 30,
    "attendance_percentage": 93.3,
    "active_staff": 38,
    "lessons_today": 52,
    "pending_approvals": 5,
    "overdue_tasks": 3,
    "urgent_tasks": 7,
    "outstanding_fees": "1250000.00",
    "verified_collections": "3400000.00",
    "pending_interventions": 4,
    "open_safeguarding": 2,
    "boarding_occupancy": 180,
    "upcoming_fixtures": 3,
    "pending_enquiries": 5
  }
}
```

### POST `headteacher/approvals/{id}/review`
Request:
```json
{
  "decision": "approved|rejected|returned_for_correction|more_info_requested",
  "notes": "Optional reason text"
}
```
Response: `200` with updated ApprovalRequest resource, or `403` if maker-checker violation.
