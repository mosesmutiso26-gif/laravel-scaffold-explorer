import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight,
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* Newsletter band */}
      <div className="border-b border-neutral-800">
        <div className="container-page py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-display font-bold text-white">Stay connected with Riverside</h3>
              <p className="text-sm text-neutral-400 mt-1">Get news, events, and admissions updates delivered to your inbox.</p>
            </div>
            <form className="flex w-full lg:w-auto gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-72 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <button type="submit" className="btn-primary">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-page py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display font-bold text-lg text-white">Riverside</span>
                <span className="text-xs text-neutral-400 font-medium tracking-wider uppercase">Academy</span>
              </div>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed">
              A premier Kenyan day and boarding school nurturing minds, building character, and shaping futures since 1998.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Youtube, label: 'YouTube' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-neutral-800 text-neutral-400 hover:bg-primary-600 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Explore</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Academics', path: '/academics' },
                { label: 'Admissions', path: '/admissions' },
                { label: 'Facilities', path: '/facilities' },
                { label: 'News & Events', path: '/news' },
                { label: 'Careers', path: '/careers' },
              ].map(({ label, path }) => (
                <li key={path}>
                  <Link to={path} className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-3">
              {[
                'School Calendar',
                'Fee Structure',
                'Parent Portal',
                'Student Portal',
                'Staff Login',
                'Downloads',
              ].map((label) => (
                <li key={label}>
                  <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-400">
                  Riverside Drive, Off Ngong Road<br />
                  Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href="tel:+254700123456" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  +254 700 123 456
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href="mailto:info@riversideacademy.ac.ke" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  info@riversideacademy.ac.ke
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="container-page py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} Riverside Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
