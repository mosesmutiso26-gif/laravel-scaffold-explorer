# Demo data model

The visible demo uses synthetic, relationally shaped records for students, classes, modes, attendance percentages, balances, assessments, approvals, payroll inputs and CMS content. The student table is the shared anchor for attendance and finance surfaces; Brian Otieno and Chloe Njeri intentionally demonstrate cleared and outstanding balances.

Demo mutations currently included:

- Record a simulated payment with a reference and method.
- Open role-specific dashboards through the role switcher.
- Search the student directory.
- Edit the CMS homepage headline and save it as a demo draft.
- Navigate between linked finance, attendance, student and report views.

No M-Pesa, SMS, email, payroll disbursement or external side effect is triggered. Production integration must use a dedicated Laravel repository and never silently fall back to these fixtures.
