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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Representative Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type of Roof *
          </label>
          <select
            value={data.roofType || ''}
            onChange={(e) => handleChange('roofType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Roof Type</option>
            <option value="Asphalt Shingles">Asphalt Shingles</option>
            <option value="Metal">Metal</option>
            <option value="Tile">Tile</option>
            <option value="Slate">Slate</option>
            <option value="Wood Shingles">Wood Shingles</option>
            <option value="Flat/Built-up">Flat/Built-up</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Stories *
          </label>
          <select
            value={data.numberOfStories || ''}
            onChange={(e) => handleChange('numberOfStories', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Stories</option>
            <option value="1">1 Story</option>
            <option value="2">2 Stories</option>
            <option value="3">3 Stories</option>
            <option value="3+">3+ Stories</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Layers of Roofing *
          </label>
          <select
            value={data.roofingLayers || ''}
            onChange={(e) => handleChange('roofingLayers', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Layers</option>
            <option value="1">1 Layer</option>
            <option value="2">2 Layers</option>
            <option value="3">3 Layers</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Damage Assessment</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hailDamage"
              checked={data.hailDamage || false}
              onChange={(e) => handleChange('hailDamage', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="hailDamage" className="ml-2 text-sm font-medium text-gray-700">
              Hail damage to windows, siding, gutters?
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="treeDamage"
              checked={data.treeDamage || false}
              onChange={(e) => handleChange('treeDamage', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="treeDamage" className="ml-2 text-sm font-medium text-gray-700">
              Tree damage present?
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="hvacDamage"
              checked={data.hvacDamage || false}
              onChange={(e) => handleChange('hvacDamage', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="hvacDamage" className="ml-2 text-sm font-medium text-gray-700">
              HVAC damage?
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Primary Representative</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              value={data.primaryRepName || ''}
              onChange={(e) => handleChange('primaryRepName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter representative name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={data.primaryRepEmail || ''}
              onChange={(e) => handleChange('primaryRepEmail', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone *
            </label>
            <input
              type="tel"
              value={data.primaryRepPhone || ''}
              onChange={(e) => handleChange('primaryRepPhone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Second Representative (Optional)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={data.secondRepName || ''}
              onChange={(e) => handleChange('secondRepName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter representative name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={data.secondRepEmail || ''}
              onChange={(e) => handleChange('secondRepEmail', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={data.secondRepPhone || ''}
              onChange={(e) => handleChange('secondRepPhone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Notes/Context
        </label>
        <textarea
          value={data.additionalNotes || ''}
          onChange={(e) => handleChange('additionalNotes', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Enter any additional notes or context about the property or damage"
        />
      </div>
    </div>
  );
};