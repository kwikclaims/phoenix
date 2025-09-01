import React, { useState } from 'react';
import { Menu, X, Download, User, LogOut, Zap, Save } from 'lucide-react';
import { User as UserType, ContractorInfo } from '../../types/User';

interface HeaderProps {
  title: string;
  user: UserType;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
  showDownload?: boolean;
  onDownload?: () => void;
  onUserUpdate?: (updates: Partial<UserType>) => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  user,
  onLogout,
  onNavigate,
  currentPage,
  showDownload = false,
  onDownload,
  onUserUpdate,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [contractorInfo, setContractorInfo] = useState<Partial<ContractorInfo>>(
    user.contractorInfo || {}
  );
  const [isSaving, setIsSaving] = useState(false);

  const menuItems = [
    { id: 'projects', label: 'Projects', emoji: '🏠' },
    { id: 'todos', label: 'To-Do List', emoji: '✅' },
    { id: 'inspection', label: 'Inspection Report', emoji: '📋' },
    { id: 'follow-ups', label: 'Follow-Ups', emoji: '📞' },
    { id: 'updates', label: 'Updates', emoji: '📢' },
    { id: 'how-it-works', label: 'How It Works', emoji: '📖' },
    { id: 'our-work', label: 'Our Work', emoji: '🏗️' },
    { id: 'documents', label: 'Documents', emoji: '📄' },
    { id: 'financial', label: 'Financial', emoji: '💰' },
    { id: 'process', label: 'Process', emoji: '📋' },
    { id: 'debug', label: 'Sheets Debug', emoji: '🐛' },
    { id: 'badge', label: 'Badge', emoji: '🏆' },
    { id: 'loss-date', label: 'Loss Date', emoji: '📅' },
    { id: 'account-settings', label: 'Account Settings', emoji: '⚙️' },
  ];

  const handleMenuItemClick = (itemId: string) => {
    if (itemId === 'account-settings') {
      setShowAccountSettings(true);
    } else {
      onNavigate(itemId);
    }
    setIsMenuOpen(false);
  };

  const handleContractorInfoChange = (field: keyof ContractorInfo, value: string) => {
    setContractorInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveContractorInfo = async () => {
    if (!onUserUpdate) return;
    
    console.log('🔍 DEBUG - Saving contractor info from Header.tsx:', contractorInfo);
    
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate save delay
      onUserUpdate({ contractorInfo: contractorInfo as ContractorInfo });
      console.log('🔍 DEBUG - Contractor info saved successfully');
      // Show success message briefly
      setTimeout(() => setIsSaving(false), 1000);
    } catch (error) {
      setIsSaving(false);
      console.error('🔍 DEBUG - Failed to save contractor info:', error);
      console.error('Failed to save contractor info:', error);
    }
  };

