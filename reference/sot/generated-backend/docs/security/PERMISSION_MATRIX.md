# Permission Matrix

## Roles

| Role | Description | Scope |
|------|-------------|-------|
| Administrator | Full system access | All modules |
| Headteacher | Executive oversight and approvals | All modules (view), approvals |
| Teacher | Assigned classes and subjects | Academics, attendance, assessment |
| FinanceOfficer | Finance and procurement | Finance, invoices, payments, procurement |
| Librarian | Library management | Library module |
| Nurse | Clinic and health | Clinic module |
| BoardingMaster | Boarding management | Boarding module |
| Parent | Linked children only | Own children's records |
| Student | Own records only | Own academic/attendance data |
| CoCurricularCoordinator | Co-curricular management | Co-curricular module |
| ClubPatron | Assigned clubs | Own club management |
| ScienceLabManager | Science lab management | Science lab module |
| ComputerLabManager | Computer lab management | Computer lab module |

## Permission Catalogue

### Students
| Permission | Administrator | Headteacher | Teacher | Parent | Student |
|-----------|:---:|:---:|:---:|:---:|:---:|
| students.view | ✓ | ✓ | ✓ (assigned) | ✓ (linked) | ✓ (own) |
| students.create | ✓ | | | | |
| students.update | ✓ | | | | |
| students.delete | ✓ | | | | |

### Finance
| Permission | Administrator | Headteacher | FinanceOfficer |
|-----------|:---:|:---:|:---:|
| invoices.view | ✓ | ✓ | ✓ |
| invoices.create | ✓ | | ✓ |
| payments.view | ✓ | ✓ | ✓ |
| payments.create | ✓ | | ✓ |
| payments.verify | ✓ | | ✓ |
| payments.reverse | ✓ | | ✓ |
| reports.finance | ✓ | ✓ | ✓ |

### Attendance
| Permission | Administrator | Headteacher | Teacher | Parent | Student |
|-----------|:---:|:---:|:---:|:---:|:---:|
| attendance.view | ✓ | ✓ | ✓ (assigned) | ✓ (linked) | ✓ (own) |
| attendance.create | ✓ | | ✓ | | |
| attendance.complete | ✓ | | ✓ | | |

### Timetable
| Permission | Administrator | Headteacher | Teacher |
|-----------|:---:|:---:|:---:|
| timetable.view | ✓ | ✓ | ✓ |
| timetable.create | ✓ | | |
| timetable.publish | ✓ | ✓ | |

### Boarding
| Permission | Administrator | Headteacher | BoardingMaster |
|-----------|:---:|:---:|:---:|
| boarding.view | ✓ | ✓ | ✓ |
| boarding.manage | ✓ | | ✓ |

### Library
| Permission | Administrator | Headteacher | Librarian | Teacher | Student |
|-----------|:---:|:---:|:---:|:---:|:---:|
| library.view | ✓ | ✓ | ✓ | ✓ | ✓ |
| library.manage | ✓ | | ✓ | | |
| library.circulate | ✓ | | ✓ | | |

### Sports
| Permission | Administrator | Headteacher | Teacher |
|-----------|:---:|:---:|:---:|
| sports.view | ✓ | ✓ | ✓ |
| sports.manage | ✓ | | ✓ |

### Clinic
| Permission | Administrator | Headteacher | Nurse |
|-----------|:---:|:---:|:---:|
| clinic.view | ✓ | ✓ | ✓ |
| clinic.manage | ✓ | | ✓ |

### Safeguarding
| Permission | Administrator | Headteacher |
|-----------|:---:|:---:|
| safeguarding.view | ✓ | ✓ |
| safeguarding.manage | ✓ | ✓ |

### HR
| Permission | Administrator | Headteacher |
|-----------|:---:|:---:|
| hr.view | ✓ | ✓ |
| hr.approve | ✓ | ✓ |

### Procurement
| Permission | Administrator | Headteacher | FinanceOfficer |
|-----------|:---:|:---:|:---:|
| procurement.view | ✓ | ✓ | ✓ |
| procurement.approve | ✓ | ✓ | ✓ |

### Inventory
| Permission | Administrator | Headteacher |
|-----------|:---:|:---:|
| inventory.view | ✓ | ✓ |
| inventory.manage | ✓ | |

### Co-Curricular
| Permission | Administrator | Headteacher | Coordinator | Patron | Student |
|-----------|:---:|:---:|:---:|:---:|:---:|
| cocurricular.view | ✓ | ✓ | ✓ | ✓ (own) | ✓ (own) |
| cocurricular.manage | ✓ | | ✓ | ✓ (own club) | |
| cocurricular.apply | | | | | ✓ |
| cocurricular.attendance | ✓ | | ✓ | ✓ (own club) | |
| cocurricular.consent | ✓ | | ✓ | | |

### Science Lab
| Permission | Administrator | Headteacher | LabManager | Teacher | Student |
|-----------|:---:|:---:|:---:|:---:|:---:|
| lab.science.view | ✓ | ✓ | ✓ | ✓ (assigned) | ✓ (own) |
| lab.science.manage | ✓ | | ✓ | | |
| lab.science.book | ✓ | | ✓ | ✓ | |
| lab.science.teach | ✓ | | | ✓ | |
| lab.science.safety | ✓ | ✓ | ✓ | | |

### Computer Lab
| Permission | Administrator | Headteacher | LabManager | Teacher | Student |
|-----------|:---:|:---:|:---:|:---:|:---:|
| lab.computer.view | ✓ | ✓ | ✓ | ✓ (assigned) | ✓ (own) |
| lab.computer.manage | ✓ | | ✓ | | |
| lab.computer.book | ✓ | | ✓ | ✓ | |
| lab.computer.support | ✓ | | ✓ | ✓ | |

### Headteacher
| Permission | Administrator | Headteacher |
|-----------|:---:|:---:|
| headteacher.view | ✓ | ✓ |
| headteacher.approve | ✓ | ✓ |
| headteacher.finance | ✓ | ✓ |
| headteacher.reports | ✓ | ✓ |

## Record-Level Access

Beyond role permissions, policies enforce record-level access:

- **Parent:** Sees only students linked via `student_guardians` pivot
- **Teacher:** Sees only classes/subjects assigned via `class_subjects` or enrolment assignments
- **Student:** Sees only own records (matched by `auth.uid() = user_id` or student record)
- **Club Patron:** Sees only clubs where they are the assigned patron
- **Trip Supervisor:** Sees only trips where they are an assigned supervisor

## Gate::before Bypass

The `Administrator` role bypasses all policy checks via `Gate::before` in `AppServiceProvider`. This is intentional for the super-admin role only.
