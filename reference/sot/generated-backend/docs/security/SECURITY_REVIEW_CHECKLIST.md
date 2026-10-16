# Security Review Checklist

## Authentication

- [ ] Login endpoint validates credentials and returns Sanctum token
- [ ] Password hashing uses bcrypt/argon2 (Laravel default)
- [ ] Token expiration configured
- [ ] Logout invalidates token
- [ ] Invalid token returns 401
- [ ] Account status checked via `EnsureAccountIsActive` middleware

## Authorization

- [ ] Every controller method has a corresponding policy method
- [ ] Policies enforce record-level access (parent→child, teacher→class)
- [ ] `Gate::before` only bypasses for `Administrator` role
- [ ] No controller method relies solely on frontend hiding
- [ ] Mass assignment protected via `$fillable` on all models
- [ ] `$guarded` is not used as a substitute for `$fillable`

## Input Validation

- [ ] All POST/PUT endpoints use Form Request classes or inline validation
- [ ] All numeric IDs validated as integers
- [ ] Enum fields validated against allowed values
- [ ] String inputs have max length validation
- [ ] Date inputs validated as valid dates
- [ ] File uploads validated by type, size, and permissions

## SQL Injection

- [ ] No raw SQL queries with user input
- [ ] All query builders use parameter binding
- [ ] No `DB::raw()` with concatenated user input
- [ ] Order-by parameters validated against allowlists

## XSS

- [ ] API responses are JSON (no HTML rendering on backend)
- [ ] No `eval()` or dynamic code execution
- [ ] Frontend renders user content with proper escaping

## CSRF

- [ ] API uses Sanctum token auth (stateless, no CSRF needed for API)
- [ ] SPA cookie-based auth (if used) has CSRF token configured

## Mass Assignment

- [ ] Every model has explicit `$fillable` array
- [ ] No model uses `$guarded = []` (mass-assignable everything)
- [ ] Sensitive columns (role, status, balance) not fillable by users

## File Uploads

- [ ] Upload directory is not publicly accessible
- [ ] File types validated
- [ ] File sizes limited
- [ ] Filenames sanitized
- [ ] No executable file types allowed

## Rate Limiting

- [ ] Login endpoint has rate limiting (throttle middleware)
- [ ] Sensitive operations have appropriate rate limits

## Secrets

- [ ] No hardcoded API keys, passwords, or secrets in source
- [ ] `.env.example` contains only placeholder values
- [ ] No secrets in git-tracked files
- [ ] Database credentials in `.env` only

## Audit Logging

- [ ] Sensitive actions logged via `AuditLoggingService`
- [ ] Audit entries include correlation ID
- [ ] Audit entries record actor, action, and entity
- [ ] Audit log is immutable (no update/delete)

## Data Isolation

- [ ] Parent cannot access other families' records
- [ ] Teacher cannot access unassigned class records
- [ ] Student cannot access other students' records
- [ ] No ID manipulation allows cross-record access
- [ ] Export endpoints apply same permissions as list endpoints

## Safeguarding

- [ ] Sensitive incident details restricted to authorized staff
- [ ] Medical records not exposed on general dashboards
- [ ] Notification previews exclude sensitive information
- [ ] Emergency contact info limited to trip supervisors

## Financial

- [ ] Payment verification separated from payment recording
- [ ] Payment reversal requires explicit permission
- [ ] Invoice balance calculated server-side, never client-side
- [ ] No duplicate payment processing
- [ ] Maker-checker separation where required
