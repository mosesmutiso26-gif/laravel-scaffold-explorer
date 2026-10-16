import { Reveal, SectionHeading, CTASection, PageHero } from '@/components/ui/Primitives';
import { facilities } from '@/data/schoolData';
import { CheckCircle2, Wifi, Car, Shield, Zap, Droplets } from 'lucide-react';

export function FacilitiesPage() {
  return (
    <>
      <PageHero
        title="Our Facilities"
        subtitle="A modern, well-resourced campus designed to support every aspect of student learning, growth, and well-being."
        breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Facilities' }]}
        image="https://images.pexels.com/photos/16086326/pexels-photo-16086326.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      {/* Infrastructure highlights */}
      <section className="py-12 bg-white border-b border-neutral-100">
        <div className="container-page">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
            {[
              { icon: Wifi, label: 'Campus WiFi' },
              { icon: Car, label: 'Ample Parking' },
              { icon: Shield, label: '24/7 Security' },
              { icon: Zap, label: 'Backup Power' },
              { icon: Droplets, label: 'Clean Water' },
              { icon: CheckCircle2, label: 'CCTV Monitored' },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 50}>
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 text-primary-600 mb-2">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-600">{item.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities grid */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Explore Our Campus"
            title="Spaces that inspire learning"
            subtitle="Every facility on our campus has been designed and equipped to support our students' academic, physical, and creative development."
          />
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {facilities.map((facility, i) => (
              <Reveal key={facility.title} delay={i * 80}>
                <div className="card card-hover overflow-hidden h-full">
                  <div className="relative h-64 overflow-hidden">
                    <img src={facility.image} alt={facility.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/20 backdrop-blur-md text-white">
                          <facility.icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-display font-bold text-white">{facility.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-neutral-600 leading-relaxed">{facility.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-wide">
          <SectionHeading center eyebrow="Campus Gallery" title="A glimpse of life at Riverside" />
          <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              'https://images.pexels.com/photos/37898351/pexels-photo-37898351.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
              'https://images.pexels.com/photos/14909652/pexels-photo-14909652.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
              'https://images.pexels.com/photos/8471913/pexels-photo-8471913.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
              'https://images.pexels.com/photos/9572664/pexels-photo-9572664.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
              'https://images.pexels.com/photos/19461117/pexels-photo-19461117.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
              'https://images.pexels.com/photos/34162719/pexels-photo-34162719.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
              'https://images.pexels.com/photos/8617938/pexels-photo-8617938.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
              'https://images.pexels.com/photos/18449719/pexels-photo-18449719.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
            ].map((src, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="group relative rounded-2xl overflow-hidden aspect-square cursor-pointer">
                  <img src={src} alt={`Campus ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/20 transition-colors duration-300" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Boarding section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-primary-50/50 to-white">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal animation="slide-in-left">
              <div className="relative">
                <div className="rounded-4xl overflow-hidden shadow-soft-lg">
                  <img
                    src="https://images.pexels.com/photos/32170336/pexels-photo-32170336.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                    alt="Boarding facilities"
                    className="w-full h-[480px] object-cover"
                  />
                </div>
              </div>
            </Reveal>
            <Reveal animation="slide-in-right" delay={100}>
              <div>
                <div className="eyebrow mb-4">
                  <span className="h-px w-8 bg-primary-500" />
                  Boarding at Riverside
                </div>
                <h2 className="section-title text-balance">A home away from home</h2>
                <p className="mt-5 text-lg text-neutral-600 leading-relaxed">
                  Our boarding houses provide a safe, structured, and nurturing environment where students from across Kenya can thrive. Each house is led by dedicated house parents who provide pastoral care and supervision.
                </p>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'Separate houses for boys and girls',
                    'Dedicated house parents on-site',
                    'Evening study with teacher support',
                    'Three nutritious meals daily',
                    'Weekend activities and outings',
                    'Health clinic access 24/7',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-neutral-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection
        title="See our campus in person"
        description="Photographs can only show so much. We invite you to visit and experience the Riverside campus for yourself."
        buttonText="Schedule a tour"
        buttonLink="/contact"
      />
    </>
  );
}
