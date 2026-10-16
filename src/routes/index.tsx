import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, PlayCircle, GraduationCap, Users, Presentation, Trophy, Star, Target, Eye, FlaskConical, Cpu, Volleyball, Palette, Languages, UserCheck, Building2, HeartHandshake, ShieldCheck, Globe, Lightbulb, ChevronLeft, ChevronRight, Shield } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/SiteLayout";
import { NewsCards } from "@/components/site/NewsCards";
import hero from "@/assets/hero.jpg";
import campus from "@/assets/campus.jpg";
import science from "@/assets/science.jpg";
import sports from "@/assets/sports.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Riverside Academy — Shaping Minds, Building Futures" },
      { name: "description", content: "Riverside Academy is a secondary school in Nairobi offering STEM, sports, arts and boarding. Admissions open for 2027." },
      { property: "og:title", content: "Riverside Academy — Shaping Minds, Building Futures" },
      { property: "og:description", content: "Secondary school in Nairobi offering STEM, sports, arts and boarding." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const STATS = [
  { icon: GraduationCap, v: "25+", l: "Years of Excellence" },
  { icon: Users, v: "1500+", l: "Students Enrolled" },
  { icon: Presentation, v: "120+", l: "Expert Teachers" },
  { icon: Trophy, v: "50+", l: "Awards Won" },
  { icon: Star, v: "98%", l: "Parent Satisfaction" },
];
const PROGRAMS = [
  { img: science, icon: FlaskConical, t: "STEM Program", d: "Building critical thinking and problem-solving skills through innovation.", hl: false },
  { img: campus, icon: Cpu, t: "Robotics Program", d: "Hands-on learning in robotics, coding and engineering.", hl: true },
  { img: sports, icon: Volleyball, t: "Sports Program", d: "Encouraging physical fitness, teamwork and leadership.", hl: false },
  { img: campus, icon: Palette, t: "Arts Program", d: "Nurturing creativity through visual and performing arts.", hl: true },
  { img: science, icon: Languages, t: "Language Program", d: "Building strong communication skills and language proficiency.", hl: false },
];
const WHY = [[UserCheck, "Experienced Faculty"], [Building2, "Modern Classrooms"], [HeartHandshake, "Holistic Development"], [ShieldCheck, "Safe & Secure Campus"], [Globe, "Global Perspective"], [Lightbulb, "Focus on Future Skills"]] as const;
const QUOTES = [
  { q: "Riverside has been a wonderful place for my child to grow academically and personally.", a: "Parent, Form 3" },
  { q: "The teachers are supportive and the environment is perfect for learning and exploring.", a: "Student, Form 4" },
  { q: "I'm glad my daughter is in a school that values character, confidence and creativity.", a: "Parent, Form 1" },
  { q: "Boarding life taught me independence and friendships I'll keep for life.", a: "Alumnus, 2024" },
];

function Home() {
  const [qi, setQi] = useState(0);
  const shown = [0, 1, 2].map((k) => QUOTES[(qi + k) % QUOTES.length]!);
  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-primary-soft">
        <img src={hero} alt="Riverside Academy students on campus" width={1536} height={864} className="absolute inset-y-0 right-0 h-full w-full object-cover md:w-[65%]" />
        <div className="absolute inset-0 bg-hero-fade" />
        <div className="relative mx-auto max-w-7xl px-4 pb-28 pt-16 md:pb-36 md:pt-20">
          <div className="max-w-md rounded-xl bg-primary-soft/85 p-4 md:bg-transparent md:p-0">
            <p className="text-sm font-bold tracking-wider text-primary">SHAPING MINDS. BUILDING FUTURES.</p>
            <h1 className="mt-4 text-5xl font-bold leading-[1.05] text-navy md:text-6xl">For A Better <span className="text-primary">Tomorrow</span></h1>
            <p className="mt-5 text-foreground/80">Empowering students with knowledge, values, and skills to become responsible global citizens.</p>
            <div className="mt-7 flex gap-3">
              <Button asChild size="lg"><Link to="/about">Explore More <ArrowRight /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/news">Watch Video <PlayCircle /></Link></Button>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-14 max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-4 rounded-xl bg-card p-6 shadow-card md:grid-cols-5 md:divide-x">
          {STATS.map((s) => (
            <div key={s.l} className="flex items-center gap-3 md:justify-center">
              <s.icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
              <div><div className="text-lg font-bold text-navy">{s.v}</div><div className="text-xs text-muted-foreground">{s.l}</div></div>
            </div>
          ))}
        </div>
      </div>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.1fr_1fr_1fr]">
        <div className="relative">
          <img src={campus} alt="Students studying on the lawn" loading="lazy" width={1024} height={640} className="h-64 w-full rounded-xl object-cover" />
          <div className="absolute -bottom-5 left-3 flex items-center gap-3 rounded-lg border-2 border-primary/30 bg-card px-4 py-2 shadow-card">
            <Shield className="h-7 w-7 text-primary" /><div><div className="text-sm font-semibold text-navy">Excellence in Education</div><div className="text-xs text-muted-foreground">Since 2001</div></div>
          </div>
        </div>
        <MV icon={Target} title="Our Mission" text="To provide a nurturing and inclusive environment that encourages academic excellence, creativity and character development to prepare students for a successful future." />
        <MV icon={Eye} title="Our Vision" text="To be a leading school recognised for delivering quality education and inspiring students to achieve their full potential and make a positive impact on the world." />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-navy">PROGRAMS WE OFFER</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">A wide range of academic and co-curricular programs designed to bring out the best in every student.</p>
        <div className="mt-8 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-5">
          {PROGRAMS.map((p) => (
            <div key={p.t} className="overflow-hidden rounded-xl border bg-card shadow-card">
              <img src={p.img} alt={p.t} loading="lazy" width={1024} height={640} className="h-28 w-full object-cover" />
              <div className="relative p-4 pt-7">
                <span className={`absolute -top-6 left-4 grid h-12 w-12 place-items-center rounded-full border-4 border-card ${p.hl ? "bg-highlight text-highlight-foreground" : "bg-primary text-primary-foreground"}`}><p.icon className="h-5 w-5" /></span>
                <h3 className="font-bold text-navy">{p.t}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.d}</p>
                <Link to="/academics" className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold ${p.hl ? "text-highlight" : "text-primary"}`}>Learn More <ArrowRight className="h-3 w-3" /></Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="text-center text-xl font-bold text-navy">WHY CHOOSE RIVERSIDE?</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 rounded-xl bg-muted p-5 md:grid-cols-6 md:divide-x md:divide-border">
          {WHY.map(([I, l]) => <div key={l} className="flex items-center gap-3 px-2 text-xs font-semibold text-navy"><I className="h-7 w-7 shrink-0 text-primary" strokeWidth={1.5} />{l}</div>)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-center text-lg font-bold text-navy">What Parents & Students Say</h2>
        <div className="mt-5 flex items-center gap-3">
          <Button size="icon" className="shrink-0 rounded-full" aria-label="Previous" onClick={() => setQi((qi + QUOTES.length - 1) % QUOTES.length)}><ChevronLeft /></Button>
          <div className="grid flex-1 gap-4 md:grid-cols-3">
            {shown.map((t) => (
              <figure key={t.q} className="rounded-xl border bg-card p-5 shadow-card">
                <div className="text-highlight">★★★★★</div>
                <blockquote className="mt-2 text-sm">“{t.q}”</blockquote>
                <figcaption className="mt-3 text-xs font-bold text-navy">– {t.a}</figcaption>
              </figure>
            ))}
          </div>
          <Button size="icon" className="shrink-0 rounded-full" aria-label="Next" onClick={() => setQi((qi + 1) % QUOTES.length)}><ChevronRight /></Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-col items-start justify-between gap-4 rounded-xl bg-banner p-8 text-primary-foreground md:flex-row md:items-center">
          <div className="flex items-center gap-5">
            <GraduationCap className="h-14 w-14 shrink-0" strokeWidth={1.2} />
            <div>
              <h3 className="text-2xl font-bold">ADMISSIONS OPEN FOR <span className="text-highlight">2027</span></h3>
              <p className="mt-1 text-sm opacity-90">Limited seats available! Enrol your child today and give them the best start for a bright future.</p>
            </div>
          </div>
          <Button asChild size="lg" className="bg-highlight text-highlight-foreground hover:bg-highlight/90"><Link to="/admissions">Apply Now <ArrowRight /></Link></Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-navy">Latest News & Events</h2>
          <Link to="/news" className="flex items-center gap-1 text-sm font-semibold text-primary">View All News <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <NewsCards />
      </section>
    </SiteLayout>
  );
}

function MV({ icon: I, title, text }: { icon: typeof Target; title: string; text: string }) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-lg font-bold text-navy"><I className="h-7 w-7 text-primary" />{title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-foreground/80">{text}</p>
      <Link to="/about" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Learn More <ArrowRight className="h-4 w-4" /></Link>
    </div>
  );
}
