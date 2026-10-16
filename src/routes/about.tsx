import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import campus from "@/assets/campus.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Riverside Academy" },
      { name: "description", content: "History, mission, vision and values of Riverside Academy, Nairobi." },
      { property: "og:title", content: "About Riverside Academy" },
      { property: "og:description", content: "Our history, mission, vision and values." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: About,
});

const VALUES = [["Integrity", "We do the right thing, even when no one is watching."], ["Excellence", "We pursue the highest standards in learning and conduct."], ["Respect", "We value every person and every voice."], ["Service", "We give back to our community and country."]];

function About() {
  return (
    <SiteLayout>
      <PageHero eyebrow="ABOUT US" title="Twenty-five years of shaping futures" text="Founded in 2001 on the banks of the Nairobi River, Riverside Academy has grown from 80 students to a thriving day and boarding secondary school." />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2">
        <img src={campus} alt="Students at Riverside" loading="lazy" width={1024} height={640} className="rounded-xl object-cover shadow-card" />
        <div>
          <h2 className="text-2xl font-bold text-navy">Our story</h2>
          <p className="mt-4 text-foreground/80">Riverside Academy offers a broad curriculum alongside sport, arts and leadership. Our graduates go on to leading universities in Kenya and abroad.</p>
          <h3 className="mt-8 text-lg font-bold text-navy">Our values</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {VALUES.map(([t, d]) => <div key={t} className="rounded-lg border bg-card p-4"><div className="font-semibold text-primary">{t}</div><p className="mt-1 text-sm text-muted-foreground">{d}</p></div>)}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
