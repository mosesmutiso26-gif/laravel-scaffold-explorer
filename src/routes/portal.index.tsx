import { createFileRoute, Navigate } from "@tanstack/react-router";
import { getSession } from "@/lib/api/config";
import { roleByKey } from "@/lib/roles";

export const Route = createFileRoute("/portal/")({
  component: () => {
    const s = getSession();
    if (!s) return <Navigate to="/login" />;
    const r = roleByKey(s.role);
    if (r?.dashboardPath === "/portal/teacher") return <Navigate to="/portal/teacher" />;
    if (r?.dashboardPath === "/portal/hr") return <Navigate to="/portal/hr" />;
    return <Navigate to="/portal/$role" params={{ role: s.role }} />;
  },
});
