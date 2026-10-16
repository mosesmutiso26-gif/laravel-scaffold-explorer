# Library Permission Matrix

| Action | Librarian | Student | Teacher/Staff | Admin | Parent |
|---|---|---|---|---|---|
| View dashboard | FULL | OWN DATA | OWN DATA | FULL | CHILD ONLY |
| Search catalogue | FULL | FULL | FULL | FULL | FULL |
| Add catalogue title | YES | NO | NO | YES | NO |
| Register copy | YES | NO | NO | YES | NO |
| Mark copy lost/damaged | YES | NO | NO | YES | NO |
| Issue book | YES | NO | NO | NO | NO |
| Process return | YES | NO | NO | NO | NO |
| Renew loan | YES | OWN LOANS | OWN LOANS | NO | NO |
| Create reservation | YES | OWN | OWN | NO | NO |
| Cancel reservation | YES | OWN | OWN | NO | NO |
| Settle fine | YES | NO | NO | YES | NO |
| Waive fine | YES+REASON | NO | NO | YES+REASON | NO |
| View own loans | YES | OWN | OWN | YES | CHILD ONLY |
| View all loans | YES | NO | NO | YES | NO |
| View borrowers list | YES | NO | NO | YES | NO |
| View audit history | YES | NO | NO | YES | NO |
| Generate reports | YES | NO | NO | YES | NO |
| Manage settings | YES | NO | NO | YES | NO |

## Frontend enforcement

Current: all permissions are visual (sidebar visibility, button enable/disable). No server-side enforcement exists because no backend is connected.

## Production requirements

- Laravel policies must enforce every YES/NO above
- Student/teacher loan history queries must use `WHERE borrower_id = auth()->id()`
- Fine waiver must require `reason` field and admin or librarian role
- Reservation creation must verify `book.available_copies == 0` server-side
- Issue must verify `borrower.eligible == true` server-side, not just in UI
