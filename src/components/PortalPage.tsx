import React, { useState } from 'react';
import { Grid3X3, ClipboardCheck, ClipboardList, CheckSquare, Phone, Bell, FileText, DollarSign, FolderOpen, Lock } from 'lucide-react';

interface PortalPageProps {
  onNavigate: (page: string) => void;
}

export const PortalPage: React.FC<PortalPageProps> = ({ onNavigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === '1209') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-black/80 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full p-8 border border-[#FF0000]/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-[#FF0000]" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Portal Access</h1>
            <p className="text-gray-400">Enter password to access portal tools</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#FF0000] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className={`w-full px-4 py-3 bg-gray-900/50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] transition-all duration-300 text-white placeholder-gray-500 ${
                  error ? 'border-red-500' : 'border-gray-700 hover:border-[#FF0000]/50'
                }`}
                placeholder="Enter portal password"
                autoFocus
              />
              {error && (
                <p className="text-red-400 text-sm mt-2 animate-pulse">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FF0000] to-[#C20F1F] text-white py-3 rounded-xl hover:shadow-lg hover:shadow-[#FF0000]/25 transition-all duration-300 font-semibold transform hover:scale-105 active:scale-95"
            >
              Access Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  const portalItems = [
    {
      id: 'projects',
      title: 'Projects',
      description: 'View and manage all insurance claim projects and jobs',
      icon: FolderOpen,
      color: 'from-[#FF0000] to-[#C20F1F]',
      hoverColor: 'hover:shadow-[#FF0000]/25',
    },
    {
      id: 'my-process',
      title: 'Process Steps',
      description: 'The official step-by-step process guide from Google Sheets',
      icon: ClipboardList,
      color: 'from-indigo-500 to-indigo-600',
      hoverColor: 'hover:shadow-indigo-500/25',
    },
    {
      id: 'projects',
      title: 'Projects',
      description: 'View and manage all insurance claim projects and jobs',
      icon: FolderOpen,
      color: 'from-[#FF0000] to-[#C20F1F]',
      hoverColor: 'hover:shadow-[#FF0000]/25',
    },
    {
      id: 'inspection',
      title: 'Inspection Report',
      description: 'Code-anchored roof & exterior damage inspection checklist',
      icon: ClipboardCheck,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:shadow-blue-500/25',
    },
    {
      id: 'todos',
      title: 'To-Do List',
      description: 'Current tasks and adjuster meetings from Google Sheets',
      icon: CheckSquare,
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:shadow-green-500/25',
    },
    {
      id: 'follow-ups',
      title: 'Follow-Ups',
      description: 'Client communication reminders and follow-up tasks',
      icon: Phone,
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:shadow-purple-500/25',
    },
    {
      id: 'updates',
      title: 'Updates',
      description: 'Update reminders and notifications management',
      icon: Bell,
      color: 'from-orange-500 to-orange-600',
      hoverColor: 'hover:shadow-orange-500/25',
    },
    {
      id: 'documents',
      title: 'Contracts',
      description: 'Document generation and form management',
      icon: FileText,
      color: 'from-indigo-500 to-indigo-600',
      hoverColor: 'hover:shadow-indigo-500/25',
    },
    {
      id: 'financial',
      title: 'Financial',
      description: 'Real-time financial metrics and dashboard',
      icon: DollarSign,
      color: 'from-emerald-500 to-emerald-600',
      hoverColor: 'hover:shadow-emerald-500/25',
    },
  ];

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Grid3X3 className="w-10 h-10 text-[#FF0000]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Portal</h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Access all your tools and resources from this central hub
          </p>
        </div>

        {/* Portal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portalItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`group bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 p-8 hover:border-[#FF0000]/40 transition-all duration-300 text-left transform hover:scale-105 ${item.hoverColor}`}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'slideInUp 0.6s ease-out forwards'
              }}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FF0000] transition-colors duration-300">
                {item.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {item.description}
              </p>
              
              <div className="mt-6 flex items-center text-[#FF0000] group-hover:text-white transition-colors duration-300">
                <span className="text-sm font-medium">Access Tool</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Portal Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-900/50 rounded-xl p-6">
                <div className="text-3xl font-bold text-[#FF0000] mb-2">6</div>
                <div className="text-gray-400">Available Tools</div>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-6">
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-gray-400">System Uptime</div>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-6">
                <div className="text-3xl font-bold text-green-400 mb-2">Live</div>
                <div className="text-gray-400">Data Sync</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};