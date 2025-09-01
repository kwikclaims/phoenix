import React from 'react';

export const LossDatePage: React.FC = () => {
  const openPDF = () => {
    window.open('/images/PG_MoCo_Storm_Notice_Flyer_Phoenix_Clean.pdf', '_blank');
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto text-center">
        <button
          onClick={openPDF}
          className="px-6 py-3 bg-[#FF0000] text-white rounded-lg hover:bg-[#FF0000]/80 transition-colors"
        >
          View Storm Notice
        </button>
      </div>
    </div>
  );
};