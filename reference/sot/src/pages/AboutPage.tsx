import { Reveal, SectionHeading, CTASection, PageHero } from '@/components/ui/Primitives';
import { schoolValues } from '@/data/schoolData';
import { Target, Eye, Heart, Award, Users, Building2, BookOpen, Trophy } from 'lucide-react';

export function AboutPage() {
  return (
    <>
      <PageHero
        title="Our Story"
        subtitle="From a small neighbourhood school to one of Kenya's most respected educational institutions — discover the journey, mission, and people behind Riverside Academy."
        breadcrumb={[{ label: 'Home', path: '/' }, { label: 'About' }]}
        image="https://images.pexels.com/photos/16086326/pexels-photo-16086326.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      {/* History */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal animation="slide-in-left">
              <div className="relative">
                <div className="rounded-4xl overflow-hidden shadow-soft-lg">
                  <img
                    src="https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                    alt="School campus"
                    className="w-full h-[480px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-accent-500 text-neutral-900 rounded-2xl shadow-soft-lg p-6 hidden sm:block">
                  <div className="text-3xl font-display font-bold">28</div>
                  <div className="text-sm font-semibold mt-1">Years of Service</div>
                </div>
              </div>
            </Reveal>
            <Reveal animation="slide-in-right" delay={100}>
              <div>
                <div className="eyebrow mb-4">
                  <span className="h-px w-8 bg-primary-500" />
                  Our History
                </div>
                <h2 className="section-title text-balance">A legacy of educational excellence since 1998</h2>
                <div className="mt-6 space-y-4 text-neutral-600 leading-relaxed">
                  <p>
                    Riverside Academy was founded in 1998 by a group of passionate educators who believed that every child deserves access to quality education in a nurturing environment. What began as a small primary school with 45 students has grown into a thriving institution serving over 1,200 students across primary and secondary levels.
                  </p>
                  <p>
                    In 2005, we expanded to include secondary education, and in 2012, we opened our boarding facilities to serve students from across Kenya. Today, our graduates study at top universities in Kenya and abroad, and our alumni are making their mark in every field — from medicine and engineering to arts and entrepreneurship.
                  </p>
                  <p>
                    Through every stage of growth, we have remained true to our founding principle: that education is not just about passing exams, but about forming individuals of character, competence, and conscience.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container-page">
          <SectionHeading center eyebrow="Milestones" title="A journey of growth and achievement" />
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-300 via-primary-400 to-secondary-400 lg:-translate-x-px" />
              {[
                { year: '1998', title: 'Founded', desc: 'Riverside Academy opens with 45 primary students and 4 teachers.', icon: Building2 },
                { year: '2005', title: 'Secondary School', desc: 'Expanded to offer secondary education with the first Form 1 intake.', icon: BookOpen },
                { year: '2012', title: 'Boarding Facilities', desc: 'Opened modern boarding houses to serve students from across Kenya.', icon: Users },
                { year: '2018', title: 'CBC Implementation', desc: 'Among the first schools in Nairobi to fully implement the Competency-Based Curriculum.', icon: Award },
                { year: '2025', title: 'Best KCSE Results', desc: 'Achieved 98.2% university qualification rate — the best in school history.', icon: Trophy },
              ].map((milestone, i) => (
                <Reveal key={milestone.year} delay={i * 100}>
                  <div className={`relative flex gap-6 lg:gap-12 mb-12 ${i % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                    <div className="hidden lg:block lg:w-1/2" />
                    <div className="absolute left-8 lg:left-1/2 w-4 h-4 rounded-full bg-primary-600 ring-4 ring-primary-100 lg:-translate-x-2 mt-1" />
                    <div className="flex-1 lg:w-1/2 pl-16 lg:pl-0">
                      <div className={`${i % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:pl-12'}`}>
                        <div className="flex items-center gap-3 mb-2">
                          <milestone.icon className="w-5 h-5 text-primary-600" />
                          <span className="text-2xl font-display font-bold text-primary-600">{milestone.year}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900">{milestone.title}</h3>
                        <p className="mt-2 text-sm text-neutral-500 leading-relaxed">{milestone.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-page">
          <div className="grid lg:grid-cols-3 gap-6">
            <Reveal>
              <div className="card p-8 h-full border-primary-100">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 mb-5">
                  <Target className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-display font-bold text-neutral-900">Our Mission</h3>
                <p className="mt-4 text-neutral-600 leading-relaxed">
                  To provide holistic, quality education that develops confident, competent, and compassionate individuals equipped to serve their communities and the world.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="card p-8 h-full border-secondary-100">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary-50 text-secondary-600 mb-5">
                  <Eye className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-display font-bold text-neutral-900">Our Vision</h3>
                <p className="mt-4 text-neutral-600 leading-relaxed">
                  To be the leading school in East Africa, recognised for academic excellence, character formation, and the development of global citizens who lead with integrity.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="card p-8 h-full border-accent-100">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-accent-50 text-accent-600 mb-5">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-display font-bold text-neutral-900">Our Philosophy</h3>
                <p className="mt-4 text-neutral-600 leading-relaxed">
                  Every child is unique and capable of excellence. We create an environment where each student is known by name, challenged to grow, and supported to succeed — academically, socially, and spiritually.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Our Core Values"
            title="The principles that guide our community"
            subtitle="These values shape our decisions, our teaching, and the way we treat every member of the Riverside family."
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {schoolValues.map((value, i) => (
              <Reveal key={value.title} delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100 card-hover h-full">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 mb-5">
                    <value.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-neutral-900">{value.title}</h3>
                  <p className="mt-3 text-sm text-neutral-500 leading-relaxed">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Come and see for yourself"
        description="We warmly invite you to visit our campus, meet our staff, and experience the Riverside difference firsthand."
        buttonText="Book a campus tour"
        buttonLink="/contact"
        secondaryButtonText="Meet our team"
        secondaryButtonLink="/leadership"
      />
    </>
  );
}

