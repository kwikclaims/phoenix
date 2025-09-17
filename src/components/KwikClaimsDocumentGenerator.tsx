import React from 'react';
import { FileText, Zap, ArrowLeft } from 'lucide-react';

interface KwikClaimsDocumentGeneratorProps {
  onNavigate?: (page: string) => void;
}

export const KwikClaimsDocumentGenerator: React.FC<KwikClaimsDocumentGeneratorProps> = ({ onNavigate }) => {
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
            <Zap className="w-10 h-10 text-[#FF0000]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Kwik Claims Document Generator</h1>
          <p className="text-gray-400 text-lg">Generate professional documents for Kwik Claims projects</p>
        </div>

        {/* Empty State */}
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-12 h-12 text-[#FF0000]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Document Generation Coming Soon</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Kwik Claims document generation tools will be available here in a future update.
          </p>
          <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-white mb-4">Planned Document Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="space-y-2">
                <p className="text-gray-300">• Estimates</p>
                <p className="text-gray-300">• Invoices</p>
                <p className="text-gray-300">• Warranty Certificates</p>
                <p className="text-gray-300">• Payment Receipts</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-300">• Authorization Forms</p>
                <p className="text-gray-300">• Certificates of Completion</p>
                <p className="text-gray-300">• Claim Documentation</p>
                <p className="text-gray-300">• Professional Reports</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};