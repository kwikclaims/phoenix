import React, { useState } from 'react';
import { ClipboardCheck, Download, FileText, ArrowLeft } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { toast } from 'sonner';

interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  description: string;
  codeReference?: string;
  result?: 'yes' | 'no';
}

interface InspectionReportPageProps {
  onNavigate?: (page: string) => void;
}

export const InspectionReportPage: React.FC<InspectionReportPageProps> = ({ onNavigate }) => {
  const [propertyAddress, setPropertyAddress] = useState('');
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    // 1. Exterior – Ground Level (before mounting roof)
    {
      id: 'overview-pictures',
      category: 'Exterior – Ground Level',
      title: 'Overview Pictures',
      description: 'context photos (not code-mandated but essential for documenting collateral).'
    },
    {
      id: 'downspouts-gutters',
      category: 'Exterior – Ground Level',
      title: 'Downspouts & Gutters',
      description: 'dents, separation, hail damage.',
      codeReference: 'IRC R903.4 / R903.4.1 – Roof drainage required; gutters/drainage must be maintained where provided.'
    },
    {
      id: 'siding-cladding',
      category: 'Exterior – Ground Level',
      title: 'Siding/Cladding',
      description: 'impact damage, spatter, cracking.',
      codeReference: 'IRC R703 – Exterior wall covering must be weather-resistant and intact.'
    },
    {
      id: 'windows',
      category: 'Exterior – Ground Level',
      title: 'Windows',
      description: 'broken glass, damaged screens/frames.',
      codeReference: 'IRC R308 – Glazing requirements; windows must maintain structural integrity.'
    },
    {
      id: 'doors',
      category: 'Exterior – Ground Level',
      title: 'Doors',
      description: 'dents, displacement, leaks.',
      codeReference: 'IRC R612 – Exterior doors must meet performance standards and resist weather penetration.'
    },
    {
      id: 'soffit',
      category: 'Exterior – Ground Level',
      title: 'Soffit',
      description: 'cracking, missing panels.',
      codeReference: 'IRC R703.1.1 – Weather-resistant coverings; soffit vents must maintain function (ties into ventilation R806).'
    },
    {
      id: 'fascia-trim',
      category: 'Exterior – Ground Level',
      title: 'Fascia & Trim',
      description: 'rot, displacement.',
      codeReference: 'IRC R703 – Exterior trim part of weather-resistant envelope.'
    },
    {
      id: 'hvac-exterior',
      category: 'Exterior – Ground Level',
      title: 'HVAC/Exterior Mechanical Units',
      description: 'coil fins (hail), displacement (wind).',
      codeReference: 'IRC M1401.3 – Mechanical equipment must be installed to resist structural damage.'
    },
    {
      id: 'fencing-outbuildings',
      category: 'Exterior – Ground Level',
      title: 'Fencing/Outbuildings/Detached Structures',
      description: 'sheds, detached garages.',
      codeReference: 'IRC R301.1 – All structures must meet design loads (wind, impact).'
    },
    {
      id: 'decking-railings',
      category: 'Exterior – Ground Level',
      title: 'Decking & Railings (Exterior Decks)',
      description: 'impact, water intrusion.',
      codeReference: 'IRC R507 – Deck construction standards (fastening, rot resistance).'
    },
    {
      id: 'driveways-walkways',
      category: 'Exterior – Ground Level',
      title: 'Driveways/Walkways/Flatwork',
      description: 'hail spatter, falling debris.',
      codeReference: 'IRC R401.2 – Surfaces must be durable, resistant to frost and impact.'
    },
    {
      id: 'landscape-vegetation',
      category: 'Exterior – Ground Level',
      title: 'Landscape/Vegetation',
      description: 'storm impact evidence (not code-mandated, but strong collateral documentation).'
    },

    // 2. Roof Exterior (on roof, slope by slope)
    {
      id: 'roof-layers',
      category: 'Roof Exterior',
      title: 'Roof Layers',
      description: 'confirm # of layers.',
      codeReference: 'IRC R908.3 – No more than 2 roof coverings; must replace if ≥2 layers or water-soaked/deteriorated.'
    },
    {
      id: 'drip-edge',
      category: 'Roof Exterior',
      title: 'Drip Edge',
      description: 'check for presence and fastening.',
      codeReference: 'IRC R905.2.8.5 – Drip edge required at eaves and rakes; specific lap/fastening rules.'
    },
    {
      id: 'slopes',
      category: 'Roof Exterior',
      title: 'Slopes (1–10)',
      description: 'inspect each slope for surface damage.',
      codeReference: 'IRC R905.2.2 – Asphalt shingles require minimum 2:12 slope; double underlayment between 2:12–4:12.'
    },
    {
      id: 'shingle-surface-damage',
      category: 'Roof Exterior',
      title: 'Shingle/Surface Damage',
      description: 'hail bruising, wind creasing, torn tabs.',
      codeReference: 'IRC R905.2.4 – Shingles must be installed per manufacturer; damaged/loosened shingles no longer compliant.'
    },
    {
      id: 'flashing-systems',
      category: 'Roof Exterior',
      title: 'Flashing Systems (step, headwall, kick-out, chimney, skylight)',
      description: '',
      codeReference: 'IRC R903.2 – Flashing required at walls/intersections. IRC R905.2.8.3 – Sidewall flashing; step flashing details. IRC R903.2.1 – Crickets required behind chimneys >30″ wide. IRC R908.5 – Flashings must be replaced when reroofing.'
    },
    {
      id: 'valleys',
      category: 'Roof Exterior',
      title: 'Valleys',
      description: 'condition, type.',
      codeReference: 'IRC R905.2.8.2 – Valley linings required; specific materials and lap requirements.'
    },
    {
      id: 'ridges-hips',
      category: 'Roof Exterior',
      title: 'Ridges/Hips',
      description: 'cracks, ridge vent condition, hail dents.',
      codeReference: 'IRC R905.2.4 & manufacturer instructions govern ridge caps/coverings.'
    },
    {
      id: 'roof-penetrations',
      category: 'Roof Exterior',
      title: 'Roof Penetrations',
      description: 'vents, stacks, pipes, chimneys, skylights.',
      codeReference: 'IRC R903.2 – Flashing required at penetrations. IRC P3103.1 – Vents must extend properly above roof and be protected.'
    },
    {
      id: 'roof-attachments',
      category: 'Roof Exterior',
      title: 'Roof Attachments',
      description: 'satellites, solar, lightning rods.',
      codeReference: 'IRC R324.6.2 – Solar panels must be mounted per structural code. IRC R903.1 – Roof must be weather-resistant (attachments can\'t compromise).'
    },
    {
      id: 'ventilation-components',
      category: 'Roof Exterior',
      title: 'Ventilation Components',
      description: 'ridge, soffit, turtle, turbines.',
      codeReference: 'IRC R806.1 – Ventilation required in enclosed attics. IRC R806.2 – 1/150 net free area, or 1/300 if balanced w/vapor retarder.'
    },
    {
      id: 'fasteners-nail-pops',
      category: 'Roof Exterior',
      title: 'Fasteners/Nail Pops',
      description: 'lifted shingles, exposed nails.',
      codeReference: 'IRC R905.2.5 – Fastening must comply with manufacturer and code nailing pattern.'
    },
    {
      id: 'underlayment',
      category: 'Roof Exterior',
      title: 'Underlayment (if visible)',
      description: 'condition, laps, tears.',
      codeReference: 'IRC R905.1.1 – Underlayment required under roofing per manufacturer.'
    },
    {
      id: 'bad-rotten-plywood',
      category: 'Roof Exterior',
      title: 'Bad/Rotten Plywood (Decking)',
      description: 'soft spots, delamination.',
      codeReference: 'IRC R803 – Roof sheathing must be structurally sound and properly fastened.'
    },
    {
      id: 'ice-dams',
      category: 'Roof Exterior',
      title: 'Evidence of Ice Dams',
      description: 'fascia staining, water backup.',
      codeReference: 'IRC R905.1.2 – Ice barrier required in areas subject to ice dams.'
    },

    // 3. Interior / Attic Inspection (after exterior & roof)
    {
      id: 'attic-access',
      category: 'Interior / Attic Inspection',
      title: 'Attic Access & Safety',
      description: 'confirm entry.',
      codeReference: 'IRC R807.1 – Minimum attic access opening required.'
    },
    {
      id: 'attic-leaks',
      category: 'Interior / Attic Inspection',
      title: 'Attic Damage',
      description: 'damage on decking/trusses.',
      codeReference: 'IRC R903.1 – Roofs must be weather-resistant; leaks are non-compliant.'
    },
    {
      id: 'insulation-condition',
      category: 'Interior / Attic Inspection',
      title: 'Insulation Condition',
      description: 'saturation, mold.',
      codeReference: 'IRC N1102.2.1 (R402.2.1) – Insulation must be dry and effective.'
    },
    {
      id: 'fastener-penetration',
      category: 'Interior / Attic Inspection',
      title: 'Fastener Penetration',
      description: 'nails protruding, rusting.',
      codeReference: 'IRC R803 / R905.2.5 – Proper fastening required; exposed/rusted nails indicate compromised compliance.'
    },
    {
      id: 'ceilings-walls',
      category: 'Interior / Attic Inspection',
      title: 'Ceilings/Walls (Interior Living Space)',
      description: 'stains, cracks, bubbling.',
      codeReference: 'IRC R702.3.5 – Gypsum board must remain structurally sound and dry.'
    },
    {
      id: 'electrical-fixtures',
      category: 'Interior / Attic Inspection',
      title: 'Electrical Fixtures in Wet Areas',
      description: 'water near lights, fans.',
      codeReference: 'IRC E3905.11 – Electrical boxes must be weather-tight; NEC also applies.'
    }
  ]);

  const handleResultChange = (itemId: string, result: 'yes' | 'no') => {
    setChecklistItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, result } : item
    ));
  };

  const generatePDF = async () => {
    if (!propertyAddress.trim()) {
      toast.error('Please enter a property address before generating the report');
      return;
    }

    try {
      toast.info('Generating inspection report PDF...');
      
      // Create a temporary container for the report
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '-9999px';
      document.body.appendChild(tempContainer);
      
      // Create the report content
      tempContainer.innerHTML = `
        <div id="inspection-report" style="
          width: 8.5in;
          margin: 0 auto;
          padding: 1in;
          box-sizing: border-box;
          background: #fff;
          color: #000;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 12px;
          line-height: 1.4;
        ">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: bold;">
              Inspection Report – ${propertyAddress}
            </h1>
            <p style="margin: 0; font-size: 14px; color: #666;">
              Code-Anchored Roof & Exterior Damage Inspection Checklist
            </p>
            <p style="margin: 8px 0 0 0; font-size: 12px;">
              Generated on ${new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          
          <div style="margin-bottom: 16px;">
            <p style="margin: 0; font-weight: bold; font-size: 14px;">Property Address:</p>
            <p style="margin: 4px 0 0 0; font-size: 14px;">${propertyAddress}</p>
          </div>
          
          <hr style="margin: 16px 0; border: none; border-top: 2px solid #000;" />
          
          ${generateCategoryGroups().map(group => `
            <div style="margin-bottom: 24px; break-inside: avoid;">
              <h2 style="margin: 0 0 12px 0; font-size: 16px; font-weight: bold; color: #d71920;">
                ${group.category}
              </h2>
              ${group.items.map(item => `
                <div style="margin-bottom: 12px; padding: 8px; border: 1px solid #ddd; border-radius: 4px; break-inside: avoid;">
                  <div style="margin-bottom: 4px;">
                    <strong>${item.title}</strong>
                    ${item.description ? ` – ${item.description}` : ''}
                  </div>
                  ${item.codeReference ? `
                    <div style="margin-bottom: 8px; font-size: 11px; color: #666; font-style: italic;">
                      ${item.codeReference}
                    </div>
                  ` : ''}
                  <div style="font-weight: bold; color: ${item.result === 'yes' ? '#22c55e' : item.result === 'no' ? '#ef4444' : '#666'};">
                    Result: ${item.result ? (item.result === 'yes' ? 'YES' : 'NO') : 'Not Inspected'}
                  </div>
                </div>
              `).join('')}
            </div>
          `).join('')}
          
          <div style="margin-top: 32px; text-align: center; font-size: 10px; color: #666;">
            <p>Phoenix Roofing & Construction Solutions LLC</p>
            <p>10334 Vista Meadow Way, Lanham, MD 20706 | MHIC #164678</p>
            <p>Phone: (301) 450-9487</p>
          </div>
        </div>
      `;
      
      // Generate PDF
      const reportElement = tempContainer.querySelector('#inspection-report');
      if (!reportElement) {
        throw new Error('Report content not found');
      }
      
      const filename = `Inspection Report – ${propertyAddress}.pdf`;
      
      const opt = {
        margin: [15, 15, 15, 15],
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff'
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'letter', 
          orientation: 'portrait' 
        },
        pagebreak: { mode: ['css', 'legacy'] },
      };

      await html2pdf()
        .set(opt)
        .from(reportElement)
        .save();
      
      toast.success('Inspection report PDF downloaded successfully!');
      
      // Cleanup
      document.body.removeChild(tempContainer);
      
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF report. Please try again.');
    }
  };

  const generateCategoryGroups = () => {
    const categories = ['Exterior – Ground Level', 'Roof Exterior', 'Interior / Attic Inspection'];
    return categories.map(category => ({
      category,
      items: checklistItems.filter(item => item.category === category)
    }));
  };

  const getCompletionStats = () => {
    const completed = checklistItems.filter(item => item.result).length;
    const total = checklistItems.length;
    return { completed, total, percentage: Math.round((completed / total) * 100) };
  };

  const stats = getCompletionStats();

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => onNavigate?.('portal')}
          className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Portal</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ClipboardCheck className="w-10 h-10 text-[#FF0000]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Inspection Report</h1>
          <p className="text-gray-400 text-lg">Code-Anchored Roof & Exterior Damage Inspection Checklist</p>
        </div>

        {/* Property Address Input */}
        <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 p-6 mb-8">
          <label className="block text-lg font-semibold text-[#FF0000] mb-3">
            Property Address *
          </label>
          <input
            type="text"
            value={propertyAddress}
            onChange={(e) => setPropertyAddress(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 text-lg"
            placeholder="Enter the property address for this inspection"
          />
        </div>

        {/* Progress Summary */}
        {propertyAddress && (
          <div className="bg-[#FF0000]/10 border border-[#FF0000]/20 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-[#FF0000]">Inspection Progress</h3>
              <span className="text-3xl font-bold text-[#FF0000]">{stats.percentage}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-4 mb-4">
              <div
                className="bg-gradient-to-r from-[#FF0000] to-[#C20F1F] h-4 rounded-full transition-all duration-500"
                style={{ width: `${stats.percentage}%` }}
              ></div>
            </div>
            <p className="text-white">
              {stats.completed} of {stats.total} items inspected
            </p>
          </div>
        )}

        {/* Checklist */}
        {propertyAddress && (
          <div className="space-y-8">
            {generateCategoryGroups().map((group, groupIndex) => (
              <div
                key={group.category}
                className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 overflow-hidden"
              >
                <div className="bg-black/40 border-b border-[#FF0000]/20 p-6">
                  <h2 className="text-2xl font-bold text-white">{group.category}</h2>
                </div>
                
                <div className="p-6 space-y-6">
                  {group.items.map((item, itemIndex) => (
                    <div
                      key={item.id}
                      className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50 hover:border-[#FF0000]/30 transition-all duration-300"
                      style={{
                        animationDelay: `${(groupIndex * 100) + (itemIndex * 50)}ms`,
                        animation: 'slideInUp 0.6s ease-out forwards'
                      }}
                    >
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {item.title}
                          {item.description && (
                            <span className="text-gray-300 font-normal"> – {item.description}</span>
                          )}
                        </h3>
                        
                        {item.codeReference && (
                          <p className="text-sm text-gray-400 italic mb-3">
                            {item.codeReference}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <span className="text-[#FF0000] font-medium">Result:</span>
                        
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name={`result-${item.id}`}
                              checked={item.result === 'yes'}
                              onChange={() => handleResultChange(item.id, 'yes')}
                              className="w-5 h-5 text-green-500 border-gray-600 focus:ring-green-500 focus:ring-2"
                            />
                            <span className="text-green-400 font-medium">Yes</span>
                          </label>
                          
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name={`result-${item.id}`}
                              checked={item.result === 'no'}
                              onChange={() => handleResultChange(item.id, 'no')}
                              className="w-5 h-5 text-red-500 border-gray-600 focus:ring-red-500 focus:ring-2"
                            />
                            <span className="text-red-400 font-medium">No</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Print Report Button - Fixed at bottom */}
        {propertyAddress && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <button
              onClick={generatePDF}
              className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-[#FF0000] to-[#C20F1F] text-white rounded-2xl hover:shadow-2xl hover:shadow-[#FF0000]/25 transition-all duration-300 font-bold text-lg transform hover:scale-105"
            >
              <Download className="w-6 h-6" />
              <span>Print Report</span>
            </button>
          </div>
        )}

        {/* Empty State */}
        {!propertyAddress && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-[#FF0000]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Ready to Start Inspection</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Enter the property address above to begin the code-anchored inspection checklist.
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};