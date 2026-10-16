import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-in-up' | 'fade-in' | 'slide-in-left' | 'slide-in-right' | 'scale-in';
}

export function Reveal({ children, className = '', delay = 0, animation = 'fade-in-up' }: RevealProps) {
  return (
    <div
      className={`opacity-init ${className}`}
      style={{
        animation: `${animation} 0.6s ease-out ${delay}ms forwards`,
      }}
    >
      {children}
    </div>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  center?: boolean;
  className?: string;
}

export function SectionHeading({ eyebrow, title, subtitle, center, className = '' }: SectionHeadingProps) {
  return (
    <div className={`${center ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <div className={`eyebrow mb-3 ${center ? 'justify-center' : ''}`}>
          <span className="h-px w-8 bg-primary-500" />
          {eyebrow}
        </div>
      )}
      <h2 className="section-title text-balance">{title}</h2>
      {subtitle && <p className="section-subtitle mt-4 text-balance">{subtitle}</p>}
    </div>
  );
}

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export function CTASection({ title, description, buttonText, buttonLink, secondaryButtonText, secondaryButtonLink }: CTASectionProps) {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-primary-700 via-primary-800 to-neutral-900 px-6 py-16 lg:px-16 lg:py-20">
          <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20" />
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-500/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-secondary-500/20 blur-3xl" />
          <div className="relative z-10 text-center mx-auto max-w-3xl">
            <h2 className="text-display-md font-display font-bold text-white text-balance">{title}</h2>
            <p className="mt-5 text-lg text-primary-100 leading-relaxed text-balance">{description}</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={buttonLink} className="btn-accent btn-lg">
                {buttonText}
                <ArrowRight className="w-5 h-5" />
              </Link>
              {secondaryButtonText && secondaryButtonLink && (
                <Link to={secondaryButtonLink} className="btn-secondary btn-lg bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30">
                  {secondaryButtonText}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface StatProps {
  value: string;
  label: string;
  icon?: ReactNode;
}

export function StatCard({ value, label, icon }: StatProps) {
  return (
    <div className="text-center">
      {icon && <div className="flex justify-center mb-3 text-primary-600">{icon}</div>}
      <div className="text-4xl lg:text-5xl font-display font-bold text-neutral-900">{value}</div>
      <div className="mt-1 text-sm lg:text-base text-neutral-500 font-medium">{label}</div>
    </div>
  );
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb: { label: string; path?: string }[];
  image?: string;
}

export function PageHero({ title, subtitle, breadcrumb, image }: PageHeroProps) {
  return (
    <section className="relative pt-36 pb-16 lg:pt-44 lg:pb-20 bg-neutral-900 overflow-hidden">
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/80 via-neutral-900/70 to-primary-900/60" />
        </div>
      )}
      {!image && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-900 to-neutral-900" />
          <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20" />
        </>
      )}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-500/20 blur-3xl" />
      <div className="relative z-10 container-page">
        <nav className="flex items-center gap-2 text-sm text-primary-200 mb-4 animate-fade-in">
          {breadcrumb.map((bc, i) => (
            <span key={i} className="flex items-center gap-2">
              {bc.path ? (
                <Link to={bc.path} className="hover:text-white transition-colors">{bc.label}</Link>
              ) : (
                <span className="text-white">{bc.label}</span>
              )}
              {i < breadcrumb.length - 1 && <span className="text-primary-400">/</span>}
            </span>
          ))}
        </nav>
        <h1 className="text-display-lg font-display font-bold text-white text-balance animate-fade-in-up">{title}</h1>
        {subtitle && <p className="mt-4 text-lg lg:text-xl text-primary-100 max-w-2xl leading-relaxed animate-fade-in-up animate-delay-200">{subtitle}</p>}
      </div>
    </section>
  );
}

interface BadgeProps {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'neutral';
}

export function Badge({ children, color = 'primary' }: BadgeProps) {
  const colors = {
    primary: 'bg-primary-50 text-primary-700 border-primary-200',
    secondary: 'bg-secondary-50 text-secondary-700 border-secondary-200',
    accent: 'bg-accent-50 text-accent-700 border-accent-200',
    neutral: 'bg-neutral-100 text-neutral-600 border-neutral-200',
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${colors[color]}`}>
      {children}
    </span>
  );
}
