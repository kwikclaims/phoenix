import React from 'react';
import { RepresentativeInfo } from '../../../types/Job';

interface RepresentativeQuestionsProps {
  data: Partial<RepresentativeInfo>;
  onChange: (updates: Partial<RepresentativeInfo>) => void;
}

export const RepresentativeQuestions: React.FC<RepresentativeQuestionsProps> = ({
  data,
  onChange,
}) => {
  const handleChange = (field: keyof RepresentativeInfo, value: string | boolean) => {
    onChange({ [field]: value });
  };

  const handleCheckboxToggle = (checkboxField: keyof RepresentativeInfo, textField: keyof RepresentativeInfo) => {
    const isChecked = !data[checkboxField];
    onChange({ 
      [checkboxField]: isChecked,
      [textField]: isChecked ? data[textField] : '' // Clear text when unchecked
    });
    
    // Auto-focus the textbox when checked
    if (isChecked) {
      setTimeout(() => {
        const textbox = document.getElementById(textField);
        if (textbox) {
          textbox.focus();
        }
      }, 100);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Representative Information</h2>
        <p className="text-gray-400">Property details and damage assessment</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#FF0000] mb-2">
            Type of Roof *
          </label>
          <input
            type="text"
            value={data.roofType || ''}
            onChange={(e) => handleChange('roofType', e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
            placeholder="e.g., Asphalt Shingles, Metal, Tile"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#FF0000] mb-2">
            Number of Stories *
          </label>
          <input
            type="text"
            value={data.numberOfStories || ''}
            onChange={(e) => handleChange('numberOfStories', e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
            placeholder="e.g., 1, 2, 3+"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#FF0000] mb-2">
            Layers of Roofing *
          </label>
          <input
            type="text"
            value={data.roofingLayers || ''}
            onChange={(e) => handleChange('roofingLayers', e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
            placeholder="e.g., 1, 2, 3, Unknown"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Damage Assessment</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#FF0000] mb-2">
              Is there damage to windows, siding, or gutters? If so, describe the damage (locations, materials, severity).
            </label>
            <textarea
              value={data.hailDamageDetails || ''}
              onChange={(e) => handleChange('hailDamageDetails', e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
              rows={3}
              placeholder="Describe any damage including locations, materials affected, and severity, or leave blank if none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#FF0000] mb-2">
              Is there tree damage present? If so, describe the damage (debris type, impact area, severity).
            </label>
            <textarea
              value={data.treeDamageDetails || ''}
              onChange={(e) => handleChange('treeDamageDetails', e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
              rows={3}
              placeholder="Describe any tree damage including debris type, impact area, and severity, or leave blank if none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#FF0000] mb-2">
              Is there HVAC damage? If so, describe the damage (unit type, components affected, symptoms).
            </label>
            <textarea
              value={data.hvacDamageDetails || ''}
              onChange={(e) => handleChange('hvacDamageDetails', e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
              rows={3}
              placeholder="Describe any HVAC damage including unit type, components affected, and symptoms, or leave blank if none"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Second Representative (Optional)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#FF0000] mb-2">
              Name
            </label>
            <input
              type="text"
              value={data.secondRepName || ''}
              onChange={(e) => handleChange('secondRepName', e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
              placeholder="Second representative name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#FF0000] mb-2">
              Email
            </label>
            <input
              type="email"
              value={data.secondRepEmail || ''}
              onChange={(e) => handleChange('secondRepEmail', e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
              placeholder="second@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#FF0000] mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={data.secondRepPhone || ''}
              onChange={(e) => handleChange('secondRepPhone', e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
              placeholder="(555) 987-6543"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#FF0000] mb-2">
          Additional Notes/Context
        </label>
        <textarea
          value={data.additionalNotes || ''}
          onChange={(e) => handleChange('additionalNotes', e.target.value)}
          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
          rows={4}
          placeholder="Enter any additional notes or context about the property or damage"
        />
      </div>
    </div>
  );
};