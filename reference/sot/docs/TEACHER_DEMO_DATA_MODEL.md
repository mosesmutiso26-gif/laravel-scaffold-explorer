# Teacher Demo Data Model

The teacher portal uses a deterministic, shared in-memory demo repository. It is deliberately separate from production API calls and marked `DEMO MODE` in the shell.

Seeded entities include teacher profile, assigned classes, day and boarding students, timetable lessons, attendance sessions, lesson plans, schemes of work, resources, assignments, submissions, assessments, marks, report cards, analytics, follow-ups, calendar events, announcements, notifications, leave requests and audit events.

Mutations are centralized in the repository so attendance, assignments, marks, notifications and leave remain consistent across pages during the session. A reset action restores the original seed. This is not durable storage and is not a production fallback; Laravel integration remains a documented gap.