  return (
    <>
      <header className="bg-black/90 backdrop-blur-xl border-b border-[#00C56F]/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-[#FF0000] to-[#C20F1F] rounded-lg flex items-center justify-center">
                <Zap className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-black" />
              </div>
              <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white truncate max-w-[120px] sm:max-w-[200px] md:max-w-none">{title}</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {showDownload && onDownload && (
                <button
                  onClick={onDownload}
                  className="p-2 text-[#FF0000] hover:text-white hover:bg-[#FF0000]/20 rounded-lg transition-all duration-300 transform hover:scale-110"
                  title="Download Report"
                >
                  <Download className="w-5 h-5" />
                </button>
              )}
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-[#FF0000] hover:text-white hover:bg-[#FF0000]/20 rounded-lg transition-all duration-300 transform hover:scale-110"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 right-0 left-0 bg-black/95 backdrop-blur-xl border-b border-[#FF0000]/20 shadow-2xl z-50 max-w-full max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <nav className="space-y-3">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMenuItemClick(item.id)}
                    className={`w-full text-left px-6 py-4 rounded-xl transition-all duration-300 flex items-center space-x-3 transform hover:scale-105 ${
                      currentPage === item.id
                        ? 'bg-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/30'
                        : 'text-white hover:bg-[#FF0000]/10 hover:text-[#FF0000]'
                    }`}
                  >
                    <span className="text-lg sm:text-xl flex-shrink-0">{item.emoji}</span>
                    <span className="font-medium truncate">{item.label}</span>
                  </button>
                ))}
                <button
                  onClick={onLogout}
                  className="w-full text-left px-6 py-4 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 flex items-center space-x-3 transform hover:scale-105 overflow-hidden"
                >
                  <LogOut className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium truncate">Logout</span>
                </button>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Account Settings Modal */}
      {showAccountSettings && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAccountSettings(false)}></div>
            
            <div className="relative bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#FF0000]/20">
              <div className="sticky top-0 bg-black/90 backdrop-blur-xl border-b border-[#FF0000]/20 p-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Account Settings</h2>
                  <div className="flex items-center space-x-3">
                    {onUserUpdate && (
                      <button
                        onClick={handleSaveContractorInfo}
                        disabled={isSaving}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                          isSaving
                            ? 'bg-[#FF0000]/20 text-[#FF0000] cursor-not-allowed'
                            : 'bg-[#FF0000] text-white hover:bg-[#FF0000]/80'
                        }`}
                      >
                        <Save className="w-4 h-4" />
                        <span>{isSaving ? 'Saved!' : 'Save Changes'}</span>
                      </button>
                    )}
                    <button
                      onClick={() => setShowAccountSettings(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-8">
                {/* User Information */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6">User Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-900/50 rounded-xl p-4">
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        First Name
                      </label>
                      <p className="text-white text-lg">{user.firstName}</p>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-4">
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Last Name
                      </label>
                      <p className="text-white text-lg">{user.lastName}</p>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-4">
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Email
                      </label>
                      <p className="text-white text-lg">{user.email}</p>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-4">
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Phone Number
                      </label>
                      <p className="text-white text-lg">{user.phoneNumber}</p>
                    </div>
                  </div>
                </div>

                {/* Contractor Information */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Contractor Information</h3>
                  <p className="text-gray-400 mb-6">Details about the contractor handling jobs</p>
                  
                  {/* Company Details */}
                  <div className="mb-8">
                    <h4 className="text-lg font-medium text-[#FF0000] mb-4">Company Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          value={contractorInfo.companyName || ''}
                          onChange={(e) => handleContractorInfoChange('companyName', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500"
                          placeholder="Enter company name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Primary Contact Name *
                        </label>
                        <input
                          type="text"
                          value={contractorInfo.primaryContactName || ''}
                          onChange={(e) => handleContractorInfoChange('primaryContactName', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500"
                          placeholder="Enter contact name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={contractorInfo.phoneNumber || ''}
                          onChange={(e) => handleContractorInfoChange('phoneNumber', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Website
                        </label>
                        <input
                          type="url"
                          value={contractorInfo.website || ''}
                          onChange={(e) => handleContractorInfoChange('website', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500"
                          placeholder="https://www.company.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          License Number
                        </label>
                        <input
                          type="text"
                          value={contractorInfo.licenseNumber || ''}
                          onChange={(e) => handleContractorInfoChange('licenseNumber', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500"
                          placeholder="Enter license number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Primary Contact Phone Number
                        </label>
                        <input
                          type="tel"
                          value={contractorInfo.primaryContactPhone || ''}
                          onChange={(e) => handleContractorInfoChange('primaryContactPhone', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500"
                          placeholder="(555) 987-6543"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Insurance Policy Number
                        </label>
                        <input
                          type="text"
                          value={contractorInfo.insurancePolicyNumber || ''}
                          onChange={(e) => handleContractorInfoChange('insurancePolicyNumber', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500"
                          placeholder="Enter insurance policy number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Insurance Company
                        </label>
                        <input
                          type="text"
                          value={contractorInfo.insuranceCompanyName || ''}
                          onChange={(e) => handleContractorInfoChange('insuranceCompanyName', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500"
                          placeholder="Enter insurance company name"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      value={contractorInfo.additionalNotes || ''}
                      onChange={(e) => handleContractorInfoChange('additionalNotes', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500"
                      rows={4}
                      placeholder="Enter any additional notes about the contractor or special requirements"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};