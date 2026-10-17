<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- All data access goes through `src/lib/api/client.ts`; it switches between the Laravel API (`VITE_API_BASE_URL`/api/v1) and the labelled demo adapter `src/lib/api/demo.ts` — why: one contract for live and demo, no scattered fetches.
- Portal roles, nav and data sections are configured in `src/lib/roles.ts`; dashboards reuse shared components in `src/components/portal` — why: one shell configured per role.
- Original role-specific destinations are catalogued in `src/lib/workspace-pages.ts` and render through the shared workspace route; original sample records are accessed only through the demo API adapter — why: retain full menu coverage without duplicating shells or disguising demo records as live data.
- API gaps vs the Laravel package are tracked in `docs/API_INTEGRATION.md`; the cloned source lives read-only in `reference/sot` — why: honest contract tracking.
