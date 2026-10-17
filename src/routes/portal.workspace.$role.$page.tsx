import { createFileRoute } from "@tanstack/react-router";
import { WorkspaceView } from "@/components/portal/WorkspaceView";
import { QueryState } from "@/components/portal/ui";
import { getSession } from "@/lib/api/config";
import { ApiError } from "@/lib/api/errors";
import { roleByKey } from "@/lib/roles";
import { WORKSPACE_PAGES } from "@/lib/workspace-pages";

export const Route = createFileRoute("/portal/workspace/$role/$page")({
  head: ({ params }) => {
    const label = WORKSPACE_PAGES[params.role]?.find((p) => p.key === params.page)?.label ?? "Workspace";
    const title = `${label} — ${roleByKey(params.role)?.label ?? "Portal"} — Riverside Academy`;
    const description = `${label} in the Riverside Academy ${roleByKey(params.role)?.label ?? "school"} workspace.`;
    return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] };
  },
  component: WorkspacePage,
});

function WorkspacePage() {
  const { role, page } = Route.useParams();
  const session = getSession();
  const item = WORKSPACE_PAGES[role]?.find((p) => p.key === page);
  if (!item) return <QueryState isLoading={false} error={new ApiError(404, "Unknown workspace page.")}>{null}</QueryState>;
  if (session?.role !== role && session?.role !== "admin") return <QueryState isLoading={false} error={new ApiError(403, "This workspace belongs to another role.")}>{null}</QueryState>;
  return <WorkspaceView key={`${role}-${page}`} role={role} page={page} label={item.label} />;
}