import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions 2027 — Riverside Academy" },
      { name: "description", content: "How to apply to Riverside Academy: steps, requirements and an online enquiry form." },
      { property: "og:title", content: "Admissions 2027 — Riverside Academy" },
      { property: "og:description", content: "Steps, requirements and online enquiry." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Admissions,
});

const STEPS = ["Send an enquiry or visit the school", "Submit the application form and previous report cards", "Attend an interview and placement assessment", "Receive your offer and complete enrolment"];

function Admissions() {
  return (
    <SiteLayout>
      <PageHero eyebrow="ADMISSIONS OPEN" title="Join Riverside Academy" text="We welcome applications for Form 1 to Form 3. Day and boarding places available." />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-navy">How to apply</h2>
          <ol className="mt-5 space-y-4">
            {STEPS.map((s, i) => <li key={s} className="flex gap-4"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{i + 1}</span><span className="pt-1">{s}</span></li>)}
          </ol>
        </div>
        <EnquiryForm withGrade />
      </section>
    </SiteLayout>
  );
}
