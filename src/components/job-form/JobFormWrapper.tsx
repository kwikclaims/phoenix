import React from 'react';
import { ArrowLeft, Save, SkipForward } from 'lucide-react';
import { JobProgress } from '../../types/Job';

interface JobFormWrapperProps {
  job: JobProgress;
  onBack: () => void;
  onSave: () => void;
  onSkip: () => void;
  onNext: () => void;
  canProceed: boolean;
  children: React.ReactNode;
  title: string;
  stepNumber: number;
  totalSteps: number;
}

export const JobFormWrapper: React.FC<JobFormWrapperProps> = ({
  job,
  onBack,
  onSave,
  onSkip,
  onNext,
  canProceed,
  children,
  title,
  stepNumber,
  totalSteps,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
                <p className="text-sm text-gray-500">Step {stepNumber} of {totalSteps}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={onSave}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Progress</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {children}
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onSkip}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <SkipForward className="w-4 h-4" />
              <span>Skip Step</span>
            </button>

            <button
              onClick={onNext}
              disabled={!canProceed}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {stepNumber === totalSteps ? 'Generate Report' : 'Next Step'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};