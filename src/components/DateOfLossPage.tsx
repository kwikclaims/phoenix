import React, { useState } from 'react';

export const DateOfLossPage: React.FC = () => {
  const [showPdf, setShowPdf] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {!showPdf ? (
        <button
          onClick={() => setShowPdf(true)}
          className="px-8 py-4 bg-gradient-to-r from-[#FF0000] to-[#C20F1F] text-white rounded-xl hover:shadow-lg hover:shadow-[#FF0000]/25 transition-all duration-300 font-semibold text-lg transform hover:scale-105"
        >
          View Storm Notice Flyer
        </button>
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full h-full max-w-6xl max-h-[95vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Storm Notice Flyer</h3>
              <button
                onClick={() => setShowPdf(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors text-2xl"
              >
                ×
              </button>
            </div>
            <iframe
              src="/docs/PG_MoCo_Storm_Notice_Flyer_Phoenix_Clean.pdf"
              className="w-full h-[calc(100%-60px)]"
              title="Storm Notice Flyer"
            />
          </div>
        </div>
      )}
    </div>
  );
};