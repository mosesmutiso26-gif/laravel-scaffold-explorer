# Frontend implementation plan

1. Preserve the existing public school site as the unauthenticated experience.
2. Use the shared ERP shell for all role workspaces, with role-specific KPIs and routes.
3. Keep demo mode visually explicit and isolated from production endpoints.
4. Replace page-local records with a typed demo repository when backend integration begins.
5. Add the Laravel API client behind the same route and section contracts.
6. Add server-enforced permissions, resource scoping, audit events and idempotent finance mutations.
7. Add browser-level workflow tests for payment, attendance, CMS publishing and role boundaries.
