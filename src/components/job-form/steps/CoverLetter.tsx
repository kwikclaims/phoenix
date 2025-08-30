import React from 'react';
import { FileText } from 'lucide-react';

interface CoverLetterProps {
  coverLetter: string;
  onChange: (coverLetter: string) => void;
}

export const CoverLetter: React.FC<CoverLetterProps> = ({ coverLetter, onChange }) => {
  const generateCoverLetter = () => {
    // Placeholder for cover letter generation
    alert('Cover letter generation feature will be implemented in a future update.');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Cover Letter</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cover Letter Content
        </label>
        <textarea
          value={coverLetter}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={12}
          placeholder="Write a detailed summary and context for this insurance claim. Include information about the damage, circumstances, and any relevant details that will help with the claim process."
        />
        <p className="text-sm text-gray-500 mt-2">
          Provide a comprehensive summary of the claim, damage assessment, and any relevant context.
        </p>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={generateCoverLetter}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FileText className="w-5 h-5" />
          <span>Generate Cover Letter</span>
        </button>
      </div>
    </div>
  );
};