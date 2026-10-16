# HR Demo Data Model

The HR portal uses a deterministic, shared in-memory demo repository for the disconnected frontend demonstration. It is explicitly marked `DEMO MODE` and is never silently used as an API fallback.

Seeded relationships include departments, designations, synthetic employees, contracts, candidates, onboarding checklists, attendance, leave requests, overtime, payroll periods, payroll runs, compensation components, simulated deductions, approval records, payslips, documents, notifications and audit events.

State transitions are shared across pages: contract renewal updates profile history; leave approval updates queue/calendar; attendance correction updates exceptions; payroll approval does not mark payment; payment outcome updates the run and audit event; payslip publication is per synthetic employee. The repository resets on reload and must be replaced by authenticated Laravel/Supabase-backed records before production.
