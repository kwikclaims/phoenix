import React, { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  FileText,
  Building2 as Building,
  TrendingUp,
  Clock,
  Search,
  RefreshCw,
  Eye,
  Plus,
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { loadRowsBySheetName, type Row } from "../lib/sheetLoader";
import { GOOGLE_SHEET } from "../config/sheets";
import { JobCreationQuest } from "./job-creation/JobCreationQuest";
import { useJobs } from "../hooks/useJobs";
import { ArrowLeft } from "lucide-react";

// Stage progress mapping based on your data
const STAGE_PROGRESS = {
  "Stage 1": { baseProgress: 0, maxProgress: 30 },
  "Stage 2": { baseProgress: 30, maxProgress: 50 },
  "Stage 3": { baseProgress: 50, maxProgress: 70 },
  "Stage 4": { baseProgress: 70, maxProgress: 85 },
  "Stage 5": { baseProgress: 85, maxProgress: 95 },
  "Stage 6": { baseProgress: 95, maxProgress: 99 },
  "Stage 7": { baseProgress: 100, maxProgress: 100 },
};

const calculateProgress = (stage: string): number => {
  if (!stage) return 0;
  
  const stageMatch = stage.match(/Stage (\d+)/i);
  if (!stageMatch) return 0;
  
  const stageKey = `Stage ${stageMatch[1]}`;
  const stageInfo = STAGE_PROGRESS[stageKey];
  
  if (!stageInfo) return 0;
  
  // If it's Stage 7 (Complete), return 100%
  if (stageKey === "Stage 7") return 100;
  
  return stageInfo.baseProgress;
};

interface ProjectData {
  id: string;
  stage: string;
  subStage: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  insuranceCompany: string;
  progress: number;
  [key: string]: any;
}

interface PRCSProjectsPageProps {
  onNavigate?: (page: string) => void;
}

export const PRCSProjectsPage: React.FC<PRCSProjectsPageProps> = ({ onNavigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('prcs_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showJobCreation, setShowJobCreation] = useState(false);
  const navigate = useNavigate();
  const { createJobProgress, updateJobProgress } = useJobs('default-user');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === 'phxrcs7') {
      localStorage.setItem('prcs_auth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password');
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen p-4">
        {/* Back Button */}
        <button
          onClick={() => onNavigate?.('portal')}
          className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Portal</span>
        </button>

        <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
          <div className="bg-black/80 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full p-8 border border-[#FF0000]/20">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-blue-500" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">PRCS Access</h1>
              <p className="text-gray-400">Enter password to access PRCS projects</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-blue-400 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setAuthError('');
                  }}
                  className={`w-full px-4 py-3 bg-gray-900/50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-white placeholder-gray-500 ${
                    authError ? 'border-red-500' : 'border-gray-700 hover:border-blue-500/50'
                  }`}
                  placeholder="Enter PRCS password"
                  autoFocus
                />
                {authError && (
                  <p className="text-red-400 text-sm mt-2 animate-pulse">
                    {authError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 font-semibold transform hover:scale-105 active:scale-95"
              >
                Access PRCS
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === 'phxrcs7') {
      localStorage.setItem('prcs_auth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password');
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen p-4">
        {/* Back Button */}
        <button
          onClick={() => onNavigate?.('portal')}
          className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Portal</span>
        </button>

        <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
          <div className="bg-black/80 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full p-8 border border-[#FF0000]/20">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-blue-500" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">PRCS Access</h1>
              <p className="text-gray-400">Enter password to access PRCS projects</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-blue-400 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setAuthError('');
                  }}
                  className={`w-full px-4 py-3 bg-gray-900/50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-white placeholder-gray-500 ${
                    authError ? 'border-red-500' : 'border-gray-700 hover:border-blue-500/50'
                  }`}
                  placeholder="Enter PRCS password"
                  autoFocus
                />
                {authError && (
                  <p className="text-red-400 text-sm mt-2 animate-pulse">
                    {authError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 font-semibold transform hover:scale-105 active:scale-95"
              >
                Access PRCS
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const fetchProjects = async () => {
    setLoading(true);
    setError("");
    try {
      const rows = await loadRowsBySheetName(GOOGLE_SHEET.SHEET_NAMES.PRCS_PROJECTS);
      console.log("[PRCSProjectsPage] Raw rows:", rows);
      
      if (!rows.length) {
        throw new Error("No data found in PHOENIX DEALS sheet");
      }

      // Parse the sheet data into project objects
      const parsedProjects: ProjectData[] = rows
        .filter(row => {
          // Only include rows with at least a first or last name
          const firstName = (row["First Name"] || "").trim();
          const lastName = (row["Last Name"] || "").trim();
          return firstName || lastName;
        })
        .map((row, index) => ({
          id: `prcs-project-${index + 1}`,
          stage: (row["Stage"] || "").trim(),
          subStage: (row["Sub-Stage"] || "").trim(),
          firstName: (row["First Name"] || "").trim(),
          lastName: (row["Last Name"] || "").trim(),
          email: (row["Email"] || "").trim(),
          phone: (row["Phone"] || "").trim(),
          address: (row["Address"] || "").trim(),
          city: (row["City"] || "").trim(),
          state: (row["State"] || "").trim(),
          zipCode: (row["ZIP Code"] || "").trim(),
          insuranceCompany: (row["Insurance Company"] || "").trim(),
          progress: calculateProgress(row["Stage"] || ""),
          rawData: row, // Keep original row data for detail view
        }));

      console.log("[PRCSProjectsPage] Parsed projects:", parsedProjects);
      setProjects(parsedProjects);
      setFilteredProjects(parsedProjects.sort((a, b) => a.progress - b.progress));
      
    } catch (err: any) {
      console.error("[PRCSProjectsPage] Failed to load projects:", err);
      setError(err.message || "Failed to load projects");
      toast.error("Failed to load PRCS projects from PHOENIX DEALS sheet");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
    }
  }, [isAuthenticated]);

  // Filter projects based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredProjects(projects);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = projects.filter(project =>
      `${project.firstName} ${project.lastName}`.toLowerCase().includes(term) ||
      project.address.toLowerCase().includes(term) ||
      project.city.toLowerCase().includes(term) ||
      project.insuranceCompany.toLowerCase().includes(term) ||
      project.stage.toLowerCase().includes(term)
    );
    
    setFilteredProjects(filtered.sort((a, b) => a.progress - b.progress));
  }, [projects, searchTerm]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchProjects();
      toast.success("PRCS projects refreshed successfully");
    } catch (err) {
      toast.error("Failed to refresh PRCS projects");
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleNewProject = () => {
    setShowJobCreation(true);
  };

  const handleJobCreated = () => {
    setShowJobCreation(false);
    toast.success("New PRCS project created successfully!");
    // Refresh the projects list to show the new project
    if (isAuthenticated) {
      fetchProjects();
    }
  };

  const handleCancelJobCreation = () => {
    setShowJobCreation(false);
  };

  const getDisplayName = (project: ProjectData): string => {
    if (project.firstName && project.lastName) {
      return `${project.lastName}, ${project.firstName}`;
    }
    if (project.lastName) return project.lastName;
    if (project.firstName) return project.firstName;
    return "Unknown";
  };

  const getFullAddress = (project: ProjectData): string => {
    const parts = [project.address, project.city, project.state, project.zipCode].filter(Boolean);
    return parts.join(", ");
  };

  const StatusBadge: React.FC<{ progress: number }> = ({ progress }) => (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#FF0000]/20 text-[#FF0000]">
      {progress >= 100 ? <TrendingUp className="w-3.5 h-3.5 mr-1" /> : <Clock className="w-3.5 h-3.5 mr-1" />}
      {Math.round(progress)}%
    </span>
  );

  const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
      <div 
        className="h-2 bg-gradient-to-r from-[#FF0000] to-[#C20F1F] rounded-full transition-all duration-300" 
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }} 
      />
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FF0000] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading PRCS projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-red-600 mb-4">
            <FileText className="w-12 h-12 mx-auto" />
          </div>
          <h2 className="text-xl font-bold text-red-800 mb-2">Failed to Load PRCS Projects</h2>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (showJobCreation) {
    return (
      <JobCreationQuest
        onJobCreated={handleJobCreated}
        onCancel={handleCancelJobCreation}
        createJobProgress={createJobProgress}
        updateJobProgress={updateJobProgress}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('portal')}
          className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Portal</span>
        </button>

        <div className="flex items-center justify-between mb-6 animate-fade-in-up animate-delay-200">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight animate-fade-in-left">PRCS Projects</h1>
          <div className="flex items-center gap-3 animate-fade-in-right">
            <button
              onClick={handleNewProject}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF0000] to-[#C20F1F] text-white hover:shadow-lg hover:shadow-[#FF0000]/25 rounded-xl transition-all duration-300 font-semibold transform hover:scale-105 hover-glow"
            >
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </button>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-3 py-2 bg-gray-900/50 border border-gray-700 text-[#FF0000] hover:bg-[#FF0000]/10 hover:border-[#FF0000]/50 rounded-xl transition-colors disabled:opacity-50 text-sm hover-lift"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Search */}
        {projects.length > 0 && (
          <div className="mb-6 animate-fade-in-up animate-delay-300">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by customer, address, insurance..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/60 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500"
              />
            </div>
          </div>
        )}

        {/* Projects Table - Desktop */}
        {filteredProjects.length > 0 && (
          <div className="hidden md:block animate-fade-in-up animate-delay-400">
            <div className="overflow-x-auto rounded-2xl border border-[#FF0000]/20 bg-black/60 backdrop-blur-xl hover-lift">
              <table className="min-w-full divide-y divide-gray-700/50">
                <thead className="bg-black/40">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#FF0000] uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#FF0000] uppercase tracking-wider">Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#FF0000] uppercase tracking-wider">Insurance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#FF0000] uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#FF0000] uppercase tracking-wider">Stage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#FF0000] uppercase tracking-wider">Sub-Stage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#FF0000] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {filteredProjects.map((project, idx) => (
                    <motion.tr 
                      key={project.id}
                      initial={{ opacity: 0, y: 12 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: idx * 0.03 }} 
                      className="hover:bg-[#FF0000]/5 cursor-pointer hover-lift" 
                      onClick={() => navigate(`/prcs-jobs/${project.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-white">{getDisplayName(project)}</div>
                        <div className="text-sm text-gray-400">{project.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap max-w-[280px]">
                        <div className="truncate text-gray-300">{getFullAddress(project)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-gray-200">
                          <Building className="w-4 h-4 text-gray-400" />
                          <span className="truncate max-w-[220px]">{project.insuranceCompany || "—"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap w-[320px]">
                        <div className="flex items-center gap-3">
                          <StatusBadge progress={project.progress} />
                          <div className="flex-1">
                            <ProgressBar progress={project.progress} />
                            <div className="mt-1 text-xs text-gray-400">
                              {project.progress >= 100 ? "Complete" : "In Progress"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-200">{project.stage || "—"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-200">{project.subStage || "—"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            navigate(`/prcs-jobs/${project.id}`); 
                          }} 
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-xl border border-white/10 hover:bg-white/5 transition-colors hover-scale"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Projects Cards - Mobile */}
        {filteredProjects.length > 0 && (
          <div className="md:hidden space-y-4 animate-fade-in-up animate-delay-400">
            {filteredProjects.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 12 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: idx * 0.03 }} 
                className="rounded-2xl border border-[#FF0000]/20 bg-black/60 backdrop-blur-xl p-4 hover:bg-black/80 hover:border-[#FF0000]/40 transform hover:scale-[1.02] transition-all duration-300 cursor-pointer hover-lift"
                onClick={() => navigate(`/prcs-jobs/${project.id}`)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-white">{getDisplayName(project)}</div>
                    <div className="text-sm text-gray-400 mt-1">{getFullAddress(project)}</div>
                  </div>
                  <StatusBadge progress={project.progress} />
                </div>
                
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Building className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{project.insuranceCompany || "—"}</span>
                  </div>
                  <div className="text-gray-400">
                    <div className="text-xs uppercase tracking-wide">Stage</div>
                    <div className="text-gray-200">{project.stage || "—"}</div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{Math.round(project.progress)}%</span>
                  </div>
                  <ProgressBar progress={project.progress} />
                  <div className="mt-1 text-xs text-gray-400">
                    {project.subStage || (project.progress >= 100 ? "Complete" : "In Progress")}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProjects.length === 0 && projects.length === 0 && (
          <div className="text-center py-24 animate-fade-in-up animate-delay-500">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20">
              <FileText className="w-12 h-12 text-[#FF0000]" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3">No PRCS Projects Found</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              No project data could be loaded from the PHOENIX DEALS sheet.
            </p>
            <button 
              onClick={handleRefresh}
              className="px-6 py-3 bg-[#FF0000] text-white rounded-xl hover:bg-[#FF0000]/80 transition-colors hover-glow"
            >
              Retry Loading
            </button>
          </div>
        )}

        {/* No Search Results */}
        {!loading && filteredProjects.length === 0 && projects.length > 0 && (
          <div className="text-center py-24 animate-fade-in-up animate-delay-500">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20">
              <Search className="w-12 h-12 text-[#FF0000]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">No matching projects</h2>
            <p className="text-gray-400 mb-8">Try adjusting your search criteria</p>
            <button 
              onClick={() => setSearchTerm("")}
              className="px-6 py-3 bg-[#FF0000] text-white rounded-xl hover:bg-[#FF0000]/80 transition-colors hover-glow"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};