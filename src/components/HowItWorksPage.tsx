import React from 'react';
import { BookOpen, Phone, Target, Eye, Clock, Shield } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const stages = [
    {
      id: 1,
      title: 'Claim Setup',
      subtitle: '13 Steps – The Foundation of a Successful Claim',
      description: 'Everything starts with a comprehensive property inspection — not just the roof, but siding, gutters, windows, interior walls, ceilings, flooring, and even collateral damage you might have missed.',
      details: [
        'Collect storm date & time, ask you key questions',
        'Perform repairability and material tests',
        'Take precise measurements of every affected area',
        'Build a professional photo packet and organize all evidence',
        'Create an initial estimate for all damages',
        'Generate a 20+ page report and cover letter'
      ],
      goal: 'Build an airtight claim file so your insurer has no reason to delay or deny coverage.',
      icon: '🔍',
      color: 'from-[#FF0000] to-[#C20F1F]'
    },
    {
      id: 2,
      title: 'Report Submission',
      description: 'We guide you through submitting your entire claim file directly to your insurer, fully organized and ready for review — no sloppy photos, no missing info.',
      icon: '📋',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 3,
      title: 'Approval Pending',
      description: 'We monitor your claim as it goes through insurance review and push for prompt release of the first payment so work can begin quickly.',
      icon: '⏳',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 4,
      title: 'Project Completion',
      description: 'Once approved, we help you select a trustworthy contractor so work can be done quickly:',
      details: [
        'Finalize contract(s) with your contractor(s) & deductible',
        'Help you choose and order materials (roof shingles, siding colors, windows, interior finishes)',
        'Order materials & schedule crews',
        'Your contractor(s) will complete work and take post-completion photos',
        'Prepare a supplement packet for any additional damage found during repairs'
      ],
      icon: '🔨',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 5,
      title: 'Supplement Submission',
      description: 'Any missed or hidden damage gets fully documented and submitted to the insurer so you\'re not stuck paying out of pocket.',
      icon: '📄',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 6,
      title: 'Final Payment',
      description: 'We follow up until your insurer releases the final payment, then we send:',
      details: [
        'You close out your balance with the contractor(s)',
        'Pay your contractor to complete the supplemental work.',
        'Contractor(s) complete supplemental work',
        'We do a final inspection to make sure the work was completed to standards',
        'Contractor Issues Warranty and Receipt of Work Completion',
        'You pay the Consultation Fee for your project'
      ],
      icon: '💰',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 7,
      title: 'Job Complete',
      description: 'Once every detail is closed out, you have a fully restored property and peace of mind knowing nothing was missed.',
      icon: '✅',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const damageTypes = [
    {
      emoji: '🌪️',
      title: 'Wind & Storm Damage',
      items: [
        'Missing, lifted, or creased shingles',
        'Broken seals / shingle tabs',
        'Loose or detached ridge caps',
        'Detached flashing',
        'Damaged roof vents',
        'Bent or detached gutters & downspouts',
        'Detached siding, soffit, fascia',
        'Fence blowdowns',
        'Tree impact damage (roof, walls, vehicles)',
        'Detached exterior fixtures (awnings, shutters, etc.)'
      ]
    },
    {
      emoji: '🧊',
      title: 'Hail Damage',
      items: [
        'Circular impact marks on shingles or siding',
        'Granule loss exposing asphalt mat',
        'Cracked shingles or fractured fiberglass mats',
        'Dents on gutters, downspouts, siding, AC units',
        'Broken skylights',
        'Damaged window screens',
        'Soft spots and bruising on roofing'
      ]
    },
    {
      emoji: '💧',
      title: 'Water Damage',
      items: [
        'Roof or siding leaks',
        'Ceiling stains, bubbling paint',
        'Swollen drywall or baseboards',
        'Flooring buckling, warping, or staining',
        'Wet insulation in attic or crawl space',
        'Mold growth or musty odor',
        'Foundation seepage',
        'Appliance leaks (water heaters, dishwashers)'
      ]
    },
    {
      emoji: '🔥',
      title: 'Fire & Smoke Damage',
      items: [
        'Structural fire loss (partial or total)',
        'Smoke damage to walls, ceilings, contents',
        'Soot contamination (HVAC, ductwork, appliances)',
        'Water damage from firefighting efforts',
        'Odor removal / deodorization needs'
      ]
    },
    {
      emoji: '⚡',
      title: 'Lightning & Electrical Surge',
      items: [
        'Damaged wiring or breaker panels',
        'Destroyed electronics or appliances',
        'HVAC control board failures',
        'Fire ignition from strike'
      ]
    },
    {
      emoji: '❄️',
      title: 'Snow, Ice & Freeze Damage',
      items: [
        'Ice damming on roofs leading to interior leaks',
        'Frozen / burst pipes',
        'Gutter separation from ice weight',
        'Roof structure stress from heavy snow loads'
      ]
    },
    {
      emoji: '🌊',
      title: 'Flood / Groundwater Intrusion',
      items: [
        'Basement water damage',
        'Foundation cracks or hydrostatic pressure issues',
        'Contaminated contents',
        'Flooring, drywall, and insulation replacement needs'
      ]
    },
    {
      emoji: '🪟',
      title: 'Windows, Doors & Openings',
      items: [
        'Broken or cracked glass',
        'Frame warping or impact cracks',
        'Seal failures causing fogging',
        'Weatherstripping or hardware damage'
      ]
    },
    {
      emoji: '🏠',
      title: 'Exterior Building Envelope',
      items: [
        'Siding cracks, holes, or warping',
        'Stucco delamination',
        'Masonry cracks from impact',
        'Damaged exterior paint or coatings'
      ]
    },
    {
      emoji: '🧰',
      title: 'Mechanical & Systems',
      items: [
        'HVAC condenser coil or fan damage',
        'Unit displacement',
        'Broken ductwork or registers',
        'Water heater, boiler, or furnace damage',
        'Electrical panel surges'
      ]
    },
    {
      emoji: '🪑',
      title: 'Interior Finishes & Contents',
      items: [
        'Cabinets, countertops, vanities (water or smoke damage)',
        'Drywall & trim replacement',
        'Carpet, hardwood, LVP flooring damage',
        'Furniture or personal property inventory losses'
      ]
    },
    {
      emoji: '🏢',
      title: 'Commercial-Specific Damages',
      items: [
        'Flat roof membrane tears, punctures, seam failures',
        'Damaged rooftop HVAC / mechanical units',
        'Business interruption impacts (loss of revenue)',
        'Equipment damage (industrial machinery, POS systems)',
        'Tenant improvements (TIs) damage'
      ]
    },
    {
      emoji: '🪨',
      title: 'Other / Miscellaneous Perils',
      items: [
        'Vehicle impact to structure',
        'Vandalism / theft damage',
        'Collapse from hidden decay',
        'Construction defects discovered during claim',
        'Ordinance or law upgrades (code-required repairs)'
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-[#FF0000]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">How It Works</h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#FF0000] mb-6">A Clear, Step-by-Step Path to a Fully Resolved Claim</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Insurance claims are stressful — especially when you're dealing with storm damage, water leaks, or property-wide losses. Most people don't know what to document, what to say, or who to trust.
          </p>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed mt-4">
            That's why I follow a seven-stage, end-to-end process that covers every detail — from your first inspection through final payment — so nothing slips through the cracks and you stay in control.
          </p>
        </div>
      </div>

      {/* Process Timeline */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {stages.map((stage, index) => (
              <div
                key={stage.id}
                className={`${index % 2 === 0 ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-gradient-to-br from-[#FF0000] to-[#C20F1F]'} py-16 rounded-3xl`}
              >
                <div className="max-w-4xl mx-auto px-8">
                  <div className="text-center mb-12">
                    <div className={`w-20 h-20 ${index % 2 === 0 ? 'bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20' : 'bg-black/20'} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                      <span className="text-4xl">{stage.icon}</span>
                    </div>
                    <div className={`text-lg font-semibold ${index % 2 === 0 ? 'text-[#FF0000]' : 'text-white/90'} mb-2`}>
                      Stage {stage.id}
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                      {stage.title}
                    </h3>
                    {stage.subtitle && (
                      <p className={`text-lg ${index % 2 === 0 ? 'text-gray-400' : 'text-white/80'} mb-6`}>
                        {stage.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <div className={`${index % 2 === 0 ? 'bg-black/60 backdrop-blur-xl border-[#FF0000]/20' : 'bg-black/20 backdrop-blur-xl border-white/10'} rounded-2xl p-6 border`}>
                        <p className={`${index % 2 === 0 ? 'text-gray-300' : 'text-white/90'} leading-relaxed text-lg`}>
                          {stage.description}
                        </p>
                      </div>

                      {stage.details && (
                        <div className={`${index % 2 === 0 ? 'bg-black/60 backdrop-blur-xl border-[#FF0000]/20' : 'bg-black/20 backdrop-blur-xl border-white/10'} rounded-2xl p-6 border`}>
                          <h4 className={`text-xl font-bold ${index % 2 === 0 ? 'text-white' : 'text-white'} mb-4`}>
                            What Happens Here:
                          </h4>
                          <ul className={`space-y-3 ${index % 2 === 0 ? 'text-gray-300' : 'text-white/90'}`}>
                            {stage.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start space-x-3">
                                <span className={`w-2 h-2 ${index % 2 === 0 ? 'bg-[#FF0000]' : 'bg-white'} rounded-full mt-2 flex-shrink-0`}></span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {stage.goal && (
                        <div className={`${index % 2 === 0 ? 'bg-[#FF0000]/10 border-[#FF0000]/20' : 'bg-white/10 border-white/20'} rounded-2xl p-6 border`}>
                          <h4 className={`text-lg font-bold ${index % 2 === 0 ? 'text-[#FF0000]' : 'text-white'} mb-3`}>
                            Goal:
                          </h4>
                          <p className={`${index % 2 === 0 ? 'text-white' : 'text-white/90'} leading-relaxed`}>
                            {stage.goal}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-6">
                      <div className={`${index % 2 === 0 ? 'bg-black/60 backdrop-blur-xl border-[#FF0000]/20' : 'bg-black/20 backdrop-blur-xl border-white/10'} rounded-2xl p-6 border`}>
                        <div className={`w-16 h-16 bg-gradient-to-br ${stage.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                          <span className="text-3xl">{stage.icon}</span>
                        </div>
                        <div className="text-center">
                          <div className={`text-6xl font-bold ${index % 2 === 0 ? 'text-[#FF0000]' : 'text-white'} mb-2`}>
                            {stage.id}
                          </div>
                          <div className={`text-lg ${index % 2 === 0 ? 'text-gray-400' : 'text-white/80'}`}>
                            of 7 Stages
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Works Section */}
      <section className="bg-gradient-to-br from-gray-900 to-black py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-[#FF0000]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why This Works</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              This process removes the three biggest pain points in property claims:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-[#FF0000]/20 hover:border-[#FF0000]/40 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-[#FF0000]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Missed Damage</h3>
              <p className="text-gray-300 leading-relaxed text-center">
                We inspect everything, not just the roof, so no covered damage gets left out.
              </p>
            </div>

            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-[#FF0000]/20 hover:border-[#FF0000]/40 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-[#FF0000]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Insurance Delays</h3>
              <p className="text-gray-300 leading-relaxed text-center">
                Insurers get a complete, professional file from day one.
              </p>
            </div>

            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-[#FF0000]/20 hover:border-[#FF0000]/40 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-[#FF0000]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Underpayment</h3>
              <p className="text-gray-300 leading-relaxed text-center">
                Supplements capture every dollar you're entitled to — even hidden repairs discovered mid-project.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-[#FF0000]/10 border border-[#FF0000]/20 rounded-2xl p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-[#FF0000] mb-4">Result</h3>
              <p className="text-white text-lg leading-relaxed">
                Faster approvals, full payments, and a stress-free experience for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Damages We Document */}
      <section className="bg-gradient-to-br from-gray-900 to-black py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">📋</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Types of Damages We Document</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Common damage patterns we identify and document during comprehensive property inspections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {damageTypes.map((damageType, index) => (
              <div
                key={index}
                className="bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-[#FF0000]/20 hover:border-[#FF0000]/40 transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'slideInUp 0.6s ease-out forwards'
                }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">{damageType.emoji}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{damageType.title}</h3>
                <ul className="space-y-2 text-gray-300">
                  {damageType.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2">
                      <span className="text-[#FF0000] mt-1 flex-shrink-0">•</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-br from-[#FF0000] to-[#C20F1F] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-black/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Phone className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Start Your Claim?</h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
            Don't let the insurance company take advantage of you. Get the professional support you deserve.
          </p>
          <a
            href="tel:3463749083"
            className="inline-flex items-center space-x-3 px-12 py-6 bg-black text-white rounded-2xl hover:bg-gray-900 transition-all duration-300 font-bold text-xl transform hover:scale-105"
          >
            <Phone className="w-8 h-8" />
            <span>Call to Start Your Claim: (346) 374-9083</span>
          </a>
          <p className="text-white/80 mt-4">
            Free consultation • No obligation • Direct access to Zach
          </p>
        </div>
      </section>

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