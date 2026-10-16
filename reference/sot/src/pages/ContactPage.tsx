import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { Reveal, SectionHeading, PageHero } from '@/components/ui/Primitives';

export function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <PageHero
        title="Get in Touch"
        subtitle="We'd love to hear from you. Whether you have a question about admissions, want to schedule a visit, or need any other information — our team is ready to help."
        breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Contact' }]}
        image="https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      {/* Contact cards */}
      <section className="py-16 bg-white border-b border-neutral-100">
        <div className="container-page">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Phone, title: 'Call Us', lines: ['+254 700 123 456', '+254 700 654 321'], action: 'tel:+254700123456' },
              { icon: Mail, title: 'Email Us', lines: ['info@riversideacademy.ac.ke', 'admissions@riversideacademy.ac.ke'], action: 'mailto:info@riversideacademy.ac.ke' },
              { icon: MapPin, title: 'Visit Us', lines: ['Riverside Drive, Off Ngong Road', 'Nairobi, Kenya'], action: '#map' },
              { icon: Clock, title: 'Office Hours', lines: ['Mon — Fri: 7:30 AM — 5:00 PM', 'Sat: 8:00 AM — 12:00 PM'], action: null },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 80}>
                <div className="card p-6 text-center h-full card-hover">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 mx-auto mb-4">
                    <card.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-bold text-neutral-900">{card.title}</h3>
                  <div className="mt-3 space-y-1">
                    {card.lines.map((line) => (
                      <p key={line} className="text-sm text-neutral-500">{line}</p>
                    ))}
                  </div>
                  {card.action && (
                    <a href={card.action} className="mt-3 inline-block text-sm font-semibold text-primary-600 hover:text-primary-700">
                      Get in touch
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Form */}
            <Reveal animation="slide-in-left">
              <div>
                <div className="eyebrow mb-4">
                  <span className="h-px w-8 bg-primary-500" />
                  Send a Message
                </div>
                <h2 className="section-title text-balance">We'll get back to you within 24 hours</h2>
                <p className="mt-4 text-neutral-600 leading-relaxed">
                  Fill out the form and our team will respond promptly. For admissions-specific enquiries, please use the admissions form.
                </p>

                {formSubmitted ? (
                  <div className="mt-8 card p-8 text-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-secondary-100 text-secondary-600 mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-neutral-900">Message sent!</h3>
                    <p className="mt-3 text-neutral-500">
                      Thank you for reaching out. We've received your message and will respond within 24 hours.
                    </p>
                    <button onClick={() => setFormSubmitted(false)} className="btn-secondary mt-6">
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    <div>
                      <label className="label-field">Full Name *</label>
                      <input required type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} className="input-field" placeholder="Your name" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label-field">Email *</label>
                        <input required type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className="input-field" placeholder="you@email.com" />
                      </div>
                      <div>
                        <label className="label-field">Phone</label>
                        <input type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} className="input-field" placeholder="+254 700 000 000" />
                      </div>
                    </div>
                    <div>
                      <label className="label-field">Subject *</label>
                      <select required value={formData.subject} onChange={(e) => handleChange('subject', e.target.value)} className="input-field">
                        <option value="General Enquiry">General Enquiry</option>
                        <option value="Admissions">Admissions</option>
                        <option value="Fees & Payments">Fees & Payments</option>
                        <option value="Careers">Careers</option>
                        <option value="Media & Press">Media & Press</option>
                        <option value="Alumni">Alumni</option>
                      </select>
                    </div>
                    <div>
                      <label className="label-field">Message *</label>
                      <textarea required value={formData.message} onChange={(e) => handleChange('message', e.target.value)} className="input-field min-h-[140px]" placeholder="How can we help you?" />
                    </div>
                    <button type="submit" className="btn-primary w-full">
                      <Send className="w-4 h-4" />
                      Send message
                    </button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Map + info */}
            <Reveal animation="slide-in-right" delay={100}>
              <div id="map">
                <div className="rounded-3xl overflow-hidden shadow-soft h-80 mb-6">
                  <iframe
                    title="Riverside Academy Location"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=36.78%2C-1.30%2C36.82%2C-1.27&layer=mapnik&marker=-1.285,36.80"
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                </div>

                <div className="card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-50 text-primary-600">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-neutral-900">Our Location</h3>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Riverside Academy is located on Riverside Drive, off Ngong Road in Nairobi. We are easily accessible from all major Nairobi neighbourhoods, with dedicated school bus routes covering the greater Nairobi area.
                  </p>
                  <div className="mt-4 pt-4 border-t border-neutral-100 space-y-3">
                    <div className="flex items-start gap-3 text-sm">
                      <MessageSquare className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-neutral-700">Admissions Office:</span>
                        <span className="text-neutral-500 ml-2">admissions@riversideacademy.ac.ke</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <MessageSquare className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-neutral-700">Bursar's Office:</span>
                        <span className="text-neutral-500 ml-2">fees@riversideacademy.ac.ke</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-page">
          <SectionHeading center eyebrow="FAQ" title="Frequently asked questions" />
          <div className="mt-12 max-w-3xl mx-auto space-y-4">
            {[
              { q: 'What are your school hours?', a: 'Classes run from 7:45 AM to 3:45 PM for primary and 7:30 AM to 4:30 PM for secondary. After-school activities run until 5:30 PM.' },
              { q: 'Do you offer school transport?', a: 'Yes. Our fleet of modern school buses covers all major routes in greater Nairobi. Transport is an optional add-on and costs KSh 12,000 per term.' },
              { q: 'Can I visit the school before applying?', a: 'Absolutely. We host open days each term, and private tours can be arranged through our admissions office. Contact us to schedule a visit.' },
              { q: 'What is the student-to-teacher ratio?', a: 'We maintain a maximum of 28 students per class in primary and 30 in secondary, ensuring every child receives personal attention.' },
              { q: 'Do you offer scholarships or bursaries?', a: 'Yes, we offer a limited number of bursaries based on academic merit and financial need. Contact the bursar\u2019s office for details and application criteria.' },
            ].map((faq, i) => (
              <Reveal key={faq.q} delay={i * 60}>
                <details className="card p-5 group">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="font-semibold text-neutral-900">{faq.q}</span>
                    <span className="ml-4 flex items-center justify-center w-8 h-8 rounded-lg bg-primary-50 text-primary-600 transition-transform group-open:rotate-45 text-xl font-bold">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-sm text-neutral-600 leading-relaxed">{faq.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
