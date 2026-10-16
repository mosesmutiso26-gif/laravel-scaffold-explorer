import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Clock, CheckCircle2, Heart, Users, GraduationCap, Coffee } from 'lucide-react';
import { Reveal, SectionHeading, CTASection, PageHero, Badge } from '@/components/ui/Primitives';
import { careerOpenings } from '@/data/schoolData';

export function CareersPage() {
  return (
    <>
      <PageHero
        title="Careers at Riverside"
        subtitle="Join a passionate team of educators and professionals dedicated to shaping the next generation. Riverside Academy is a place to grow your career while making a lasting difference."
        breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Careers' }]}
        image="https://images.pexels.com/photos/34162714/pexels-photo-34162714.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      {/* Why work with us */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Why Riverside"
            title="More than a job — a calling"
            subtitle="We invest in our people because they are the heart of our school. When you join Riverside, you become part of a community that values excellence, integrity, and care."
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, title: 'Professional Growth', desc: 'Continuous training, mentorship, and sponsorship for further studies.' },
              { icon: Heart, title: 'Supportive Culture', desc: 'A collaborative, respectful, and family-friendly work environment.' },
              { icon: Users, title: 'Great Students', desc: 'Teach motivated, respectful students from diverse backgrounds.' },
              { icon: Coffee, title: 'Staff Benefits', desc: 'Competitive salaries, health insurance, meals, and pension scheme.' },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="card card-hover p-6 h-full text-center">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 mx-auto mb-4">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-bold text-neutral-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Open Positions"
            title="Current vacancies"
            subtitle="We're always looking for exceptional people to join our team. If you don't see a role that fits, we welcome general applications."
          />
          <div className="mt-14 max-w-4xl mx-auto space-y-6">
            {careerOpenings.map((opening, i) => (
              <Reveal key={opening.title} delay={i * 100}>
                <div className="card card-hover p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row items-start gap-6">
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex-shrink-0">
                      <Briefcase className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-xl font-display font-bold text-neutral-900">{opening.title}</h3>
                        <Badge color="primary">{opening.type}</Badge>
                      </div>
                      <p className="text-sm text-primary-600 font-semibold mb-3">{opening.department}</p>
                      <p className="text-sm text-neutral-600 leading-relaxed">{opening.description}</p>
                      <div className="mt-5">
                        <h4 className="text-sm font-semibold text-neutral-700 mb-3">Qualifications:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {opening.qualifications.map((q) => (
                            <div key={q} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-secondary-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-neutral-600">{q}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-6 flex items-center gap-4">
                        <Link to="/contact" className="btn-primary btn-sm">
                          Apply now
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                        <span className="text-xs text-neutral-400 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          Closes: November 30, 2026
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* General application */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-50 text-primary-600 mx-auto mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h2 className="section-title text-balance">Don't see the right role?</h2>
              <p className="mt-4 text-lg text-neutral-500 leading-relaxed">
                We're always interested in connecting with talented educators and professionals. Send us your CV and a cover letter, and we'll keep you in mind for future opportunities.
              </p>
              <div className="mt-8">
                <Link to="/contact" className="btn-primary btn-lg">
                  Send your CV
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to make a difference?"
        description="Take the first step toward a rewarding career at one of Kenya's leading schools."
        buttonText="Contact our HR team"
        buttonLink="/contact"
        secondaryButtonText="Learn about us"
        secondaryButtonLink="/about"
      />
    </>
  );
}
