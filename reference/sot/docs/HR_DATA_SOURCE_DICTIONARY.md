# HR Data Source Dictionary

| Metric | Demo calculation | Production source |
|---|---|---|
| Active employees | Count employees with Active status | `GET /hr/dashboard` workforce summary |
| On leave | Count approved leave overlapping selected date | Leave requests and policy service |
| Attendance today | Present/late/absent status counts for selected day | Staff attendance register |
| Contracts expiring | Active contracts ending within configured horizon | Contracts endpoint with date filter |
| Payroll gross/net | Decimal sum of seeded component rows | Backend payroll snapshot, never browser arithmetic |
| Validation exceptions | Count failed payroll validation rules | Payroll validation response |
| Leave balance | Backend policy result for employee and leave type | Leave balance endpoint |
| Compliance status | Verified documents minus expired/missing required documents | Documents/compliance service |

No production statistic is inferred from demo values. Kenyan statutory rules are not claimed until versioned backend configuration is supplied and verified.
