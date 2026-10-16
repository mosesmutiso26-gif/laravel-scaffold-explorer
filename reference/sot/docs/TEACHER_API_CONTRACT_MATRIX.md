# Teacher API Contract Matrix

All endpoints use `/api/v1`, Laravel authentication and server-side teacher-to-class/subject/student authorization. The frontend currently runs in explicit demo mode and does not silently fall back to these endpoints.

| Resource | Methods | Endpoint family | Frontend status |
|---|---|---|---|
| Identity/dashboard | GET | `/me`, `/teacher/dashboard` | Demo implemented; contract only |
| Timetable/classes/students | GET | `/teacher/timetable`, `/teacher/classes`, `/teacher/classes/{classId}`, `/teacher/classes/{classId}/students`, `/teacher/students/{studentId}` | Demo implemented; contract only |
| Attendance | GET/POST/PUT | `/teacher/attendance`, `/teacher/attendance/sessions`, `/teacher/attendance/sessions/{sessionId}`, `/submit`, `/history`, `/reports`, `/corrections` | Demo implemented; contract only |
| Plans/schemes/resources | GET/POST/PUT | `/teacher/lesson-plans`, `/teacher/schemes-of-work`, `/teacher/resources` | Demo implemented; contract only |
| Assignments/marking | GET/POST/PUT | `/teacher/assignments`, `/teacher/assignments/{assignmentId}`, `/teacher/assignments/{assignmentId}/submissions`, `/teacher/submissions/{submissionId}/marks`, `/return` | Demo implemented; contract only |
| Assessments/reports/analytics | GET/PUT/POST | `/teacher/assessments`, `/teacher/assessments/{assessmentId}/marks`, `/submit`, `/teacher/report-cards`, `/teacher/analytics` | Demo implemented; contract only |
| Follow-ups/calendar/comms | GET/POST | `/teacher/follow-ups`, `/teacher/calendar`, `/teacher/announcements`, `/teacher/messages`, `/teacher/notifications/{notificationId}/read` | Demo implemented; contract only |
| Leave/profile/preferences | GET/POST/PUT | `/teacher/leave`, `/teacher/profile`, `/teacher/preferences` | Demo implemented; contract only |

Expected errors are 401 unauthenticated, 403 out of scope, 404 missing record, 409 state conflict, 422 validation failure and 500 unexpected server failure. Laravel must enforce authorization; route visibility is not a security boundary.
