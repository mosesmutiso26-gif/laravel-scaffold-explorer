import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Riverside Academy" },
      { name: "description", content: "Get in touch with Riverside Academy in Nairobi." },
      { property: "og:title", content: "Contact Riverside Academy" },
      { property: "og:description", content: "Address, phone, email and enquiry form." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <SiteLayout>
      <PageHero eyebrow="CONTACT US" title="We'd love to hear from you" text="Questions about admissions, fees or visiting? Send us a message." />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2">
        <ul className="space-y-5">
          {[[MapPin, "Riverside Drive, Nairobi"], [Phone, "+254 700 000 000"], [Mail, "info@riverside.ac.ke"], [Clock, "Mon–Fri, 8:00 – 17:00"]].map(([I, t]) => {
            const Icon = I as typeof MapPin;
            return <li key={t as string} className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span>{t as string}</li>;
          })}
        </ul>
        <EnquiryForm />
      </section>
    </SiteLayout>
  ),
});
