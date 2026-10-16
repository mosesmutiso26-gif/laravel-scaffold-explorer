import { type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isErpRoute = pathname.startsWith('/erp') || pathname.startsWith('/admin') || pathname.startsWith('/teacher') || pathname.startsWith('/hr') || pathname.startsWith('/library') || pathname.startsWith('/transport') || pathname.startsWith('/finance') || pathname.startsWith('/procurement') || pathname.startsWith('/health') || pathname.startsWith('/prefect') || pathname.startsWith('/boarding') || pathname.startsWith('/sports') || pathname.startsWith('/timetable') || pathname.startsWith('/headteacher') || pathname.startsWith('/cocurricular') || pathname.startsWith('/science-lab') || pathname.startsWith('/computer-lab') || pathname.startsWith('/directors');

  if (isErpRoute) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
