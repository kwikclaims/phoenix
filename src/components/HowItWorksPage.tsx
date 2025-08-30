import React from 'react';
import { BookOpen, AlertTriangle, Wrench, Clock, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-[#FF0000]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">How It Works</h1>
          <p className="text-gray-400 text-lg">Understanding roofing materials, damage assessment, and our inspection process</p>
        </div>
      </div>

      {/* Section 1: Old Builder Grade 3-Tab Shingles - RED BACKGROUND */}
      <section className="bg-gradient-to-br from-[#FF0000] to-[#C20F1F] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-black/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🏠</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Old Builder Grade 3-Tab Shingles</h2>
            <p className="text-white/90 text-lg max-w-3xl mx-auto">
              Understanding the characteristics and limitations of traditional 3-tab and discontinued asphalt shingles
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">What Are 3-Tab Shingles?</h3>
                <p className="text-white/90 leading-relaxed">
                  3-tab and discontinued shingles are basic types of asphalt shingles, featuring three distinct tabs that create a uniform, flat appearance. 
                  They were the standard choice for residential roofing for decades due to their affordability and ease of installation.
                </p>
              </div>

              <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Key Characteristics</h3>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span>Uniform, flat appearance with visible tab cutouts</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span>Lighter weight compared to architectural shingles</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span>Typically 20-25 year warranty period</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span>Single layer construction with exposed mat</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Common Issues</h3>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" />
                    <span>More susceptible to wind damage due to lighter weight</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" />
                    <span>Granule loss occurs faster than architectural shingles</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" />
                    <span>Tab edges can curl or crack over time</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" />
                    <span>Limited aesthetic appeal compared to modern options</span>
                  </li>
                </ul>
              </div>

              <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Why They're Being Replaced</h3>
                <p className="text-white/90 leading-relaxed">
                  Most manufacturers have discontinued 3-tab shingles in favor of architectural shingles, which offer 
                  better durability, wind resistance, and aesthetic appeal. Insurance companies often require upgrades 
                  to architectural shingles when replacing damaged 3-tab roofs.
                </p>
              </div>
            </div>
          </div>

          {/* 3-Tab Shingles Examples Slider */}
          <div className="mt-16 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
            <div className="bg-black/40 border-b border-white/10 p-6">
              <h3 className="text-2xl font-bold text-white text-center">3-Tab Shingles Examples</h3>
              <p className="text-white/90 text-center mt-2">Traditional 3-tab construction and comparison with architectural shingles</p>
            </div>
            
            <div className="p-6">
              {threeTabImages.length > 0 ? (
                <>
              {/* Main Image Display */}
              <div className="relative bg-black/30 rounded-xl overflow-hidden mb-6">
                <div className="aspect-video relative">
                  <SafeImg
                    srcPath={threeTabImages[current3TabImageIndex]}
                    alt={`3-Tab Shingles Example ${current3TabImageIndex + 1}`}
                    className="w-full h-full object-contain"
                  />
                  
                  {/* Navigation Arrows */}
                  {threeTabImages.length > 1 && (
                    <>
                  <button
                    onClick={prev3TabImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={next3TabImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                    </>
                  )}
                  
                  {/* Image Counter */}
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {current3TabImageIndex + 1} / {threeTabImages.length}
                  </div>
                </div>
              </div>
              
              {/* Thumbnail Navigation */}
              {threeTabImages.length > 1 && (
                <>
              <div className="flex justify-center space-x-3 mb-4">
                {threeTabImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goTo3TabImage(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === current3TabImageIndex
                        ? 'border-white scale-110'
                        : 'border-white/30 hover:border-white/70 hover:scale-105'
                    }`}
                  >
                    <SafeImg
                      srcPath={image}
                      alt={`3-Tab Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              
              {/* Dot Indicators */}
              <div className="flex justify-center space-x-2">
                {threeTabImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goTo3TabImage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === current3TabImageIndex
                        ? 'bg-white scale-125'
                        : 'bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
                </>
              )}
                </>
              ) : (
                /* Fallback when no images are available */
                <div className="bg-black/30 rounded-xl p-12 text-center">
                  <div className="w-20 h-20 bg-black/40 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Eye className="w-10 h-10 text-white/70" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">3-Tab Examples Loading</h4>
                  <p className="text-white/90">
                    3-tab shingle comparison images are being loaded...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Types of Damages on 3-Tabs - BLACK BACKGROUND */}
      <section className="bg-gradient-to-br from-gray-900 to-black py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Types of Damages on 3-Tabs</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Common damage patterns on 3-tab and discontinued shingles and how to identify them during inspections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-[#FF0000]/20 hover:border-[#FF0000]/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🌪️</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Wind Damage</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Lifted or missing tabs</li>
                <li>• Exposed nail heads</li>
                <li>• Creased or folded shingles</li>
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
                <span className="text-2xl">☀️</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">UV Deterioration</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Widespread granule loss</li>
                <li>• Curling tab edges</li>
                <li>• Brittle, cracking material</li>
                <li>• Faded or discolored areas</li>
              </ul>
            </div>

            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-[#FF0000]/20 hover:border-[#FF0000]/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">💧</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Water Damage</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Algae or moss growth</li>
                <li>• Staining or discoloration</li>
                <li>• Delamination of layers</li>
                <li>• Soft or spongy areas</li>
              </ul>
            </div>

            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-[#FF0000]/20 hover:border-[#FF0000]/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🌡️</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Thermal Damage</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Thermal splitting</li>
                <li>• Expansion/contraction cracks</li>
                <li>• Warped or buckled shingles</li>
                <li>• Adhesive failure</li>
              </ul>
            </div>

            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-[#FF0000]/20 hover:border-[#FF0000]/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Impact Damage</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Punctures or tears</li>
                <li>• Fractured or broken tabs</li>
                <li>• Displaced or missing pieces</li>
                <li>• Structural mat damage</li>
              </ul>
            </div>
          </div>

          {/* Damage Examples Slider */}
          <div className="mt-16 bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 overflow-hidden">
            <div className="bg-black/40 border-b border-[#FF0000]/20 p-6">
              <h3 className="text-2xl font-bold text-white text-center">Damage Examples</h3>
              <p className="text-gray-400 text-center mt-2">Real examples of storm damage on roofing materials</p>
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

      {/* Section 3: New Architectural Shingles - RED BACKGROUND */}
      <section className="bg-gradient-to-br from-[#FF0000] to-[#C20F1F] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-black/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🏗️</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">New Architectural Shingles</h2>
            <p className="text-white/90 text-lg max-w-3xl mx-auto">
              Modern roofing technology that provides superior protection and aesthetic appeal
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Advanced Construction</h3>
                <p className="text-white/90 leading-relaxed mb-4">
                  Architectural shingles feature a multi-layered design with varying tab sizes and shapes, 
                  creating a dimensional appearance that mimics natural materials like wood or slate.
                </p>
                <ul className="space-y-2 text-white/90">
                  <li>• Thicker construction (up to 50% heavier)</li>
                  <li>• Multiple layers for enhanced durability</li>
                  <li>• Advanced granule technology</li>
                  <li>• Superior wind resistance ratings</li>
                </ul>
              </div>

              <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Performance Benefits</h3>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Wind Resistance:</strong> Rated up to 130+ mph winds</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Longevity:</strong> 30-50 year warranty periods</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Impact Resistance:</strong> Class 4 hail rating available</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Energy Efficiency:</strong> Cool roof technology options</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Aesthetic Advantages</h3>
                <p className="text-white/90 leading-relaxed mb-4">
                  The dimensional design creates depth and shadow lines that enhance curb appeal and property value.
                </p>
                <ul className="space-y-2 text-white/90">
                  <li>• Varied tab sizes create natural randomness</li>
                  <li>• Multiple color blends and patterns</li>
                  <li>• Enhanced shadow lines and texture</li>
                  <li>• Premium appearance at moderate cost</li>
                </ul>
              </div>

              <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Insurance Considerations</h3>
                <p className="text-white/90 leading-relaxed">
                  Many insurance companies now require architectural shingles as replacements for damaged 3-tab roofs, 
                  recognizing their superior performance and reduced claim frequency. This upgrade is often covered 
                  under "like kind and quality" provisions.
                </p>
              </div>
            </div>
          </div>

          {/* Architectural Shingles Examples Slider */}
          <div className="mt-16 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
            <div className="bg-black/40 border-b border-white/10 p-6">
              <h3 className="text-2xl font-bold text-white text-center">Architectural Shingles Examples</h3>
              <p className="text-white/90 text-center mt-2">Modern architectural shingles showing dimensional design and superior construction</p>
            </div>
            
            <div className="p-6">
              {/* Main Image Display */}
              <div className="relative bg-black/30 rounded-xl overflow-hidden mb-6">
                <div className="aspect-video relative">
                  <SafeImg
                    srcPath={architecturalImages[currentArchitecturalImageIndex]}
                    alt={`Architectural Shingles Example ${currentArchitecturalImageIndex + 1}`}
                    className="w-full h-full object-contain"
                  />
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevArchitecturalImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={nextArchitecturalImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {currentArchitecturalImageIndex + 1} / {architecturalImages.length}
                  </div>
                </div>
              </div>
              
              {/* Thumbnail Navigation */}
              <div className="flex justify-center space-x-3 mb-4">
                {architecturalImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToArchitecturalImage(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === currentArchitecturalImageIndex
                        ? 'border-white scale-110'
                        : 'border-white/30 hover:border-white/70 hover:scale-105'
                    }`}
                  >
                    <SafeImg
                      srcPath={image}
                      alt={`Architectural Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              
              {/* Dot Indicators */}
              <div className="flex justify-center space-x-2">
                {architecturalImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToArchitecturalImage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentArchitecturalImageIndex
                        ? 'bg-white scale-125'
                        : 'bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Owens Corning Information */}
          <div className="mt-12 bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Owens Corning Shingle Options</h3>
            <p className="text-white/90 leading-relaxed mb-6 max-w-3xl mx-auto">
              Choose from a wide variety of premium architectural shingle colors and designs. 
              Owens Corning TruDefinition Duration® shingles offer Class 3 impact resistance, 
              Class H wind ratings (up to 150 mph), and come with a 50-year warranty for maximum protection.
            </p>
            <a
              href="https://www.owenscorning.com/en-us/roofing/shingles"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-white text-[#FF0000] rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold text-lg transform hover:scale-105"
            >
              <span>View All Shingle Options</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-black/30 rounded-xl p-3">
                <p className="text-white font-semibold">50-Year Warranty</p>
                <p className="text-white/80">Premium protection</p>
              </div>
              <div className="bg-black/30 rounded-xl p-3">
                <p className="text-white font-semibold">Class H Wind Rating</p>
                <p className="text-white/80">Up to 150 mph winds</p>
              </div>
              <div className="bg-black/30 rounded-xl p-3">
                <p className="text-white font-semibold">Class 3 Impact</p>
                <p className="text-white/80">Hail & debris protection</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: 10 Minute Inspection - BLACK BACKGROUND */}
      <section className="bg-gradient-to-br from-gray-900 to-black py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-[#FF0000]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">10 Minute Inspection</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Our streamlined process from inspection to replacement
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-[#FF0000]/20 hover:border-[#FF0000]/40 transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎥</span>
              </div>
              <div className="w-8 h-8 bg-[#FF0000] rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold text-white mb-3">Inspection</h3>
              <p className="text-gray-300 leading-relaxed">
                I do a 10 min inspection that I record on video to see if you have the same granule loss we've been finding in this area
              </p>
            </div>

            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-[#FF0000]/20 hover:border-[#FF0000]/40 transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📋</span>
              </div>
              <div className="w-8 h-8 bg-[#FF0000] rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold text-white mb-3">File the Claim</h3>
              <p className="text-gray-300 leading-relaxed">
                If I find damage, we call the claim in to your insurance & I send them a 20 page report on everything I found.
              </p>
            </div>

            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-[#FF0000]/20 hover:border-[#FF0000]/40 transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👥</span>
              </div>
              <div className="w-8 h-8 bg-[#FF0000] rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold text-white mb-3">Adjuster Visit</h3>
              <p className="text-gray-300 leading-relaxed">
                The insurance schedules a day for us to show them everything I found (you don't have to be present for this).
              </p>
            </div>

            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-[#FF0000]/20 hover:border-[#FF0000]/40 transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <div className="w-8 h-8 bg-[#FF0000] rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">4</div>
              <h3 className="text-xl font-bold text-white mb-3">Approval & Replacement</h3>
              <p className="text-gray-300 leading-relaxed">
                Your Insurance issues payment and we replace your current shingles with the new Architectural shingles.
              </p>
            </div>
          </div>

          {/* Why This Process Works */}
          <div className="mt-12 bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-[#FF0000]/20 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Why This Process Works</h3>
            <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Our systematic approach ensures comprehensive documentation and smooth insurance processing. The video inspection 
              provides clear evidence, while our detailed reporting gives adjusters everything they need to approve your claim quickly.
            </p>
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