# Teacher Action Matrix

| Action | Permission | Demo behavior | API target |
|---|---|---|---|
| Take/save/submit attendance | Assigned class teacher | Updates shared attendance session and dashboard pending count | `POST/PUT /teacher/attendance/sessions/{sessionId}` |
| Create assignment | Assigned subject teacher | Adds assignment to assignment list and marking queue | `POST /teacher/assignments` |
| Save/submit lesson plan | Assigned subject teacher | Changes workflow status and calendar visibility | `POST /teacher/lesson-plans`, `POST .../submit` |
| Enter marks | Assigned assessment teacher | Validates max mark and updates marking status | `PUT /teacher/assessments/{assessmentId}/marks` |
| Mark notification read | Authenticated teacher | Decrements shared unread count | `POST /teacher/notifications/{notificationId}/read` |
| Submit leave request | Authenticated teacher | Adds pending request to leave history | `POST /teacher/leave` |
| Update profile/preferences | Permitted teacher fields | Updates demo profile/preferences in shared repository | `PUT /teacher/profile`, `PUT /teacher/preferences` |
| Search/filter/open records | Assigned scope | Filters seeded records without widening access | Relevant GET endpoint |

All forms display inline validation, disabled submit state while saving, success feedback only after the local mutation succeeds, and a visible error state for invalid input.
