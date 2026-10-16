# Headteacher Approval Workflows

## Approval Types

Defined in `App\Enums\ApprovalType`:

| Type | Description | Typical Requester |
|------|-------------|-------------------|
| timetable_adjustment | Change to published timetable | Teacher / Timetable Coordinator |
| substitute_assignment | Assign substitute teacher | Timetable Coordinator |
| assessment_publication | Publish exam/assessment results | Teacher / Dept Head |
| student_discipline | Discipline decision/sanction | Disciplinary Officer |
| school_event | School event approval | Event Organizer |
| prefect_appointment | Appoint student prefect | Prefect Coordinator |
| boarding_exception | Boarding leave/exception | Matron / Boarding Master |
| sports_event | Sports event approval | Games Teacher |
| parent_communication | Approve parent broadcast | Staff |
| bursary_request | Fee bursary/concession | Finance Staff |
| budget_request | Budget approval | Department Head |
| staff_leave | Staff leave approval | Staff Member |

## Approval Status Machine

```
Pending → Approved (terminal)
Pending → Rejected (terminal)
Pending → ReturnedForCorrection (loops back to requester)
Pending → MoreInfoRequested (loops back to requester)
```

## Maker-Checker Separation

**Rule:** The person who created an approval request cannot review/approve it.

**Enforcement:**
1. `ApprovalRequest::canBeReviewedBy(int $userId)` — returns false if `$userId === $this->requester_id`
2. `HeadteacherDashboardService::reviewApproval()` calls `canBeReviewedBy()` before applying decision
3. Returns `403 Forbidden` if violation detected

**Exception:** Emergency overrides require explicit policy, reason, and audit record. Not implemented in current generation.

## Review Process

```
1. GET /headteacher/approval-centre → lists pending approvals for reviewer
2. POST /headteacher/approvals/{id}/review with {decision, notes}
3. Service checks canBeReviewedBy()
4. If authorized: updates status, reviewer_id, reviewed_at, review_notes
5. Returns updated approval request
```

## Conflict Warnings

The `conflict_warnings` field on ApprovalRequest stores JSON array of validation warnings:
- Timetable conflicts (teacher/class/room double-booking)
- Capacity exceedances
- Missing prerequisite approvals
- Policy violations

These are informational and do not block submission, but the reviewer sees them before deciding.

## Audit Trail

Each approval decision records:
- `reviewer_id` — who made the decision
- `reviewed_at` — when
- `review_decision` — approved/rejected/returned/more_info
- `review_notes` — optional reason text

## Delegation

Executive tasks can be delegated via `delegated_to` field, but **delegation does not transfer formal approval authority**. The original requester remains the requester for maker-checker purposes.
