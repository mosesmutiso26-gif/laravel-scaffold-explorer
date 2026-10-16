import { createFileRoute } from "@tanstack/react-router";
import { FlaskConical, Monitor, BookOpen, Volleyball, BedDouble, Bus } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import science from "@/assets/science.jpg";
import sports from "@/assets/sports.jpg";

export const Route = createFileRoute("/academics")({
  head: () => ({
    meta: [
      { title: "Academics & Facilities — Riverside Academy" },
      { name: "description", content: "Subjects, laboratories, computer labs, library, sports, boarding and transport at Riverside Academy." },
      { property: "og:title", content: "Academics & Facilities — Riverside Academy" },
      { property: "og:description", content: "Subjects, labs, library, sports, boarding and transport." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Academics,
});

const FAC = [
  [FlaskConical, "Science laboratories", "Fully equipped biology, chemistry and physics labs."],
  [Monitor, "Computer laboratories", "Two ICT labs with 40 workstations and coding clubs."],
  [BookOpen, "Library", "Over 8,000 titles and quiet study spaces."],
  [Volleyball, "Sports", "Football, rugby, hockey, basketball and athletics."],
  [BedDouble, "Boarding", "Six supervised houses with resident matrons."],
  [Bus, "Transport", "Seven daily routes across Nairobi."],
] as const;

function Academics() {
  return (
    <SiteLayout>
      <PageHero eyebrow="ACADEMICS" title="Learning that goes further" text="A rigorous curriculum from Form 1 to Form 4 with sciences, languages, humanities, technical subjects and co-curricular programmes." />
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 md:grid-cols-2">
          <img src={science} alt="Science lab" loading="lazy" width={1024} height={640} className="h-64 w-full rounded-xl object-cover" />
          <img src={sports} alt="Sports field" loading="lazy" width={1024} height={640} className="h-64 w-full rounded-xl object-cover" />
        </div>
        <h2 className="mt-12 text-2xl font-bold text-navy">Facilities</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FAC.map(([I, t, d]) => (
            <div key={t} className="rounded-xl border bg-card p-5 shadow-card"><I className="h-8 w-8 text-primary" /><h3 className="mt-3 font-bold text-navy">{t}</h3><p className="mt-1 text-sm text-muted-foreground">{d}</p></div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
