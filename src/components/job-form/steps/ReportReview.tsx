import React from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import { JobProgress } from '../../../types/Job';

interface ReportReviewProps {
  job: JobProgress;
  onGenerateReport: () => void;
}

export const ReportReview: React.FC<ReportReviewProps> = ({ job, onGenerateReport }) => {
  const sections = [
    {
      title: 'Homeowner Information',
      completed: !!(job.homeownerInfo.firstName && job.homeownerInfo.lastName),
      content: job.homeownerInfo.firstName ? 
        `${job.homeownerInfo.firstName} ${job.homeownerInfo.lastName}` : 
        'Not provided'
    },
    {
      title: 'Representative Information',
      completed: !!(job.representativeInfo.primaryRepName),
      content: job.representativeInfo.primaryRepName || 'Not provided'
    },
    {
      title: 'Storm Date',
      completed: !!job.stormDate,
      content: job.stormDate ? new Date(job.stormDate).toLocaleDateString() : 'Not provided'
    },
    {
      title: 'Call Recording',
      completed: !!job.callRecording,
      content: job.callRecording ? 'Recording and transcription available' : 'Not provided'
    },
    {
      title: 'Representative Agreement',
      completed: !!job.representativeSignature,
      content: job.representativeSignature ? 'Signature captured' : 'Not signed'
    },
    {
      title: 'Direct Payment Agreement',
      completed: !!job.paymentSignature,
      content: job.paymentSignature ? 'Signature captured' : 'Not signed'
    },
    {
      title: 'Photos',
      completed: job.photos.length > 0,
      content: `${job.photos.length} photos uploaded`
    },
    {
      title: 'Cover Letter',
      completed: !!job.coverLetter.trim(),
      content: job.coverLetter.trim() ? 'Cover letter written' : 'Not provided'
    },
    {
      title: 'Repairability Test',
      completed: !!job.repairabilityTestLink.trim(),
      content: job.repairabilityTestLink.trim() ? 'Link provided' : 'Not provided'
    },
    {
      title: 'ITEL Test',
      completed: !!job.itelTestFile,
      content: job.itelTestFile ? job.itelTestFile.filename : 'Not uploaded'
    },
  ];

  const completedSections = sections.filter(section => section.completed).length;
  const completionPercentage = Math.round((completedSections / sections.length) * 100);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Report Review & Generation</h2>
      
      {/* Completion Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-blue-900">Report Completion</h3>
          <span className="text-2xl font-bold text-blue-600">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-blue-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <p className="text-blue-800 mt-2">
          {completedSections} of {sections.length} sections completed
        </p>
      </div>

      {/* Section Status */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Report Sections</h3>
        {sections.map((section, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 rounded-lg border ${
              section.completed
                ? 'bg-green-50 border-green-200'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  section.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {section.completed ? '✓' : index + 1}
              </div>
              <div>
                <p className="font-medium text-gray-900">{section.title}</p>
                <p className="text-sm text-gray-600">{section.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Preview */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Preview</h3>
        <p className="text-gray-600 mb-4">
          Your report will include all completed sections above. The final PDF will contain:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Cover letter with claim summary</li>
          <li>All uploaded photos with damage indicators</li>
          <li>Repairability test information and link</li>
          <li>ITEL test documentation (if uploaded)</li>
          <li>Signed representative agreement</li>
          <li>Signed direct payment agreement</li>
          <li>Call recording transcription (if available)</li>
        </ul>
      </div>

      {/* Generate Report Button */}
      <div className="flex justify-center">
        <button
          onClick={onGenerateReport}
          className="flex items-center space-x-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium"
        >
          <FileText className="w-6 h-6" />
          <span>Generate Final Report</span>
        </button>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>
          Once generated, your report will be available for download and the job will be moved to completed jobs.
        </p>
      </div>
    </div>
  );
};