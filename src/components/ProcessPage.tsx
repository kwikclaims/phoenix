import React, { useState, useEffect } from 'react';
import { ClipboardList, RefreshCw, ChevronDown, ChevronRight, CheckCircle, Clock, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { loadRowsBySheetName, type Row } from '../lib/sheetLoader';
import { GOOGLE_SHEET } from '../config/sheets';

interface ProcessStage {
  id: number;
  title: string;
  emoji: string;
  steps: string[];
}

export const ProcessPage: React.FC = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [stages, setStages] = useState<ProcessStage[]>([]);
  const [expandedStages, setExpandedStages] = useState<Set<number>>(new Set([1])); // Stage 1 expanded by default
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const parseProcessStages = (rows: Row[]): ProcessStage[] => {
    console.log("[ProcessPage] ===== PARSING PROCESS STAGES =====");
    console.log("[ProcessPage] Input rows for parsing:", rows);
    
    const stages: ProcessStage[] = [];
    let currentStage: ProcessStage | null = null;
    
    rows.forEach((row, rowIndex) => {
      console.log(`[ProcessPage] Processing row ${rowIndex + 1}:`, row);
      
      // Get the first non-empty value from the row as the step content
      const allValues = Object.values(row);
      const stepContent = allValues.find(value => value && String(value).trim()) || '';
      
      console.log(`[ProcessPage] Row ${rowIndex + 1} step content: "${stepContent}"`);
      
      if (!stepContent) return;
      
      // Check if this is a stage header (contains "Stage" and a number)
      const stageMatch = String(stepContent).match(/^Stage (\d+)\s*[-–]\s*(.+)$/i);
      
      console.log(`[ProcessPage] Stage match result for "${stepContent}":`, stageMatch);
      
      if (stageMatch) {
        // Save previous stage if it exists
        if (currentStage) {
          console.log(`[ProcessPage] Saving previous stage: Stage ${currentStage.id} with ${currentStage.steps.length} steps`);
          stages.push(currentStage);
        }
        
        // Create new stage
        const stageNumber = parseInt(stageMatch[1]);
        const stageTitle = stageMatch[2].trim();
        
        console.log(`[ProcessPage] Creating new stage: ${stageNumber} - ${stageTitle}`);
        
        // Assign emojis based on stage
        const getStageEmoji = (num: number): string => {
          switch (num) {
            case 1: return '🟩';
            case 2: return '📋';
            case 3: return '⏳';
            case 4: return '🔨';
            case 5: return '📄';
            case 6: return '💰';
            case 7: return '✅';
            default: return '📌';
          }
        };
        
        currentStage = {
          id: stageNumber,
          title: stageTitle,
          emoji: getStageEmoji(stageNumber),
          steps: []
        };
      } else if (currentStage) {
        // This is a step under the current stage
        console.log(`[ProcessPage] Adding step to Stage ${currentStage.id}: "${stepContent}"`);
        currentStage.steps.push(stepContent);
      } else {
        // No current stage but we have content - this might be Stage 1 content
        console.log(`[ProcessPage] Found content without stage context: "${stepContent}"`);
        
        // If this looks like it could be Stage 1 content and we don't have any stages yet
        if (stages.length === 0 && !stepContent.toLowerCase().includes('stage')) {
          console.log(`[ProcessPage] Creating implicit Stage 1 for orphaned content`);
          currentStage = {
            id: 1,
            title: 'Claim Setup',
            emoji: '🟩',
            steps: [stepContent]
          };
        }
      }
    });
    
    // Don't forget to add the last stage
    if (currentStage) {
      console.log(`[ProcessPage] Saving final stage: Stage ${currentStage.id} with ${currentStage.steps.length} steps`);
      stages.push(currentStage);
    }
    
    console.log(`[ProcessPage] ===== FINAL PARSED STAGES =====`);
    stages.forEach(stage => {
      console.log(`[ProcessPage] Stage ${stage.id}: ${stage.title} (${stage.steps.length} steps)`);
      stage.steps.forEach((step, index) => {
        console.log(`[ProcessPage]   Step ${index + 1}: ${step}`);
      });
    });
    console.log("[ProcessPage] ===== END PARSED STAGES =====");
    
    return stages;
  };

  const fetchProcessData = async () => {
    setLoading(true);
    setError("");
    try {
      const rows = await loadRowsBySheetName(GOOGLE_SHEET.SHEET_NAMES.PROCESS);
      console.log("[ProcessPage] Raw rows:", rows);
      
      if (!rows.length) {
        throw new Error("No process data found in sheet");
      }

      setRows(rows);
      const parsedStages = parseProcessStages(rows);
      setStages(parsedStages);
      setLastUpdated(new Date());
      
    } catch (err: any) {
      console.error("[ProcessPage] Failed to load process data:", err);
      setError(err.message || "Failed to load process data");
      toast.error("Failed to load process data from Google Sheets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProcessData();
  }, []);

  const handleRefresh = async () => {
    try {
      await fetchProcessData();
      toast.success("Process data refreshed successfully");
    } catch (err) {
      toast.error("Failed to refresh process data");
    }
  };

  const toggleStage = (stageId: number) => {
    setExpandedStages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stageId)) {
        newSet.delete(stageId);
      } else {
        newSet.add(stageId);
      }
      return newSet;
    });
  };

  const getStageStatusColor = (stageId: number): string => {
    if (stageId <= 2) return 'text-green-400'; // Completed stages
    if (stageId === 3) return 'text-yellow-400'; // Current stage
    return 'text-gray-400'; // Future stages
  };

  const getStageStatusIcon = (stageId: number) => {
    if (stageId <= 2) return <CheckCircle className="w-5 h-5 text-green-400" />;
    if (stageId === 3) return <Clock className="w-5 h-5 text-yellow-400" />;
    return <Clock className="w-5 h-5 text-gray-400" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FF0000] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading process information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-red-600 mb-4">
            <ClipboardList className="w-12 h-12 mx-auto" />
          </div>
          <h2 className="text-xl font-bold text-red-800 mb-2">Failed to Load Process Data</h2>
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

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Portal</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ClipboardList className="w-10 h-10 text-[#FF0000]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Process</h1>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">The Official Process</h1>
          <p className="text-gray-400 mb-4">Step-by-step guide from Google Sheets</p>
          <div className="flex items-center justify-center space-x-4">
            {lastUpdated && (
              <p className="text-sm text-gray-500">
                Last updated: {lastUpdated.toLocaleString()}
              </p>
            )}
            <button
              onClick={handleRefresh}
              className="flex items-center space-x-2 px-3 py-1 text-[#FF0000] hover:bg-[#FF0000]/10 rounded-lg transition-colors text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Process Steps */}
        <div className="space-y-6">
          {stages.map((stage, stageIndex) => (
            <div
              key={stage.id}
              className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 overflow-hidden"
              style={{
                animationDelay: `${stageIndex * 150}ms`,
                animation: 'slideInUp 0.6s ease-out forwards'
              }}
            >
              {/* Stage Header */}
              <button
                onClick={() => toggleStage(stage.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#FF0000]/5 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">{stage.emoji}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Stage {stage.id} - {stage.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{stage.steps.length} steps</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getStageStatusIcon(stage.id)}
                  {expandedStages.has(stage.id) ? (
                    <ChevronDown className="w-6 h-6 text-[#FF0000]" />
                  ) : (
                    <ChevronRight className="w-6 h-6 text-gray-400" />
                  )}
                </div>
              </button>
              
              {/* Stage Steps */}
              {expandedStages.has(stage.id) && (
                <div className="border-t border-gray-700/50">
                  <div className="divide-y divide-gray-700/30">
                    {stage.steps.map((step, stepIndex) => (
                      <div
                        key={stepIndex}
                        className="p-4 hover:bg-[#FF0000]/5 transition-colors"
                        style={{
                          animationDelay: `${stepIndex * 50}ms`,
                          animation: 'slideInLeft 0.4s ease-out forwards'
                        }}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-6 h-6 bg-[#FF0000]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-[#FF0000] font-bold text-xs">{stepIndex + 1}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-200 font-medium leading-relaxed">
                              {step}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Process Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm">Total Stages</p>
                <p className="text-2xl font-bold text-[#FF0000]">{stages.length}</p>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm">Total Steps</p>
                <p className="text-2xl font-bold text-white">{stages.reduce((total, stage) => total + stage.steps.length, 0)}</p>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm">Data Source</p>
                <p className="text-xl font-bold text-white">Google Sheets</p>
              </div>
            </div>
            <div className="mt-4 bg-gray-900/50 rounded-xl p-4">
              <p className="text-gray-400 text-sm">Last Refresh</p>
              <p className="text-sm text-[#FF0000] font-medium">
                {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Never'}
              </p>
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
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};