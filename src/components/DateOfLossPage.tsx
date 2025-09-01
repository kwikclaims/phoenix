import React from 'react';
import { Calendar, FileText, ExternalLink } from 'lucide-react';

export const DateOfLossPage: React.FC = () => {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-10 h-10 text-[#FF0000]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Date of Loss</h1>
          <p className="text-gray-400 text-lg">Storm Notice Information for Prince George's & Montgomery County</p>
        </div>

        {/* PDF Viewer */}
        <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 overflow-hidden">
          <div className="bg-black/40 border-b border-[#FF0000]/20 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Storm Notice Flyer</h2>
              <a
                href="/docs/PG_MoCo_Storm_Notice_Flyer_Phoenix_Clean.pdf"
                download="PG_MoCo_Storm_Notice_Flyer_Phoenix_Clean.pdf"
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#FF0000] to-[#C20F1F] text-white rounded-xl hover:shadow-lg hover:shadow-[#FF0000]/25 transition-all duration-300 font-semibold transform hover:scale-105"
              >
                <FileText className="w-5 h-5" />
                <span>Download PDF</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div className="p-6">
            <div className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-700/50">
              <iframe
                src="/docs/PG_MoCo_Storm_Notice_Flyer_Phoenix_Clean.pdf"
                className="w-full h-[800px] border-0"
                title="Storm Notice Flyer - Prince George's & Montgomery County"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};