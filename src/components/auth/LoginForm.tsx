import React, { useState } from 'react';
import { Zap } from 'lucide-react';

interface LoginFormProps {
  onLogin: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === '1209') {
      onLogin();
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 relative overflow-hidden animate-fade-in">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF0000]/10 rounded-full blur-3xl animate-pulse animate-delay-500"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FF0000]/5 rounded-full blur-3xl animate-pulse animate-delay-700"></div>
      </div>

      <div className="relative bg-black/80 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full p-8 border border-[#FF0000]/20 animate-scale-in animate-delay-300">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#FF0000] to-[#C20F1F] rounded-2xl mb-6 transform hover:scale-110 transition-transform duration-300 animate-scale-in animate-delay-400">
            <Zap className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-black" />
          </div>
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 animate-fade-in-up animate-delay-500">Phoenix</h1>
          <p className="text-gray-400 animate-fade-in-up animate-delay-600">Insurance Claim Job Manager</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up animate-delay-700">
          <div>
            <label className="block text-base sm:text-lg font-medium text-white mb-3">
              Enter Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className={`w-full px-4 py-4 bg-gray-900/50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] transition-all duration-300 text-white placeholder-gray-500 ${
                error ? 'border-red-500' : 'border-gray-700 hover:border-[#FF0000]/50'
              }`}
              placeholder="Enter password"
              autoFocus
            />
            {error && (
              <p className="text-red-400 text-sm mt-2 animate-pulse">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#FF0000] to-[#C20F1F] text-white py-4 rounded-xl hover:shadow-lg hover:shadow-[#FF0000]/25 transition-all duration-300 font-semibold text-base sm:text-lg transform hover:scale-105 active:scale-95 hover-glow"
          >
            Access Phoenix
          </button>
        </form>
      </div>
    </div>
  );
};