import { BookOpen, GraduationCap, Trophy, Users, Clock, MapPin } from 'lucide-react';
import { Reveal, SectionHeading, CTASection, PageHero, Badge } from '@/components/ui/Primitives';
import { primarySubjects, secondarySubjects } from '@/data/schoolData';

export function AcademicsPage() {
  return (
    <>
      <PageHero
        title="Academic Programs"
        subtitle="From early years to KCSE, we offer a rigorous and enriching curriculum that prepares students for university and beyond."
        breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Academics' }]}
        image="https://images.pexels.com/photos/34162713/pexels-photo-34162713.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      {/* Approach */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal animation="slide-in-left">
              <div>
                <div className="eyebrow mb-4">
                  <span className="h-px w-8 bg-primary-500" />
                  Our Approach
                </div>
                <h2 className="section-title text-balance">Education that goes beyond the textbook</h2>
                <p className="mt-5 text-lg text-neutral-600 leading-relaxed">
                  We believe true education develops the whole person. Our approach blends the Kenyan curriculum with international best practices, ensuring students master content while also building critical thinking, creativity, and character.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    { title: 'Small class sizes', desc: 'Maximum 28 students per class for personalized attention.' },
                    { title: 'Continuous assessment', desc: 'Regular evaluation that tracks progress and identifies needs early.' },
                    { title: 'Technology-integrated learning', desc: 'Smart classrooms and computer labs enhance every subject.' },
                    { title: 'Remedial & extension programs', desc: 'Tailored support for students who need extra help or greater challenge.' },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary-50 text-secondary-600 flex-shrink-0">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 text-sm">{item.title}</h3>
                        <p className="text-sm text-neutral-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal animation="scale-in" delay={100}>
              <div className="relative">
                <div className="rounded-4xl overflow-hidden shadow-soft-lg">
                  <img
                    src="https://images.pexels.com/photos/8617938/pexels-photo-8617938.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                    alt="Students learning"
                    className="w-full h-[500px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-soft-lg p-6 hidden sm:block">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent-100 text-accent-700">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-display font-bold text-neutral-900">A-</div>
                      <div className="text-xs text-neutral-500">Avg. KCSE Grade 2025</div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Primary School */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container-page">
          <div className="flex flex-col lg:flex-row items-start gap-4 mb-12">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-100 text-primary-600">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <h2 className="section-title">Primary School</h2>
              <p className="section-subtitle mt-2">PP1 through Grade 6 — Competency-Based Curriculum</p>
            </div>
          </div>

          <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl mb-12">
            Our primary school lays a strong foundation in literacy, numeracy, and life skills. Following the Kenyan CBC framework, we focus on developing competencies through activity-based, learner-centered pedagogy.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {primarySubjects.map((subject, i) => (
              <Reveal key={subject.name} delay={i * 80}>
                <div className="card card-hover p-6 h-full">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 text-primary-600 mb-4">
                    <subject.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-semibold text-neutral-900">{subject.name}</h3>
                  <p className="mt-2 text-sm text-neutral-500">{subject.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary School */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-page">
          <div className="flex flex-col lg:flex-row items-start gap-4 mb-12">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary-100 text-secondary-600">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <h2 className="section-title">Senior School</h2>
              <p className="section-subtitle mt-2">Form 1 through Form 4 — KCSE Preparation</p>
            </div>
          </div>

          <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl mb-12">
            Our secondary school prepares students for the Kenya Certificate of Secondary Education with a comprehensive curriculum, experienced teachers, and a strong focus on career guidance. Students choose pathways that align with their strengths and aspirations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {secondarySubjects.map((subject, i) => (
              <Reveal key={subject.name} delay={i * 80}>
                <div className="card card-hover p-6 h-full">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary-50 text-secondary-600 mb-4">
                    <subject.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-semibold text-neutral-900">{subject.name}</h3>
                  <p className="mt-2 text-sm text-neutral-500">{subject.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Co-curricular */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Beyond the Classroom"
            title="Co-curricular programs that build well-rounded students"
            subtitle="We offer a rich program of sports, clubs, and creative activities that complement academic learning."
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Trophy, title: 'Sports', desc: 'Football, basketball, athletics, swimming, volleyball, and tennis.' },
              { icon: Users, title: 'Clubs & Societies', desc: 'Debate, drama, science club, environmental club, and journalism.' },
              { icon: BookOpen, title: 'Music & Arts', desc: 'Choir, orchestra, art club, and annual music concerts.' },
              { icon: MapPin, title: 'Field Trips', desc: 'Educational excursions and international study tours.' },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="card card-hover p-6 text-center h-full">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 mx-auto mb-4">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-bold text-neutral-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-neutral-500">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Calendar */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-page">
          <SectionHeading center eyebrow="Academic Calendar" title="The 2026 school year at a glance" />
          <div className="mt-14 max-w-4xl mx-auto">
            <div className="space-y-4">
              {[
                { term: 'Term 1', dates: 'January 6 — April 11', highlights: 'Opening, mid-term, parent-teacher conferences, sports day' },
                { term: 'Term 2', dates: 'May 5 — August 8', highlights: 'Mid-term examinations, science fair, music concert, open day' },
                { term: 'Term 3', dates: 'September 1 — December 5', highlights: 'KCSE examinations, end-year exams, prize giving, carol service' },
              ].map((item, i) => (
                <Reveal key={item.term} delay={i * 100}>
                  <div className="card card-hover p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                    <div className="flex items-center gap-3 sm:w-40">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-600 text-white">
                        <Clock className="w-5 h-5" />
                      </div>
                      <span className="font-display font-bold text-neutral-900">{item.term}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-primary-600 text-sm">{item.dates}</p>
                      <p className="text-sm text-neutral-500 mt-1">{item.highlights}</p>
                    </div>
                    <Badge color="secondary">2026</Badge>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Is Riverside the right fit for your child?"
        description="Learn about our admissions process, or schedule a visit to see our classrooms in action."
        buttonText="Explore admissions"
        buttonLink="/admissions"
        secondaryButtonText="Contact us"
        secondaryButtonLink="/contact"
      />
    </>
  );
}
