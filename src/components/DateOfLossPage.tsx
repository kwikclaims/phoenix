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

        {/* Information Section */}
        <div className="mt-8 bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-4">Storm Notice Information</h3>
            <p className="text-gray-400 mb-6 max-w-3xl mx-auto">
              This document contains important information about storm damage claims and the date of loss requirements 
              for properties in Prince George's County and Montgomery County, Maryland.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-900/50 rounded-xl p-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-[#FF0000]" />
                </div>
                <p className="text-gray-400 text-sm">Document Type</p>
                <p className="text-xl font-bold text-white">Storm Notice</p>
              </div>
              
              <div className="bg-gray-900/50 rounded-xl p-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏠</span>
                </div>
                <p className="text-gray-400 text-sm">Coverage Area</p>
                <p className="text-xl font-bold text-white">PG & Montgomery County</p>
              </div>
              
              <div className="bg-gray-900/50 rounded-xl p-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-[#FF0000]" />
                </div>
                <p className="text-gray-400 text-sm">Format</p>
                <p className="text-xl font-bold text-white">PDF Document</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 bg-gradient-to-br from-gray-900 to-black py-16 rounded-2xl">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">📞</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Questions About Your Date of Loss?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Our team can help you understand the storm damage timeline and assist with your insurance claim process.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a
                href="tel:(301)450-9487"
                className="px-8 py-4 bg-gradient-to-r from-[#FF0000] to-[#C20F1F] text-white rounded-xl hover:shadow-lg hover:shadow-[#FF0000]/25 transition-all duration-300 font-semibold text-lg transform hover:scale-105"
              >
                Call (301) 450-9487
              </a>
              <p className="text-gray-400">
                Free consultation • Expert guidance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};