import React from 'react';
import { BookOpen, AlertTriangle, Wrench, Clock, Eye, ChevronLeft, ChevronRight, Phone, CheckCircle, FileText, Target, Users, Shield } from 'lucide-react';
import SafeImg from './SafeImg';
import { threeTabImages, architecturalImages, damageImages, collateralDamageImages } from '../data/imageRegistry';
import { ImageDebugPanel } from './ImageDebugPanel';

export const HowItWorksPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [currentCollateralImageIndex, setCurrentCollateralImageIndex] = React.useState(0);
  const [currentArchitecturalImageIndex, setCurrentArchitecturalImageIndex] = React.useState(0);
  const [current3TabImageIndex, setCurrent3TabImageIndex] = React.useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % damageImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + damageImages.length) % damageImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const nextCollateralImage = () => {
    setCurrentCollateralImageIndex((prev) => (prev + 1) % collateralDamageImages.length);
  };

  const prevCollateralImage = () => {
    setCurrentCollateralImageIndex((prev) => (prev - 1 + collateralDamageImages.length) % collateralDamageImages.length);
  };

  const goToCollateralImage = (index: number) => {
    setCurrentCollateralImageIndex(index);
  };

  const nextArchitecturalImage = () => {
    setCurrentArchitecturalImageIndex((prev) => (prev + 1) % architecturalImages.length);
  };

  const prevArchitecturalImage = () => {
    setCurrentArchitecturalImageIndex((prev) => (prev - 1 + architecturalImages.length) % architecturalImages.length);
  };

  const goToArchitecturalImage = (index: number) => {
    setCurrentArchitecturalImageIndex(index);
  };

  const next3TabImage = () => {
    setCurrent3TabImageIndex((prev) => (prev + 1) % threeTabImages.length);
  };

  const prev3TabImage = () => {
    setCurrent3TabImageIndex((prev) => (prev - 1 + threeTabImages.length) % threeTabImages.length);
  };

  const goTo3TabImage = (index: number) => {
    setCurrent3TabImageIndex(index);
  };

  // Collect all image paths for debugging
  const allImagePaths = [
    ...damageImages,
    ...collateralDamageImages,
    ...architecturalImages,
    ...threeTabImages
  ];

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
      description: 'Your entire claim package is submitted directly to your insurer, fully organized and ready for review — no sloppy photos, no missing info.',
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
      description: 'Once approved, we move fast to restore your property:',
      details: [
        'Finalize contract & deductible',
        'Help you choose materials (roof shingles, siding colors, windows, interior finishes)',
        'Order materials & schedule crews',
        'Complete work and take post-completion photos',
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
        'Your final receipt',
        'Any material & labor warranties'
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

      {/* Original Sections - Damage Examples */}
      <section className="bg-gradient-to-br from-gray-900 to-black py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Types of Damages We Document</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Common damage patterns we identify and document during comprehensive property inspections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-[#FF0000]/20 hover:border-[#FF0000]/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🌪️</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Wind Damage</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Lifted or missing shingles</li>
                <li>• Exposed nail heads</li>
                <li>• Creased or folded materials</li>
                <li>• Granule loss along edges</li>
              </ul>
            </div>

            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-[#FF0000]/20 hover:border-[#FF0000]/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🧊</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Hail Damage</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Circular impact marks</li>
                <li>• Granule displacement</li>
                <li>• Exposed asphalt mat</li>
                <li>• Bruising or soft spots</li>
              </ul>
            </div>

            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-[#FF0000]/20 hover:border-[#FF0000]/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">💧</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Water Damage</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Interior staining</li>
                <li>• Ceiling damage</li>
                <li>• Flooring issues</li>
                <li>• Mold or moisture problems</li>
              </ul>
            </div>

            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-[#FF0000]/20 hover:border-[#FF0000]/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Siding & Gutters</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Impact dents and cracks</li>
                <li>• Gutter separation</li>
                <li>• Downspout damage</li>
                <li>• Trim and fascia issues</li>
              </ul>
            </div>

            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-[#FF0000]/20 hover:border-[#FF0000]/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🪟</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Windows & Doors</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Broken or cracked glass</li>
                <li>• Frame damage</li>
                <li>• Screen tears</li>
                <li>• Seal failures</li>
              </ul>
            </div>

            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-[#FF0000]/20 hover:border-[#FF0000]/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">❄️</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">HVAC Systems</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Condenser coil damage</li>
                <li>• Unit displacement</li>
                <li>• Ductwork issues</li>
                <li>• Equipment malfunction</li>
              </ul>
            </div>
          </div>

          {/* Damage Examples Slider */}
          <div className="mt-16 bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 overflow-hidden">
            <div className="bg-black/40 border-b border-[#FF0000]/20 p-6">
              <h3 className="text-2xl font-bold text-white text-center">Damage Documentation Examples</h3>
              <p className="text-gray-400 text-center mt-2">Real examples of storm damage we document and report</p>
            </div>
            
            <div className="p-6">
              {/* Main Image Display */}
              <div className="relative bg-gray-900/50 rounded-xl overflow-hidden mb-6">
                <div className="aspect-video relative">
                  <SafeImg
                    srcPath={damageImages[currentImageIndex]}
                    alt={`Damage Example ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain"
                  />
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {currentImageIndex + 1} / {damageImages.length}
                  </div>
                </div>
              </div>
              
              {/* Thumbnail Navigation */}
              <div className="flex justify-center space-x-3 mb-4">
                {damageImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'border-[#FF0000] scale-110'
                        : 'border-gray-600 hover:border-[#FF0000]/50 hover:scale-105'
                    }`}
                  >
                    <SafeImg
                      srcPath={image}
                      alt={`Damage Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              
              {/* Dot Indicators */}
              <div className="flex justify-center space-x-2">
                {damageImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'bg-[#FF0000] scale-125'
                        : 'bg-gray-600 hover:bg-[#FF0000]/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Collateral Damage Examples Slider */}
          <div className="mt-16 bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 overflow-hidden">
            <div className="bg-black/40 border-b border-[#FF0000]/20 p-6">
              <h3 className="text-2xl font-bold text-white text-center">Collateral Damage Examples</h3>
              <p className="text-gray-400 text-center mt-2">Additional storm damage to gutters, siding, and other property components</p>
            </div>
            
            <div className="p-6">
              {/* Main Image Display */}
              <div className="relative bg-gray-900/50 rounded-xl overflow-hidden mb-6">
                <div className="aspect-video relative">
                  <SafeImg
                    srcPath={collateralDamageImages[currentCollateralImageIndex]}
                    alt={`Collateral Damage Example ${currentCollateralImageIndex + 1}`}
                    className="w-full h-full object-contain"
                  />
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevCollateralImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={nextCollateralImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {currentCollateralImageIndex + 1} / {collateralDamageImages.length}
                  </div>
                </div>
              </div>
              
              {/* Thumbnail Navigation */}
              <div className="flex justify-center space-x-3 mb-4">
                {collateralDamageImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToCollateralImage(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === currentCollateralImageIndex
                        ? 'border-[#FF0000] scale-110'
                        : 'border-gray-600 hover:border-[#FF0000]/50 hover:scale-105'
                    }`}
                  >
                    <SafeImg
                      srcPath={image}
                      alt={`Collateral Damage Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              
              {/* Dot Indicators */}
              <div className="flex justify-center space-x-2">
                {collateralDamageImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToCollateralImage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentCollateralImageIndex
                        ? 'bg-[#FF0000] scale-125'
                        : 'bg-gray-600 hover:bg-[#FF0000]/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Debug Panel */}
      <ImageDebugPanel 
        imagePaths={allImagePaths}
        title="How It Works Images"
      />
    </div>
  );
};