# Implementation gap matrix

| Area | Current truth | Next milestone |
|---|---|---|
| Public website | Preserved and routable | Move editable content into Laravel CMS when backend is available |
| Shared ERP shell | Frontend implemented and responsive | Connect authenticated session and permissions |
| Role dashboards | Demo views for eight roles through role switcher | Split role entry points after backend auth |
| Linked demo data | Demo workflow implemented for students, attendance, finance and CMS | Replace page-local fixtures with a shared repository or Laravel seeder |
| CMS | Demo draft editing and preview | Media uploads, revisions, publish workflow and server persistence |
| Finance | Demo payment modal and linked balances | Decimal-safe Laravel ledger, idempotency and reconciliation |
| HR/payroll | Demo readiness surface | Verify current Kenyan statutory rules before production |
| API integration | Contracts documented; none claimed integrated | Implement Laravel v1 endpoints and contract tests |
| Tests | Build/type verification pending after implementation | Add route, workflow and authorization tests |
