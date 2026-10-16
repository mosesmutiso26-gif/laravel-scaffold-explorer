# HR Implementation Gaps

1. Laravel 13 routes and authenticated responses are not present in this repository; HR endpoints remain contract-only.
2. Supabase persistence/authentication is not connected to the demo repository. No sensitive HR table is exposed through the browser without server authorization.
3. Payroll uses labelled simulation data only; no statutory rates or legal compliance claims are made.
4. File uploads, private signed document URLs, PDF generation and delivery providers are not connected.
5. Account/password/session actions require the selected Laravel authentication service and are disabled where appropriate.
6. Browser screenshot comparison is unavailable; visual review follows the uploaded references and responsive CSS.
7. No automated test framework exists in the current manifest; typecheck, lint and build are the available checks.
