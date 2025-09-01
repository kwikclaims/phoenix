import React from 'react';

export const DateOfLossPage: React.FC = () => {
  return (
    <div className="min-h-screen p-4">
      <div className="w-full h-[calc(100vh-2rem)] bg-white rounded-lg overflow-hidden">
        <iframe
          src="/docs/PG_MoCo_Storm_Notice_Flyer_Phoenix_Clean.pdf"
          className="w-full h-full"
          title="Storm Notice Flyer"
        />
      </div>
    </div>
  );
};