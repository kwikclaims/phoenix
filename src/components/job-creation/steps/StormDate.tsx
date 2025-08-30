import React from 'react';
import { Calendar } from 'lucide-react';

interface StormDateProps {
  stormDate: string;
  onChange: (date: string) => void;
  stormDescription?: string;
  onDescriptionChange?: (description: string) => void;
}

export const StormDate: React.FC<StormDateProps> = ({ stormDate, onChange, stormDescription = '', onDescriptionChange }) => {
  const quickDates = [
    { label: 'Today', value: new Date().toISOString().split('T')[0] },
    { label: 'Yesterday', value: new Date(Date.now() - 86400000).toISOString().split('T')[0] },
    { label: 'Last Week', value: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0] },
    { label: 'Last Month', value: new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0] },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-[#FF0000]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Storm Date</h2>
        <p className="text-gray-400">When did the loss or weather event occur?</p>
      </div>
      
      <div className="max-w-md mx-auto space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#FF0000] mb-2">
            Date of Loss *
          </label>
          <input
            type="date"
            value={stormDate}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white transition-all duration-300"
          />
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-3">Quick select:</p>
          <div className="grid grid-cols-2 gap-3">
            {quickDates.map((date) => (
              <button
                key={date.label}
                onClick={() => onChange(date.value)}
                className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                  stormDate === date.value
                    ? 'bg-[#FF0000]/20 border-[#FF0000] text-[#FF0000]'
                    : 'bg-gray-900/30 border-gray-700 text-gray-300 hover:border-[#FF0000]/50 hover:text-[#FF0000]'
                }`}
              >
                {date.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#FF0000] mb-2">
            Loss Description
          </label>
          <textarea
            value={stormDescription}
            onChange={(e) => onDescriptionChange?.(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
            rows={4}
            placeholder="Describe the loss event (e.g., hail size, wind speed, duration, damage observed, weather conditions, etc.)"
          />
          <p className="text-sm text-gray-400 mt-2">
            Provide details about the event including severity, conditions, and any observed damage.
          </p>
        </div>
      </div>
    </div>
  );
};