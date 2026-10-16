# Teacher Reference Image Specification

## Available reference images

| Reference | Governs | Observed design requirements |
|---|---|---|
| `image.png` (teacher dashboard, wide desktop) | Teacher workspace shell, dashboard, timetable, class cards, timeline, quick actions and announcements | White left navigation rail; Riverside-style red/blue brand mark; compact search; grouped navigation; pale grey application canvas; rounded white cards; blue/teal/pink/gold event colors; dense timetable grid; compact KPI strip; readable 10–13px UI typography; responsive collapse required. |
| `image.png` (HR/payroll composition) | Cross-ERP visual language only; not a teacher screen | Light blue-grey panels, white content cards, navy headings, teal success badges, pink outlined actions, generous whitespace. It does not define teacher navigation or teacher permissions. |

## Fidelity decisions

- The teacher portal reuses the existing Riverside Academy identity and ERP card language rather than replacing the public school website.
- The first image is the authority for teacher layout. Its sidebar, timetable-first information hierarchy, activity timeline, quick actions and announcement cards are represented in the teacher dashboard.
- No additional uploaded teacher images were available for detail pages, mobile screens, marking grids or forms. Those screens reuse the same spacing, colors, border radii and typography and are documented as inferred states rather than image-matched states.
- Synthetic demo records are labelled `DEMO MODE`; production numbers are not implied.

## Verification dimensions

- Desktop reference target: 832 × 661 screenshot aspect ratio, with a 248px navigation rail and a two-column content canvas.
- Mobile target: 390px wide, sidebar converted to a drawer, timetable converted to an agenda list, tables converted to stacked records.
- Verify: no horizontal overflow, visible focus states, readable contrast, card alignment, 8px spacing rhythm and touch targets of at least 40px on mobile.
