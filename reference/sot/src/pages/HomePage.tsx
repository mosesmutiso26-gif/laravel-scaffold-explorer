import { Link } from 'react-router-dom';
import {
  ArrowRight,
  GraduationCap,
  BookOpen,
  Trophy,
  Users,
  BedDouble,
  Star,
  Quote,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { Reveal, SectionHeading, CTASection, StatCard } from '@/components/ui/Primitives';
import { facilities, newsArticles, schoolValues } from '@/data/schoolData';

export function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-neutral-900">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/37898351/pexels-photo-37898351.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Students in classroom"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/90 via-neutral-900/75 to-primary-900/50" />
        </div>
        <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-10" />
        <div className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-primary-500/15 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-secondary-500/10 blur-3xl" />

        <div className="relative z-10 container-wide py-20 lg:py-0">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6 animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm text-white font-medium">
                <Star className="w-4 h-4 text-accent-400" />
                Top 10 KCSE School in Kenya — 2025
              </span>
            </div>
            <h1 className="text-display-xl lg:text-display-2xl font-display font-bold text-white leading-tight text-balance animate-fade-in-up animate-delay-200">
              Nurturing minds.<br />
              Building character.<br />
              <span className="bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">Shaping futures.</span>
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-neutral-200 leading-relaxed max-w-2xl animate-fade-in-up animate-delay-300">
              Riverside Academy is a premier Kenyan day and boarding school offering excellence in primary and secondary education. Join a community where every child is known, valued, and empowered to thrive.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-in-up animate-delay-400">
              <Link to="/admissions" className="btn-accent btn-lg">
                Apply for 2027
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/about" className="btn-secondary btn-lg bg-white/10 border-white/20 text-white hover:bg-white/20">
                Discover Riverside
              </Link>
            </div>

            {/* Quick facts */}
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 animate-fade-in-up animate-delay-500">
              {[
                { icon: Users, label: '1,200+ Students' },
                { icon: GraduationCap, label: '98% University Entry' },
                { icon: BedDouble, label: 'Day & Boarding' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-neutral-300">
                  <Icon className="w-5 h-5 text-primary-400" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block">
          <div className="flex flex-col items-center gap-2 text-neutral-400">
            <span className="text-xs uppercase tracking-wider">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-neutral-400 to-transparent" />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-neutral-100">
        <div className="container-page py-12 lg:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Reveal><StatCard value="1,200+" label="Students Enrolled" icon={<Users className="w-8 h-8" />} /></Reveal>
            <Reveal delay={100}><StatCard value="85+" label="Teaching Staff" icon={<GraduationCap className="w-8 h-8" />} /></Reveal>
            <Reveal delay={200}><StatCard value="98%" label="University Qualification" icon={<BookOpen className="w-8 h-8" />} /></Reveal>
            <Reveal delay={300}><StatCard value="28" label="Years of Excellence" icon={<Trophy className="w-8 h-8" />} /></Reveal>
          </div>
        </div>
      </section>

      {/* Welcome / About preview */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal animation="slide-in-left">
              <div className="relative">
                <div className="relative rounded-4xl overflow-hidden shadow-soft-lg">
                  <img
                    src="https://images.pexels.com/photos/14909652/pexels-photo-14909652.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                    alt="Riverside Academy students"
                    className="w-full h-[520px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-white rounded-2xl shadow-soft-lg p-6 max-w-[240px] hidden sm:block">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary-100 text-secondary-600">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-display font-bold text-neutral-900">#3</div>
                      <div className="text-xs text-neutral-500">In Nairobi County</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -left-6 lg:-left-12 bg-primary-600 text-white rounded-2xl shadow-soft-lg p-6 max-w-[200px] hidden sm:block">
                  <div className="text-3xl font-display font-bold">1998</div>
                  <div className="text-sm text-primary-100 mt-1">Established</div>
                </div>
              </div>
            </Reveal>

            <Reveal animation="slide-in-right" delay={100}>
              <div>
                <div className="eyebrow mb-4">
                  <span className="h-px w-8 bg-primary-500" />
                  Welcome to Riverside
                </div>
                <h2 className="section-title text-balance">
                  A school where every child is known, valued, and empowered
                </h2>
                <p className="mt-5 text-lg text-neutral-600 leading-relaxed">
                  For nearly three decades, Riverside Academy has been at the forefront of quality education in Kenya. We combine rigorous academics with strong character formation, preparing students not just for examinations, but for life.
                </p>
                <p className="mt-4 text-neutral-500 leading-relaxed">
                  Our experienced teachers, modern facilities, and nurturing environment ensure that every student discovers their strengths and develops the confidence to pursue their dreams.
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'CBC & KCSE curriculum',
                    'Day and boarding options',
                    'Modern science & computer labs',
                    'Transport across Nairobi',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-neutral-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link to="/about" className="btn-primary">
                    Learn more about us
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Our Core Values"
            title="The principles that guide everything we do"
            subtitle="Our values are not just words on a wall — they are lived out daily in our classrooms, on our fields, and in our community."
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {schoolValues.map((value, i) => (
              <Reveal key={value.title} delay={i * 100}>
                <div className="card card-hover p-6 h-full">
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

      {/* Academics preview */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-primary-50/50 to-white">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
                <SectionHeading
                  eyebrow="Academic Programs"
                  title="Excellence from foundation to graduation"
                  subtitle="We offer a seamless educational journey from primary through secondary, following the Kenyan CBC and KCSE curricula with a commitment to depth, relevance, and critical thinking."
                />
                <div className="mt-8 space-y-4">
                  {[
                    { title: 'Primary School (PP1 — Grade 6)', desc: 'Competency-Based Curriculum with a focus on literacy, numeracy, and holistic development.' },
                    { title: 'Junior School (Grade 7 — 9)', desc: 'Broad-based learning with exploratory pathways and a strong foundation for senior school.' },
                    { title: 'Senior School (Form 1 — 4)', desc: 'KCSE preparation with STEM, humanities, and technical pathways, plus comprehensive career guidance.' },
                  ].map((program) => (
                    <div key={program.title} className="flex gap-4 p-5 card card-hover">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex-shrink-0">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900">{program.title}</h3>
                        <p className="text-sm text-neutral-500 mt-1">{program.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Link to="/academics" className="btn-primary">
                    Explore academics
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
            </Reveal>

            <Reveal animation="scale-in" delay={100}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-3xl overflow-hidden shadow-soft">
                    <img src="https://images.pexels.com/photos/34162713/pexels-photo-34162713.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Classroom" className="w-full h-56 object-cover" />
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-soft">
                    <img src="https://images.pexels.com/photos/8471913/pexels-photo-8471913.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Science lab" className="w-full h-40 object-cover" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-3xl overflow-hidden shadow-soft">
                    <img src="https://images.pexels.com/photos/9572664/pexels-photo-9572664.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Library" className="w-full h-40 object-cover" />
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-soft">
                    <img src="https://images.pexels.com/photos/8617938/pexels-photo-8617938.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Students learning" className="w-full h-56 object-cover" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Facilities preview */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="World-Class Facilities"
            title="Spaces designed for learning and growth"
            subtitle="Our campus is equipped with modern facilities that support academic excellence, athletic achievement, and creative expression."
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.slice(0, 3).map((facility, i) => (
              <Reveal key={facility.title} delay={i * 100}>
                <div className="group relative rounded-3xl overflow-hidden shadow-soft cursor-pointer h-80">
                  <img src={facility.image} alt={facility.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/20 backdrop-blur-md text-white">
                        <facility.icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-xl font-display font-bold text-white">{facility.title}</h3>
                    <p className="mt-2 text-sm text-neutral-200 leading-relaxed">{facility.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/facilities" className="btn-secondary">
              View all facilities
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 lg:py-28 bg-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-10" />
        <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-primary-500/15 blur-3xl" />
        <div className="relative z-10 container-page">
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="w-12 h-12 text-primary-500 mx-auto mb-6" />
            <blockquote className="text-2xl lg:text-3xl font-serif text-white leading-relaxed text-balance">
              "Riverside Academy didn't just educate my daughter — it transformed her. She arrived as a quiet, uncertain girl and graduated as a confident young woman ready to take on the world. The teachers truly know and care for each child."
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-display font-bold text-lg">
                WN
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">Wanjiku Njoroge</div>
                <div className="text-sm text-neutral-400">Parent, Class of 2025</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News preview */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
            <SectionHeading
              eyebrow="Latest News"
              title="What's happening at Riverside"
              subtitle="Stay up to date with the latest achievements, events, and stories from our school community."
            />
            <Link to="/news" className="btn-ghost text-primary-600 hover:text-primary-700">
              All news
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.slice(0, 3).map((article, i) => (
              <Reveal key={article.id} delay={i * 100}>
                <Link to="/news" className="group block card card-hover overflow-hidden h-full">
                  <div className="relative h-52 overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-white/90 backdrop-blur-sm text-primary-700">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(article.date).toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <h3 className="font-display font-bold text-neutral-900 text-lg leading-snug group-hover:text-primary-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="mt-3 text-sm text-neutral-500 leading-relaxed">{article.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to join the Riverside family?"
        description="Applications for the 2027 academic year are now open. Secure your child's place at one of Kenya's leading schools."
        buttonText="Start your application"
        buttonLink="/admissions"
        secondaryButtonText="Visit our campus"
        secondaryButtonLink="/contact"
      />
    </>
  );
}
