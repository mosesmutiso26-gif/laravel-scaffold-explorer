import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Upload, CheckCircle2, DollarSign, Calendar, ClipboardList, User } from 'lucide-react';
import { Reveal, SectionHeading, CTASection, PageHero, Badge } from '@/components/ui/Primitives';
import { admissionSteps } from '@/data/schoolData';

export function AdmissionsPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    studentName: '',
    currentGrade: '',
    appliedGrade: '',
    year: '2027',
    dayOrBoarding: 'day',
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
        title="Admissions"
        subtitle="Begin your child's journey at Riverside Academy. We welcome applications for all year groups and are here to guide you through every step."
        breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Admissions' }]}
        image="https://images.pexels.com/photos/18449719/pexels-photo-18449719.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      {/* Quick stats */}
      <section className="py-12 bg-white border-b border-neutral-100">
        <div className="container-page">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Calendar, value: '2027', label: 'Now accepting applications' },
              { icon: User, value: 'PP1 — Form 4', label: 'All year groups' },
              { icon: DollarSign, value: 'KSh 5,000', label: 'Application fee' },
              { icon: ClipboardList, value: '6 steps', label: 'Simple admissions process' },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 80}>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 text-primary-600 mx-auto mb-3">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="text-xl font-display font-bold text-neutral-900">{item.value}</div>
                  <div className="text-sm text-neutral-500 mt-1">{item.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Admissions Process"
            title="Six simple steps to enrollment"
            subtitle="Our admissions process is designed to be clear and welcoming. We're here to help at every stage."
          />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {admissionSteps.map((step, i) => (
              <Reveal key={step.step} delay={i * 80}>
                <div className="card card-hover p-6 h-full relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 text-7xl font-display font-bold text-primary-50">0{step.step}</div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-600 text-white mb-4">
                      <span className="text-lg font-display font-bold">{step.step}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-neutral-900">{step.title}</h3>
                    <p className="mt-3 text-sm text-neutral-500 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <Reveal>
              <div>
                <div className="eyebrow mb-4">
                  <span className="h-px w-8 bg-primary-500" />
                  What You'll Need
                </div>
                <h2 className="section-title text-balance">Required documents for application</h2>
                <p className="mt-4 text-neutral-600 leading-relaxed">
                  Please prepare the following documents before starting your application. All documents should be clear scans or photocopies.
                </p>
                <div className="mt-8 space-y-3">
                  {[
                    'Completed application form',
                    'Birth certificate (copy)',
                    'Two recent passport-size photographs',
                    'Latest report card / academic records',
                    'Leaving certificate from previous school (if applicable)',
                    'Immunization / health records',
                    'Guardian ID copy',
                    'Application fee payment receipt',
                  ].map((doc) => (
                    <div key={doc} className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50">
                      <FileText className="w-5 h-5 text-primary-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-neutral-700">{doc}</span>
                      <CheckCircle2 className="w-4 h-4 text-secondary-500 ml-auto flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal animation="slide-in-right" delay={100}>
              {/* Application form */}
              <div className="card p-8 lg:p-10">
                {formSubmitted ? (
                  <div className="text-center py-12">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-secondary-100 text-secondary-600 mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-neutral-900">Application received!</h3>
                    <p className="mt-3 text-neutral-500 leading-relaxed">
                      Thank you for your interest in Riverside Academy. Our admissions team will contact you within 3 working days to confirm your application and schedule the assessment.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="btn-secondary mt-6"
                    >
                      Submit another application
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-display font-bold text-neutral-900">Start your application</h3>
                    <p className="text-sm text-neutral-500 mt-1">Fill in the form below and we'll be in touch.</p>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      <div>
                        <label className="label-field">Parent / Guardian Name *</label>
                        <input
                          required
                          type="text"
                          value={formData.parentName}
                          onChange={(e) => handleChange('parentName', e.target.value)}
                          className="input-field"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="label-field">Email *</label>
                          <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="input-field"
                            placeholder="you@email.com"
                          />
                        </div>
                        <div>
                          <label className="label-field">Phone *</label>
                          <input
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="input-field"
                            placeholder="+254 700 000 000"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="label-field">Student Name *</label>
                        <input
                          required
                          type="text"
                          value={formData.studentName}
                          onChange={(e) => handleChange('studentName', e.target.value)}
                          className="input-field"
                          placeholder="Student full name"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="label-field">Current Grade</label>
                          <select
                            value={formData.currentGrade}
                            onChange={(e) => handleChange('currentGrade', e.target.value)}
                            className="input-field"
                          >
                            <option value="">Select...</option>
                            {['PP1', 'PP2', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Form 1', 'Form 2', 'Form 3', 'Form 4', 'Other'].map((g) => (
                              <option key={g} value={g}>{g}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="label-field">Applying for Grade *</label>
                          <select
                            required
                            value={formData.appliedGrade}
                            onChange={(e) => handleChange('appliedGrade', e.target.value)}
                            className="input-field"
                          >
                            <option value="">Select...</option>
                            {['PP1', 'PP2', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Form 1', 'Form 2', 'Form 3', 'Form 4'].map((g) => (
                              <option key={g} value={g}>{g}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="label-field">Academic Year *</label>
                          <select
                            required
                            value={formData.year}
                            onChange={(e) => handleChange('year', e.target.value)}
                            className="input-field"
                          >
                            <option value="2027">2027</option>
                            <option value="2026">2026 (mid-year transfer)</option>
                          </select>
                        </div>
                        <div>
                          <label className="label-field">Day or Boarding *</label>
                          <select
                            required
                            value={formData.dayOrBoarding}
                            onChange={(e) => handleChange('dayOrBoarding', e.target.value)}
                            className="input-field"
                          >
                            <option value="day">Day Scholar</option>
                            <option value="boarding">Boarding</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="label-field">Additional Information</label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => handleChange('message', e.target.value)}
                          className="input-field min-h-[100px]"
                          placeholder="Tell us anything else we should know about your child..."
                        />
                      </div>
                      <div className="flex items-center justify-center p-4 rounded-xl border-2 border-dashed border-neutral-200 text-sm text-neutral-400">
                        <Upload className="w-5 h-5 mr-2" />
                        Document upload available after form submission
                      </div>
                      <button type="submit" className="btn-primary w-full">
                        Submit application
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <p className="text-xs text-center text-neutral-400">
                        By submitting, you agree to our privacy policy. We will never share your information.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Fees overview */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container-page">
          <SectionHeading center eyebrow="Fee Structure" title="Transparent and competitive fees" subtitle="Our fees include tuition, learning materials, and access to all facilities. Boarding and transport are optional add-ons." />
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Day Scholar',
                price: 'KSh 45,000',
                period: 'per term',
                features: ['Tuition & learning materials', 'All facilities access', 'Sports & co-curricular', 'Parent portal access'],
                popular: false,
              },
              {
                name: 'Boarding',
                price: 'KSh 85,000',
                period: 'per term',
                features: ['Everything in Day Scholar', 'Boarding house accommodation', 'All meals (breakfast, lunch, dinner)', 'Evening study supervision', 'Weekend activities'],
                popular: true,
              },
              {
                name: 'Transport (Optional)',
                price: 'KSh 12,000',
                period: 'per term',
                features: ['Door-to-door pickup', 'GPS-tracked buses', 'Trained drivers & assistants', 'All major Nairobi routes'],
                popular: false,
              },
            ].map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100}>
                <div className={`card p-8 h-full relative ${plan.popular ? 'border-primary-300 shadow-soft-lg ring-2 ring-primary-200' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge color="accent">Most Popular</Badge>
                    </div>
                  )}
                  <h3 className="text-lg font-display font-bold text-neutral-900">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-display font-bold text-primary-600">{plan.price}</span>
                    <span className="text-sm text-neutral-400">{plan.period}</span>
                  </div>
                  <div className="mt-6 space-y-3">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-secondary-500 flex-shrink-0" />
                        <span className="text-sm text-neutral-700">{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/contact" className={`mt-8 w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'} justify-center`}>
                    Enquire about fees
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-neutral-400">
            Sibling discounts and bursaries are available. Contact our bursar's office for details.
          </p>
        </div>
      </section>

      <CTASection
        title="Questions about admissions?"
        description="Our admissions team is ready to help. Reach out for a personal conversation or to schedule a campus tour."
        buttonText="Contact admissions"
        buttonLink="/contact"
        secondaryButtonText="Download prospectus"
        secondaryButtonLink="#"
      />
    </>
  );
}
