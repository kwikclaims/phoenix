import React from 'react';
import { Routes, Route, useParams, useNavigate, useLocation } from 'react-router-dom';
import PhoenixFormsApp from './phoenix-forms/App';
import { useAuth } from './hooks/useAuth';
import { LoginForm } from './components/auth/LoginForm';
import { Header } from './components/layout/Header';
import { Toaster } from './components/ui/toaster';
import { HomePage } from './components/HomePage';
import { ProjectsPage } from './components/ProjectsPage';
import { HowItWorksPage } from './components/HowItWorksPage';
import { JobDetailPage } from './components/JobDetailPage';
import { OurWorkPage } from './components/OurWorkPage';
import { BadgePage } from './components/BadgePage';
import { LossDatePage } from './components/LossDatePage';
import { PortalPage } from './components/PortalPage';
import { FinancialPage } from './components/FinancialPage';
import { ProcessPage } from './components/ProcessPage';
import { TodoPage } from './components/TodoPage';
import { UpdatesPage } from './components/UpdatesPage';
import { InspectionReportPage } from './components/InspectionReportPage';
import { FollowUpsPage } from './components/FollowUpsPage';

import { PRCSProjectsPage } from './components/PRCSProjectsPage';
import { PRCSJobDetailPage } from './components/PRCSJobDetailPage';

function App() {
  const { loading } = useAuth();
  const [currentPage, setCurrentPage] = React.useState('home');
  const location = useLocation();
  
  // Check if we're on a preview page
  const isPreviewPage = location.pathname.includes('/preview/');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FF0000] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Phoenix...</p>
        </div>
      </div>
    );
  }

  const getPageTitle = () => {
    switch (currentPage) {
      case 'home':
        return 'Kwik Claims';
      case 'projects':
        return 'Kwik Claims Projects';
      case 'prcs-projects':
        return 'PRCS Projects';
      case 'updates':
        return 'Updates';
      case 'how-it-works':
        return 'How It Works';
      case 'documents':
        return 'Documents';
      case 'my-work':
        return 'My Work';
      case 'financial':
        return 'PRCS Finances';
      case 'my-process':
        return 'My Process';
      case 'todos':
        return 'To-Do List';
      case 'inspection':
        return 'Inspection Report';
      case 'follow-ups':
        return 'Follow-Ups';
      case 'recent-storms':
        return 'Recent Storms';
      case 'portal':
        return 'Portal';
      default:
        return 'Kwik Claims';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <Routes>
        <Route path="/jobs/:id" element={<JobDetailRoute />} />
        <Route path="/prcs-jobs/:id" element={<PRCSJobDetailRoute />} />
        <Route path="/*" element={
          <>
            {!isPreviewPage && (
              <Header
                title={getPageTitle()}
                user={{ id: 'default-user', firstName: 'Phoenix', lastName: 'User', email: '', phoneNumber: '', createdAt: '' }}
                onLogout={() => {}}
                onNavigate={setCurrentPage}
                currentPage={currentPage}
                onUserUpdate={() => {}}
              />
            )}

            {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
            {currentPage === 'projects' && <ProjectsPage />}
            {currentPage === 'prcs-projects' && <PRCSProjectsPage />}
            {currentPage === 'how-it-works' && <HowItWorksPage />}
            {currentPage === 'updates' && <UpdatesPage />}
            {currentPage === 'my-work' && <OurWorkPage />}
            {currentPage === 'documents' && <PhoenixFormsApp onNavigateToMainAppPage={setCurrentPage} />}
            {currentPage === 'financial' && <FinancialPage />}
            {currentPage === 'my-process' && <ProcessPage />}
            {currentPage === 'todos' && <TodoPage />}
            {currentPage === 'inspection' && <InspectionReportPage />}
            {currentPage === 'follow-ups' && <FollowUpsPage />}
            {currentPage === 'recent-storms' && <LossDatePage />}
            {currentPage === 'portal' && <PortalPage onNavigate={setCurrentPage} />}
          </>
        } />
      </Routes>

      <Toaster />
    </div>
  );
}

// Job Detail Route Component
const JobDetailRoute: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <span className="text-xl">←</span> <span className="hidden sm:inline">Back to Projects</span>
          </button>
          <div className="truncate text-sm text-gray-300">Job Detail</div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <JobDetailPage jobId={id!} />
      </div>
    </div>
  );
};

// PRCS Job Detail Route Component
const PRCSJobDetailRoute: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <span className="text-xl">←</span> <span className="hidden sm:inline">Back to PRCS Projects</span>
          </button>
          <div className="truncate text-sm text-gray-300">PRCS Project Detail</div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PRCSJobDetailPage jobId={id!} />
      </div>
    </div>
  );
};

export default App;