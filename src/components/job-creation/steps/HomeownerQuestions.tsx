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

  const handleCheckboxToggle = (checkboxField: keyof HomeownerInfo, textField: keyof HomeownerInfo) => {
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
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Homeowner Information</h2>
        <p className="text-gray-400">Let's start with the basics about you and your property</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#FF0000] mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={data.firstName || ''}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
            placeholder="Your first name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#FF0000] mb-2">
            And your last name? *
          </label>
          <input
            type="text"
            value={data.lastName || ''}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
            placeholder="Your last name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#FF0000] mb-2">
            We'll send status drops here *
          </label>
          <input
            type="email"
            value={data.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#FF0000] mb-2">
            Text alerts, FTW *
          </label>
          <input
            type="tel"
            value={data.phoneNumber || ''}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#FF0000] mb-2">
            Property Address *
          </label>
          <input
            type="text"
            value={data.propertyAddress || ''}
            onChange={(e) => handleChange('propertyAddress', e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
            placeholder="123 Main Street"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#FF0000] mb-2">
            City *
          </label>
          <input
            type="text"
            value={data.city || ''}
            onChange={(e) => handleChange('city', e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
            placeholder="Your city"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#FF0000] mb-2">
            State *
          </label>
          <input
            type="text"
            value={data.state || ''}
            onChange={(e) => handleChange('state', e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
            placeholder="State"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#FF0000] mb-2">
            ZIP Code *
          </label>
          <input
            type="text"
            value={data.zipCode || ''}
            onChange={(e) => handleChange('zipCode', e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
            placeholder="12345"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#FF0000] mb-2">
            Insurance Company *
          </label>
          <input
            type="text"
            value={data.insuranceCompany || ''}
            onChange={(e) => handleChange('insuranceCompany', e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white transition-all duration-300"
            placeholder="Enter insurance company name"
          >
          </input>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#FF0000] mb-2">
            Age of Roof (years) *
          </label>
          <input
            type="number"
            value={data.roofAge || ''}
            onChange={(e) => handleChange('roofAge', e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
            placeholder="10"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#FF0000] mb-2">
            Last Time Someone Was on Roof
          </label>
          <input
            type="text"
            value={data.lastRoofAccess || ''}
            onChange={(e) => handleChange('lastRoofAccess', e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
            placeholder="6 months ago"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#FF0000] mb-2">
            Years with Current Insurer
          </label>
          <input
            type="number"
            value={data.yearsWithInsurer || ''}
            onChange={(e) => handleChange('yearsWithInsurer', e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
            placeholder="5"
            min="0"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Additional Information</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#FF0000] mb-2">
              Do you have any previous claims filed? If so, why were they filed and how many?
            </label>
            <textarea
              value={data.previousClaimsDetails || ''}
              onChange={(e) => handleChange('previousClaimsDetails', e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
              rows={3}
              placeholder="Enter details about any previous claims, including reasons and number of claims, or leave blank if none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#FF0000] mb-2">
              Have you paid out-of-pocket for roof repairs? If so, provide payment details (amount, date, reason).
            </label>
            <textarea
              value={data.paidOutOfPocketDetails || ''}
              onChange={(e) => handleChange('paidOutOfPocketDetails', e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
              placeholder="Enter details about any out-of-pocket payments including amount, date, and reason, or leave blank if none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#FF0000] mb-2">
              Which rooms are affected?
            </label>
            <textarea
              value={data.leakRooms || ''}
              onChange={(e) => handleChange('leakRooms', e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
              rows={3}
              placeholder="Describe any interior damage, leaks or water stains and which rooms are affected, or leave blank if none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};