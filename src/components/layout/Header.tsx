import React, { useState } from 'react';
import { Menu, X, Download, User, Zap, Save } from 'lucide-react';
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

  const menuItems = [
    { id: 'home', label: 'Home', emoji: '🏠' },
    { id: 'how-it-works', label: 'How It Works', emoji: '📖' },
    { id: 'my-work', label: 'My Work', emoji: '🏗️' },
    { id: 'my-process', label: 'My Process', emoji: '📋' },
    { id: 'recent-storms', label: 'Recent Storms', emoji: '📅' },
    { id: 'portal', label: 'Portal', emoji: '🌐' },
  ];

  const handleMenuItemClick = (itemId: string) => {
    onNavigate(itemId);
    setIsMenuOpen(false);
  };

  return (
    <div>
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
              </nav>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};