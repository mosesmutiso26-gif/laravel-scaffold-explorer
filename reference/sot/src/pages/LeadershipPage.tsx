import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Mail, Linkedin } from 'lucide-react';
import { Reveal, SectionHeading, CTASection, PageHero, Badge } from '@/components/ui/Primitives';
import { leaders, teachers } from '@/data/schoolData';

export function LeadershipPage() {
  return (
    <>
      <PageHero
        title="Our Leadership Team"
        subtitle="Experienced, dedicated, and passionate educators who guide Riverside Academy with wisdom and care."
        breadcrumb={[{ label: 'Home', path: '/' }, { label: 'About', path: '/about' }, { label: 'Leadership' }]}
        image="https://images.pexels.com/photos/37898351/pexels-photo-37898351.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      {/* Directors */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Senior Leadership"
            title="Meet the people leading our school"
            subtitle="Our leadership team brings decades of combined experience in education, operations, and student welfare."
          />

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {leaders.map((leader, i) => (
              <Reveal key={leader.name} delay={i * 100}>
                <div className="card card-hover overflow-hidden h-full">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-2/5 relative overflow-hidden">
                      <img src={leader.image} alt={leader.name} className="w-full h-64 sm:h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/30 to-transparent" />
                    </div>
                    <div className="sm:w-3/5 p-6 lg:p-8">
                      <h3 className="text-xl font-display font-bold text-neutral-900">{leader.name}</h3>
                      <p className="text-primary-600 font-semibold text-sm mt-1">{leader.title}</p>
                      <p className="mt-4 text-sm text-neutral-600 leading-relaxed">{leader.bio}</p>
                      <div className="mt-5 pt-5 border-t border-neutral-100">
                        <div className="flex items-center gap-2 text-xs text-neutral-500">
                          <GraduationCap className="w-4 h-4 text-primary-500" />
                          {leader.qualifications}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-3">
                        <a href="#" className="flex items-center justify-center w-9 h-9 rounded-lg bg-neutral-100 text-neutral-500 hover:bg-primary-600 hover:text-white transition-all">
                          <Mail className="w-4 h-4" />
                        </a>
                        <a href="#" className="flex items-center justify-center w-9 h-9 rounded-lg bg-neutral-100 text-neutral-500 hover:bg-primary-600 hover:text-white transition-all">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Our Teachers"
            title="Dedicated educators who make the difference"
            subtitle="Our teaching staff are the heart of Riverside. They are subject experts, mentors, and role models who go above and beyond for their students."
          />

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((teacher, i) => (
              <Reveal key={teacher.name} delay={i * 80}>
                <div className="card card-hover overflow-hidden group h-full">
                  <div className="relative h-64 overflow-hidden">
                    <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <Badge color="primary">{teacher.department}</Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-bold text-lg text-neutral-900">{teacher.name}</h3>
                    <p className="text-primary-600 font-semibold text-sm mt-1">{teacher.subject}</p>
                    <div className="mt-4 flex items-center justify-between text-sm text-neutral-500">
                      <span>{teacher.experience} experience</span>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-4 h-4" />
                        TSC Certified
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-neutral-500 mb-6">We have 85+ qualified teachers across all departments.</p>
            <Link to="/contact" className="btn-primary">
              Join our teaching team
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-page">
          <SectionHeading center eyebrow="Departments" title="Excellence across every discipline" />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'STEM', desc: 'Mathematics, Physics, Chemistry, Biology, and Computer Science.', count: '22 teachers' },
              { name: 'Languages', desc: 'English, Kiswahili, French, and Literature.', count: '15 teachers' },
              { name: 'Humanities', desc: 'History, Geography, CRE, and Social Studies.', count: '18 teachers' },
              { name: 'Creative & Technical', desc: 'Music, Art, PE, Home Science, and Business Studies.', count: '12 teachers' },
            ].map((dept, i) => (
              <Reveal key={dept.name} delay={i * 100}>
                <div className="card card-hover p-6 h-full">
                  <h3 className="font-display font-bold text-lg text-neutral-900">{dept.name}</h3>
                  <p className="mt-3 text-sm text-neutral-500 leading-relaxed">{dept.desc}</p>
                  <div className="mt-4 pt-4 border-t border-neutral-100 text-xs font-semibold text-primary-600">{dept.count}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want to meet our team in person?"
        description="Schedule a visit to our campus and experience the warmth and professionalism of the Riverside community."
        buttonText="Book a visit"
        buttonLink="/contact"
        secondaryButtonText="View open positions"
        secondaryButtonLink="/careers"
      />
    </>
  );
}
