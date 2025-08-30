import React from 'react';
import { ExternalLink } from 'lucide-react';

interface RepairabilityTestProps {
  repairabilityTestLink: string;
  onChange: (link: string) => void;
}

export const RepairabilityTest: React.FC<RepairabilityTestProps> = ({
  repairabilityTestLink,
  onChange,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Repairability Test</h2>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">What is a Repairability Test?</h3>
        <p className="text-blue-800 leading-relaxed">
          A Repairability Test is a comprehensive assessment that determines whether damaged roofing materials 
          can be effectively repaired or if they require complete replacement. This test evaluates factors such as:
        </p>
        <ul className="list-disc list-inside text-blue-800 mt-3 space-y-1">
          <li>Extent and severity of damage</li>
          <li>Age and condition of existing materials</li>
          <li>Availability of matching materials</li>
          <li>Cost-effectiveness of repair vs. replacement</li>
          <li>Long-term durability and warranty considerations</li>
        </ul>
        <p className="text-blue-800 mt-3">
          The results of this test are crucial for insurance claim processing and determining the appropriate 
          course of action for the damaged property.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Repairability Test Link
        </label>
        <div className="flex space-x-2">
          <input
            type="url"
            value={repairabilityTestLink}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/repairability-test-results"
          />
          {repairabilityTestLink && (
            <a
              href={repairabilityTestLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Paste the link to the completed repairability test results.
        </p>
      </div>
    </div>
  );
};