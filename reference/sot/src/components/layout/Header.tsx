import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, GraduationCap, Phone, Mail } from 'lucide-react';
import { navLinks } from '@/data/schoolData';
import { useScrollPosition } from '@/hooks/useScrollPosition';

export function Header() {
  const scrolled = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:block bg-neutral-900 text-neutral-300 text-sm">
        <div className="container-wide flex items-center justify-between py-2">
          <div className="flex items-center gap-6">
            <a href="tel:+254700123456" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5" />
              +254 700 123 456
            </a>
            <a href="mailto:info@riversideacademy.ac.ke" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5" />
              info@riversideacademy.ac.ke
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/admissions" className="text-accent-400 hover:text-accent-300 font-semibold transition-colors">
              Apply Now for 2027
            </Link>
            <span className="text-neutral-600">|</span>
            <Link to="/careers" className="hover:text-white transition-colors">Careers</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-soft' : 'bg-white'
        }`}
      >
        <div className="container-wide flex items-center justify-between py-3 lg:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 text-white transition-transform group-hover:scale-105">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-bold text-lg text-neutral-900">Riverside</span>
              <span className="text-xs text-neutral-500 font-medium tracking-wider uppercase">Academy</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => link.children && setDropdownOpen(link.path)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <Link
                  to={link.path}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive(link.path)
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
                  }`}
                >
                  {link.label}
                  {link.children && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>

                {link.children && dropdownOpen === link.path && (
                  <div className="absolute top-full left-0 pt-2 w-72 animate-fade-in-up">
                    <div className="bg-white rounded-xl shadow-soft-lg border border-neutral-200 overflow-hidden">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-5 py-3 hover:bg-primary-50 transition-colors group"
                        >
                          <div className="font-semibold text-sm text-neutral-900 group-hover:text-primary-700">{child.label}</div>
                          <div className="text-xs text-neutral-500 mt-0.5">{child.description}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/erp" className="btn-ghost text-primary-700">
              ERP demo
            </Link>
            <Link to="/admissions" className="btn-primary btn-sm">
              Apply Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 pt-[72px] bg-white animate-fade-in">
          <nav className="container-page py-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <div key={link.path}>
                <Link
                  to={link.path}
                  className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                    isActive(link.path)
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-neutral-800 hover:bg-neutral-50'
                  }`}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-4 mt-1 mb-2 flex flex-col gap-1 border-l-2 border-neutral-100 pl-3">
                    {link.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="px-4 py-2 text-sm text-neutral-600 hover:text-primary-600 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-neutral-200 flex flex-col gap-2">
              <Link to="/erp" className="btn-secondary w-full">Open ERP demo</Link>
              <Link to="/admissions" className="btn-primary w-full">Apply Now</Link>
            </div>
            <div className="mt-6 flex flex-col gap-2 text-sm text-neutral-500">
              <a href="tel:+254700123456" className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +254 700 123 456
              </a>
              <a href="mailto:info@riversideacademy.ac.ke" className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> info@riversideacademy.ac.ke
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
