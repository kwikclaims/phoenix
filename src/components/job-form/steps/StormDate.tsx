import React from 'react';

interface StormDateProps {
  stormDate: string;
  onChange: (date: string) => void;
}

export const StormDate: React.FC<StormDateProps> = ({ stormDate, onChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Storm Date</h2>
      
      <div className="max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date of Storm Event *
        </label>
        <input
          type="date"
          value={stormDate}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-sm text-gray-500 mt-2">
          Select the date when the storm or weather event occurred that caused the damage.
        </p>
      </div>
    </div>
  );
};