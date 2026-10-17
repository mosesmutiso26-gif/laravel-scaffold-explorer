import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ChevronLeft, ChevronRight, MessageSquare, Users, CalendarCheck, ClipboardList, BookOpen, Bell, Megaphone } from "lucide-react";
import { api } from "@/lib/api/client";
import { getSession } from "@/lib/api/config";
import { ApiError } from "@/lib/api/errors";
import { Panel, QueryState } from "@/components/portal/ui";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Lesson = { day: string; start: string; end: string; subject: string; class: string; room: string };
type Overview = {
  stats: { classes: number; students: number; subjects: number };
  today: Lesson[]; lessons: Lesson[];
  timeline: { title: string; detail: string; date: string; kind: string; color: string }[];
  subjects: { id: number; name: string; classes: string }[];
  announcements: { id: number; title: string; date: string; excerpt: string }[];
};

export const Route = createFileRoute("/portal/teacher")({
  head: () => ({ meta: [{ title: "Teacher dashboard — Riverside Academy" }, { name: "description", content: "Riverside Academy teacher timetable, classes and teaching priorities." }, { property: "og:title", content: "Teacher dashboard — Riverside Academy" }, { property: "og:description", content: "Teacher timetable, classes and teaching priorities." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: TeacherDashboard,
});

const SUBJ_TONE: Record<string, string> = {
  Mathematics: "bg-chart-4 text-primary-foreground", Physics: "bg-chart-5 text-primary-foreground", "Computer Studies": "bg-chart-2 text-primary-foreground",
};
const DOT: Record<string, string> = { "chart-2": "bg-chart-2", "chart-3": "bg-chart-3", "chart-4": "bg-chart-4", "chart-5": "bg-chart-5" };
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function TeacherDashboard() {
  const s = getSession();
  const allowed = s?.role === "teacher" || s?.role === "admin";
  // Contract gap: GET /teacher/overview (aggregates timetable, assessments, classes for the signed-in teacher).
  const q = useQuery({ queryKey: ["teacher-overview"], queryFn: () => api.get<Overview>("/teacher/overview"), enabled: allowed });
  const [view, setView] = useState("week");
  const [week, setWeek] = useState(0);
  if (!allowed) return <QueryState isLoading={false} error={new ApiError(403, "Only teachers can open this dashboard.")}>{null}</QueryState>;
  const d = q.data;

  return (
    <QueryState isLoading={q.isLoading} error={q.error}>
      {d && (
        <div className="grid gap-5 xl:grid-cols-[320px_1fr]">
          <div className="space-y-5">
            <div className="flex flex-col items-center">
              <div className="z-10 grid h-24 w-24 place-items-center rounded-full border-4 border-card bg-primary font-display text-3xl font-bold text-primary-foreground">{s?.name.split(" ").map((x) => x[0]).slice(0, 2).join("")}</div>
              <div className="-mt-6 grid w-full grid-cols-3 rounded-xl bg-navy px-3 pb-4 pt-9 text-center text-navy-foreground">
                <Stat v={d.stats.classes} l="Classes" tone="text-chart-3" />
                <Stat v={d.stats.students} l="Students" tone="text-chart-5" />
                <Stat v={d.stats.subjects} l="Subjects" tone="text-info" />
              </div>
            </div>
            <Panel title="Timeline View">
              <ol className="relative space-y-4 border-l-2 border-border pl-6">
                {d.timeline.map((t) => (
                  <li key={t.title} className="relative">
                    <span className={`absolute -left-[33px] top-1 h-4 w-4 rounded-full ring-4 ring-card ${DOT[t.color]}`} />
                    <div className="rounded-lg bg-muted p-3">
                      <p className="font-semibold text-navy">{t.title}</p>
                      <p className="text-xs text-muted-foreground">{t.detail}</p>
                      <div className="mt-1 flex justify-between text-[11px] text-muted-foreground"><span>{t.date}</span><span className="text-primary">{t.kind}</span></div>
                    </div>
                  </li>
                ))}
              </ol>
            </Panel>
            <Panel title="Quick Actions">
              <div className="grid grid-cols-3 gap-3">
                <QA to="notifications" icon={MessageSquare} label="Messages" />
                <QA to="students" icon={Users} label="My Students" />
                <QA to="attendance" icon={CalendarCheck} label="Attendance" />
                <QA to="assessments" icon={ClipboardList} label="Assessments" />
                <QA to="library" icon={BookOpen} label="Library" />
                <QA to="notifications" icon={Bell} label="Alerts" />
              </div>
            </Panel>
          </div>

          <div className="min-w-0 space-y-5">
            <Panel title="Today's Timetable">
              <div className="grid gap-3 md:grid-cols-3">
                {d.today.map((l) => (
                  <div key={l.start} className="rounded-lg border p-3">
                    <p className="font-display text-lg font-bold text-navy">{l.class}</p>
                    <p className="text-sm text-muted-foreground">{l.subject}</p>
                    <p className="mt-2 text-sm font-semibold text-success">{l.start} – {l.end} <span className="font-normal text-muted-foreground">· {l.room}</span></p>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel
              title={<span className="flex items-center gap-2"><Button size="icon" variant="ghost" onClick={() => setWeek(week - 1)} aria-label="Previous week"><ChevronLeft /></Button>{weekLabel(week)}<Button size="icon" variant="ghost" onClick={() => setWeek(week + 1)} aria-label="Next week"><ChevronRight /></Button></span>}
              action={<ToggleGroup type="single" value={view} onValueChange={(v) => v && setView(v)} variant="outline" size="sm"><ToggleGroupItem value="day">Day</ToggleGroupItem><ToggleGroupItem value="week">Week</ToggleGroupItem></ToggleGroup>}
            >
              <div className="overflow-x-auto">
                <div className={`grid min-w-[640px] gap-px overflow-hidden rounded-lg border bg-border ${view === "day" ? "grid-cols-1" : "grid-cols-7"}`}>
                  {(view === "day" ? ["Thu"] : DAYS).map((day) => (
                    <div key={day} className="min-h-72 bg-card p-1.5">
                      <p className="mb-1.5 text-center text-sm font-semibold text-navy">{day}</p>
                      <div className="space-y-1.5">
                        {d.lessons.filter((l) => l.day === day).map((l) => (
                          <div key={l.start} className={`rounded-md p-1.5 text-[11px] leading-tight ${SUBJ_TONE[l.subject]}`}>
                            <div className="font-semibold">{l.start}–{l.end}</div><div>{l.subject}</div><div className="opacity-80">{l.class}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Panel>
            <div>
              <h2 className="mb-3 text-base font-semibold text-navy">My Subjects</h2>
              <div className="grid gap-3 md:grid-cols-3">
                {d.subjects.map((sub, i) => (
                  <div key={sub.id} className={`flex items-center gap-3 rounded-xl border p-4 shadow-card ${i === 2 ? "bg-navy text-navy-foreground" : "bg-card"}`}>
                    <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-full font-display text-xl font-bold ${SUBJ_TONE[sub.name]}`}>{sub.name[0]}</span>
                    <div className="min-w-0"><p className="text-[11px] opacity-70">{sub.classes}</p><p className="font-display text-lg font-bold">{sub.name}</p>
                      <Link to="/portal/section/$key" params={{ key: "assessments" }} className="text-xs font-semibold text-info">View assessments</Link></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-3 text-base font-semibold text-navy">Announcements</h2>
              <div className="grid gap-3 md:grid-cols-3">
                {d.announcements.map((a) => (
                  <div key={a.id} className="rounded-xl border bg-card p-4 shadow-card">
                    <p className="font-semibold text-navy">{a.title}</p><p className="text-xs text-muted-foreground">{a.date}</p>
                    <span className="mt-2 inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs"><Megaphone className="h-3 w-3 text-primary" />Announcement</span>
                    <p className="mt-2 text-xs text-muted-foreground">{a.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </QueryState>
  );
}

function weekLabel(offset: number) {
  const base = new Date(2026, 9, 12 + offset * 7);
  return `Week of ${base.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`;
}
function Stat({ v, l, tone }: { v: number; l: string; tone: string }) {
  return <div><p className={`font-display text-4xl font-bold ${tone}`}>{v}</p><p className={`text-sm font-semibold ${tone}`}>{l}</p></div>;
}
function QA({ to, icon: I, label }: { to: string; icon: typeof Users; label: string }) {
  return <Link to="/portal/section/$key" params={{ key: to }} className="flex flex-col items-center gap-1 rounded-lg border bg-card p-3 text-center text-[11px] font-medium shadow-card hover:border-primary"><I className="h-7 w-7 text-info" />{label}</Link>;
}
