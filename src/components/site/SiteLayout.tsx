import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone, Send, Shield, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/academics", label: "Academics" },
  { to: "/admissions", label: "Admissions" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground"><Shield className="h-6 w-6" /></span>
      <span className="leading-none">
        <span className={`block font-display text-xl font-bold ${light ? "text-navy-foreground" : "text-navy"}`}>Riverside<span className="text-primary"> Academy</span></span>
        <span className={`text-[10px] font-semibold tracking-widest ${light ? "text-navy-foreground/70" : "text-muted-foreground"}`}>SECONDARY SCHOOL</span>
      </span>
    </Link>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: true }} className="text-sm font-semibold text-navy transition-colors hover:text-primary data-[status=active]:text-primary data-[status=active]:underline data-[status=active]:underline-offset-8">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="hidden sm:inline-flex"><Link to="/login">Portal login</Link></Button>
            <Button asChild><Link to="/admissions">Apply Now</Link></Button>
            <Sheet>
              <SheetTrigger asChild><Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu"><Menu /></Button></SheetTrigger>
              <SheetContent>
                <div className="mt-8 flex flex-col gap-4">
                  {NAV.map((n) => <Link key={n.to} to={n.to} className="font-semibold">{n.label}</Link>)}
                  <Link to="/login" className="font-semibold text-primary">Portal login</Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="bg-navy text-navy-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-5">
          <div className="md:col-span-1">
            <Logo light />
            <p className="mt-4 text-sm text-navy-foreground/75">Inspiring excellence, building character and empowering students to create a better tomorrow.</p>
            <div className="mt-4 flex gap-3 text-navy-foreground/80"><Facebook className="h-4 w-4" /><Instagram className="h-4 w-4" /><Youtube className="h-4 w-4" /></div>
          </div>
          <FooterCol title="Quick Links" links={[["About Us", "/about"], ["Academics", "/academics"], ["Admissions", "/admissions"], ["News & Events", "/news"], ["Contact Us", "/contact"]]} />
          <FooterCol title="Portals" links={[["Parents", "/login"], ["Students", "/login"], ["Staff", "/login"]]} />
          <div>
            <h4 className="mb-3 font-semibold">Contact Us</h4>
            <ul className="space-y-3 text-sm text-navy-foreground/80">
              <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0" />Riverside Drive, Nairobi</li>
              <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0" />+254 700 000 000</li>
              <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0" />info@riverside.ac.ke</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold">Newsletter</h4>
            <p className="mb-3 text-sm text-navy-foreground/80">Subscribe for latest updates and news.</p>
            <Link to="/contact" className="flex items-center justify-between rounded-md bg-card px-3 py-2 text-sm text-muted-foreground">Enter your email <Send className="h-4 w-4 text-primary" /></Link>
          </div>
        </div>
        <div className="border-t border-navy-foreground/10">
          <div className="mx-auto flex max-w-7xl justify-between px-4 py-4 text-xs text-navy-foreground/70">
            <span>© 2026 Riverside Academy. All Rights Reserved.</span><span>Privacy Policy | Terms & Conditions</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, "/about" | "/academics" | "/admissions" | "/news" | "/contact" | "/login"][] }) {
  return (
    <div>
      <h4 className="mb-3 font-semibold">{title}</h4>
      <ul className="space-y-2 text-sm text-navy-foreground/80">
        {links.map(([l, to]) => <li key={l}><Link to={to} className="hover:text-navy-foreground">{l}</Link></li>)}
      </ul>
    </div>
  );
}

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="bg-primary-soft">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <p className="text-sm font-bold tracking-wider text-primary">{eyebrow}</p>
        <h1 className="mt-2 text-4xl font-bold text-navy md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">{text}</p>
      </div>
    </section>
  );
}
