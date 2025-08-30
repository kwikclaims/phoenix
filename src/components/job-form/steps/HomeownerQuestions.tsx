import React from 'react';
import { HomeownerInfo } from '../../../types/Job';

interface HomeownerQuestionsProps {
  data: Partial<HomeownerInfo>;
  onChange: (updates: Partial<HomeownerInfo>) => void;
}

export const HomeownerQuestions: React.FC<HomeownerQuestionsProps> = ({
  data,
  onChange,
}) => {
  const handleChange = (field: keyof HomeownerInfo, value: string | boolean) => {
    onChange({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Homeowner Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={data.firstName || ''}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter first name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={data.lastName || ''}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter last name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Best Email *
          </label>
          <input
            type="email"
            value={data.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Best Phone Number *
          </label>
          <input
            type="tel"
            value={data.phoneNumber || ''}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter phone number"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Address *
          </label>
          <input
            type="text"
            value={data.propertyAddress || ''}
            onChange={(e) => handleChange('propertyAddress', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter street address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            value={data.city || ''}
            onChange={(e) => handleChange('city', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter city"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          <input
            type="text"
            value={data.state || ''}
            onChange={(e) => handleChange('state', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter state"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ZIP Code *
          </label>
          <input
            type="text"
            value={data.zipCode || ''}
            onChange={(e) => handleChange('zipCode', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter ZIP code"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Insurance Company *
          </label>
          <input
            type="text"
            value={data.insuranceCompany || ''}
            onChange={(e) => handleChange('insuranceCompany', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter insurance company name"
          >
          </input>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age of Roof (years) *
          </label>
          <input
            type="number"
            value={data.roofAge || ''}
            onChange={(e) => handleChange('roofAge', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter roof age"
            min="0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Time Someone Was on the Roof
          </label>
          <input
            type="text"
            value={data.lastRoofAccess || ''}
            onChange={(e) => handleChange('lastRoofAccess', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 6 months ago, never, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Years with Current Insurer
          </label>
          <input
            type="number"
            value={data.yearsWithInsurer || ''}
            onChange={(e) => handleChange('yearsWithInsurer', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter number of years"
            min="0"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="previousClaims"
            checked={data.previousClaims || false}
            onChange={(e) => handleChange('previousClaims', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="previousClaims" className="ml-2 text-sm font-medium text-gray-700">
            Have you filed any previous claims?
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="paidOutOfPocket"
            checked={data.paidOutOfPocket || false}
            onChange={(e) => handleChange('paidOutOfPocket', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="paidOutOfPocket" className="ml-2 text-sm font-medium text-gray-700">
            Have you paid out-of-pocket for roof repairs?
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="activeLeaks"
            checked={data.activeLeaks || false}
            onChange={(e) => handleChange('activeLeaks', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="activeLeaks" className="ml-2 text-sm font-medium text-gray-700">
            Are there active leaks or water stains?
          </label>
        </div>

        {data.activeLeaks && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Which rooms have leaks or water stains?
            </label>
            <textarea
              value={data.leakRooms || ''}
              onChange={(e) => handleChange('leakRooms', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Describe the rooms and locations of leaks or water stains"
            />
          </div>
        )}
      </div>
    </div>
  );
};