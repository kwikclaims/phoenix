import React from 'react';
import { FileText, Sparkles } from 'lucide-react';

interface CoverLetterProps {
  coverLetter: string;
  onChange: (coverLetter: string) => void;
}

export const CoverLetter: React.FC<CoverLetterProps> = ({ coverLetter, onChange }) => {
  const generateCoverLetter = () => {
    // Placeholder for cover letter generation
    alert('✨ Auto-Draft feature coming soon! This will use AI to generate a professional cover letter based on your claim details.');
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-[#FF0000]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Cover Letter Context</h2>
        <p className="text-gray-400">Write a detailed summary and context for this claim</p>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#FF0000] mb-2">
            Cover Letter Context
          </label>
          <textarea
            value={coverLetter}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
            rows={12}
            placeholder="Write a detailed summary and context for this insurance claim. Include information about the damage, circumstances, and any relevant details that will help with the claim process."
          />
          <p className="text-sm text-gray-400 mt-2">
            Provide a comprehensive summary of the claim, damage assessment, and any relevant context.
          </p>
        </div>
      </div>
    </div>
  );
};