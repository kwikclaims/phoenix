import React from 'react';
import { Award } from 'lucide-react';
import SafeImg from './SafeImg';

export const BadgePage: React.FC = () => {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Award className="w-10 h-10 text-[#FF0000]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Badge</h1>
        </div>

        {/* Badge Image Display */}
        <div className="flex justify-center">
          <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 p-8">
            <SafeImg
              srcPath="/images/image.png"
              alt="Badge"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};