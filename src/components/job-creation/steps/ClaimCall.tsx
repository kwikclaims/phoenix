import React, { useRef } from 'react';
import { Phone, Upload, FileText, X } from 'lucide-react';
import { uploadFile, deleteFile, generateFilePath, STORAGE_BUCKETS } from '../../../lib/supabase';

interface ClaimCallProps {
  claimInfo?: {
    claimNumber: string;
    adjusterMeetingDate: string;
    adjusterFirstName: string;
    adjusterLastName: string;
    adjusterPhone: string;
    adjusterExt: string;
    adjusterEmail: string;
    ladderAssistPhone: string;
    insuranceEmail: string;
    insurancePortalLink: string;
  };
  onChange: (recording: { audioUrl: string; transcription: string }) => void;
  onClaimInfoChange?: (claimInfo: any) => void;
}

export const ClaimCall: React.FC<ClaimCallProps> = ({ 
  claimInfo,
  onClaimInfoChange
}) => {
  const handleClaimInfoChange = (field: string, value: string) => {
    const updatedClaimInfo = { ...claimInfo, [field]: value };
    if (onClaimInfoChange) {
      onClaimInfoChange(updatedClaimInfo);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Phone className="w-8 h-8 text-[#FF0000]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Claim Call</h2>
        <p className="text-gray-400">Claim information and insurance details</p>
      </div>
      
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Claim Information Fields */}
        <div className="border-t border-gray-700 pt-6">
          <h3 className="text-xl font-semibold text-white mb-4">Claim Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#FF0000] mb-2">
                Claim Number
              </label>
              <input
                type="text"
                value={claimInfo?.claimNumber || ''}
                onChange={(e) => handleClaimInfoChange('claimNumber', e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
                placeholder="Enter claim number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#FF0000] mb-2">
                Adjuster Meeting Date
              </label>
              <input
                type="date"
                value={claimInfo?.adjusterMeetingDate || ''}
                onChange={(e) => handleClaimInfoChange('adjusterMeetingDate', e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#FF0000] mb-2">
                Adjuster First Name
              </label>
              <input
                type="text"
                value={claimInfo?.adjusterFirstName || ''}
                onChange={(e) => handleClaimInfoChange('adjusterFirstName', e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
                placeholder="Enter adjuster first name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#FF0000] mb-2">
                Adjuster Last Name
              </label>
              <input
                type="text"
                value={claimInfo?.adjusterLastName || ''}
                onChange={(e) => handleClaimInfoChange('adjusterLastName', e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
                placeholder="Enter adjuster last name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#FF0000] mb-2">
                Adjuster Phone Number
              </label>
              <input
                type="tel"
                value={claimInfo?.adjusterPhone || ''}
                onChange={(e) => handleClaimInfoChange('adjusterPhone', e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#FF0000] mb-2">
                Adjuster Ext
              </label>
              <input
                type="text"
                value={claimInfo?.adjusterExt || ''}
                onChange={(e) => handleClaimInfoChange('adjusterExt', e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
                placeholder="Extension"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#FF0000] mb-2">
                Adjuster Email
              </label>
              <input
                type="email"
                value={claimInfo?.adjusterEmail || ''}
                onChange={(e) => handleClaimInfoChange('adjusterEmail', e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
                placeholder="adjuster@insurance.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#FF0000] mb-2">
                Ladder Assist Phone Number
              </label>
              <input
                type="tel"
                value={claimInfo?.ladderAssistPhone || ''}
                onChange={(e) => handleClaimInfoChange('ladderAssistPhone', e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
                placeholder="(555) 987-6543"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#FF0000] mb-2">
                Insurance Email
              </label>
              <input
                type="email"
                value={claimInfo?.insuranceEmail || ''}
                onChange={(e) => handleClaimInfoChange('insuranceEmail', e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
                placeholder="claims@insurance.com"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#FF0000] mb-2">
                Insurance File Upload Portal Link
              </label>
              <input
                type="url"
                value={claimInfo?.insurancePortalLink || ''}
                onChange={(e) => handleClaimInfoChange('insurancePortalLink', e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
                placeholder="https://portal.insurance.com/upload"
              />
              <p className="text-sm text-gray-400 mt-2">
                Link to the insurance company's file upload portal for submitting documents
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};