# HR Reference Image Specification

## Uploaded references inspected

| Reference | Governs | Observed requirements |
|---|---|---|
| Teacher dashboard image | Shared ERP shell only | Compact left navigation, pale grey canvas, rounded white cards, blue/teal/pink/gold accents, dense tables and timeline patterns. |
| HR/payroll image | HR and payroll visual language | Layered payroll and HR panels, pale blue-grey surfaces, navy headings, white cards, mint approval badges, pink outlined actions, generous whitespace and high-contrast monetary rows. |

The HR/payroll image is the authority for payroll cards, HR request cards, approval badges and salary breakdown hierarchy. It is a composition reference rather than a complete route screenshot; no separate HR mobile or detail-page references were available.

## Fidelity decisions

- Preserve the existing Riverside Academy identity and public website.
- Use the existing ERP navigation rhythm and card language, with HR-specific payroll panels inspired by the uploaded HR image.
- Financial values are synthetic and labelled `DEMO MODE`; approval is never shown as payment.
- No statutory rate is asserted. Demo deductions are labelled simulated and remain contract-only until Laravel provides verified, versioned rules.
- Inferred pages use the same sidebar, typography, spacing, borders and status colors rather than introducing a second visual system.

## Verification targets

- Desktop: 1024px-wide composition with a 248px sidebar and content cards aligned to the teacher ERP shell.
- Mobile: 390px layout with drawer navigation, stacked payroll rows, horizontally safe tables and full-width approval actions.
- Check payroll status clarity, sensitive values only inside HR portal, readable contrast, focus states and no horizontal overflow.
