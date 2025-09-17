import React, { useState } from 'react';
import { ClipboardList, ChevronDown, ChevronRight, CheckCircle, Clock, ArrowLeft } from 'lucide-react';

interface ProcessStage {
  id: number;
  title: string;
  emoji: string;
  steps: string[];
}

interface ProcessPageProps {
  onNavigate?: (page: string) => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onNavigate }) => {
  const [expandedStages, setExpandedStages] = useState<Set<number>>(new Set([1])); // Stage 1 expanded by default

  // Hard-coded process data from the PROCESS sheet
  const stages: ProcessStage[] = [
    {
      id: 1,
      title: 'Claim Setup',
      emoji: '🟩',
      steps: [
        'Overview Inspection',
        'Homeowner Questions',
        'Representative Questions',
        'Storm Date & Time',
        'Claim Call',
        'Consultation Agreement Completion',
        'Photo Packet',
        'Repairability Test',
        'Cover Letter Completion',
        'Material Test',
        'Measurement Upload',
        'Estimate',
        'Report Generation'
      ]
    },
    {
      id: 2,
      title: 'Report Submission',
      emoji: '📋',
      steps: [
        'Report Submission'
      ]
    },
    {
      id: 3,
      title: 'Approval Pending',
      emoji: '⏳',
      steps: [
        'Insurance Review',
        'Initial Payment Release'
      ]
    },
    {
      id: 4,
      title: 'Project Completion',
      emoji: '🔨',
      steps: [
        'Contractor Contract Creation',
        'Choose Materials',
        'Sign Contractor Construction Contract',
        'Pay Contractor',
        'Order Materials',
        'Contractor Completes Work',
        'Completion Photos',
        'Supplement Photo Packet'
      ]
    },
    {
      id: 5,
      title: 'Supplement',
      emoji: '📄',
      steps: [
        'Submit CoC & Supplement'
      ]
    },
    {
      id: 6,
      title: 'Final Payment',
      emoji: '💰',
      steps: [
        'Final Payment Release',
        'Pays Contractor(s) Final Balances',
        'Pay Consultant Fee & Issue Receipts',
        'Supplemental Work is Completed',
        'Contractor sends receipt and warranty'
      ]
    },
    {
      id: 7,
      title: 'Job Complete',
      emoji: '✅',
      steps: [
        'Job Complete'
      ]
    }
  ];

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

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => onNavigate?.('portal')}
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
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">The Official Process</h1>
          <p className="text-gray-400 mb-4">Complete 7-stage insurance claim process</p>
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
                <p className="text-xl font-bold text-white">PROCESS Sheet</p>
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