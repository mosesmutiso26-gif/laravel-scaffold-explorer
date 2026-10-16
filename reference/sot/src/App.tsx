import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { LeadershipPage } from '@/pages/LeadershipPage';
import { AcademicsPage } from '@/pages/AcademicsPage';
import { AdmissionsPage } from '@/pages/AdmissionsPage';
import { FacilitiesPage } from '@/pages/FacilitiesPage';
import { NewsPage } from '@/pages/NewsPage';
import { ContactPage } from '@/pages/ContactPage';
import { CareersPage } from '@/pages/CareersPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { TeacherPortalPage } from '@/pages/TeacherPortalPage';
import { HrPortalPage } from '@/pages/HrPortalPage';
import { LibraryPortalPage } from '@/pages/LibraryPortalPage';
import { TransportPortalPage } from '@/pages/TransportPortalPage';
import { FinancePortalPage } from '@/pages/FinancePortalPage';
import { ProcurementPortalPage } from '@/pages/ProcurementPortalPage';
import { HealthPortalPage } from '@/pages/HealthPortalPage';
import { ParentPortalPage } from '@/pages/ParentPortalPage';
import { PrefectPortalPage } from '@/pages/PrefectPortalPage';
import { BoardingPortalPage } from '@/pages/BoardingPortalPage';
import { SportsPortalPage } from '@/pages/SportsPortalPage';
import { TimetablePortalPage } from '@/pages/TimetablePortalPage';
import { HeadteacherPortalPage } from '@/pages/HeadteacherPortalPage';
import { CoCurricularPortalPage } from '@/pages/CoCurricularPortalPage';
import { ScienceLabPortalPage } from '@/pages/ScienceLabPortalPage';
import { ComputerLabPortalPage } from '@/pages/ComputerLabPortalPage';
import { DirectorsPortalPage } from '@/pages/DirectorsPortalPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/leadership" element={<LeadershipPage />} />
          <Route path="/teachers" element={<LeadershipPage />} />
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/teacher/*" element={<TeacherPortalPage />} />
          <Route path="/hr/*" element={<HrPortalPage />} />
          <Route path="/library/*" element={<LibraryPortalPage />} />
          <Route path="/transport/*" element={<TransportPortalPage />} />
          <Route path="/finance/*" element={<FinancePortalPage />} />
          <Route path="/procurement/*" element={<ProcurementPortalPage />} />
          <Route path="/health/*" element={<HealthPortalPage />} />
          <Route path="/parent/*" element={<ParentPortalPage />} />
          <Route path="/prefect/*" element={<PrefectPortalPage />} />
          <Route path="/boarding/*" element={<BoardingPortalPage />} />
          <Route path="/sports/*" element={<SportsPortalPage />} />
          <Route path="/timetable/*" element={<TimetablePortalPage />} />
          <Route path="/headteacher/*" element={<HeadteacherPortalPage />} />
          <Route path="/cocurricular/*" element={<CoCurricularPortalPage />} />
          <Route path="/science-lab/*" element={<ScienceLabPortalPage />} />
          <Route path="/computer-lab/*" element={<ComputerLabPortalPage />} />
          <Route path="/directors/*" element={<DirectorsPortalPage />} />
          <Route path="/erp" element={<DashboardPage />} />
          <Route path="/admin" element={<DashboardPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
