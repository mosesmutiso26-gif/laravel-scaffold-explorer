import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { NewsCards } from "@/components/site/NewsCards";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Events — Riverside Academy" },
      { name: "description", content: "Latest news, announcements and events from Riverside Academy." },
      { property: "og:title", content: "News & Events — Riverside Academy" },
      { property: "og:description", content: "Latest news and events." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <SiteLayout>
      <PageHero eyebrow="NEWS & EVENTS" title="What's happening at Riverside" text="Announcements published by the school through the website editor." />
      <section className="mx-auto max-w-6xl px-4 py-14"><NewsCards limit={20} /></section>
    </SiteLayout>
  ),
});
