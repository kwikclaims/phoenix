import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Camera } from 'lucide-react';
import SafeImg from './SafeImg';

interface ProjectAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface AddressSectionProps {
  address: ProjectAddress;
  isRedBackground: boolean;
  images?: string[];
}

export const AddressSection: React.FC<AddressSectionProps> = ({ 
  address, 
  isRedBackground, 
  images = [] 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.zipCode}`;

  const bgClass = isRedBackground 
    ? 'bg-gradient-to-br from-[#FF0000] to-[#C20F1F]'
    : 'bg-gradient-to-br from-gray-900 to-black';

  const textClass = isRedBackground ? 'text-white' : 'text-white';
  const accentClass = isRedBackground ? 'text-white/90' : 'text-gray-400';
  const cardBgClass = isRedBackground 
    ? 'bg-black/20 backdrop-blur-xl border-white/10'
    : 'bg-black/60 backdrop-blur-xl border-[#FF0000]/20';

  return (
    <section className={`${bgClass} py-16`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Address Header */}
        <div className="text-center mb-12">
          <div className={`w-16 h-16 ${isRedBackground ? 'bg-black/20' : 'bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20'} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
            <MapPin className={`w-8 h-8 ${isRedBackground ? 'text-white' : 'text-[#FF0000]'}`} />
          </div>
          <h2 className={`text-2xl sm:text-3xl font-bold ${textClass} mb-2`}>
            {address.street}
          </h2>
          <p className={`${accentClass} text-lg`}>
            {address.city}, {address.state} {address.zipCode}
          </p>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div className="space-y-6">
            <div className={`${cardBgClass} rounded-2xl p-6 border`}>
              <h3 className={`text-xl font-bold ${textClass} mb-4`}>Project Details</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className={`w-5 h-5 ${isRedBackground ? 'text-white/70' : 'text-[#FF0000]'}`} />
                  <span className={accentClass}>Complete Address: {fullAddress}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">✅</span>
                  <span className={accentClass}>Project Status: Completed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🏠</span>
                  <span className={accentClass}>Service: Roof Replacement</span>
                </div>
              </div>
            </div>

            <div className={`${cardBgClass} rounded-2xl p-6 border`}>
              <h3 className={`text-xl font-bold ${textClass} mb-4`}>Work Completed</h3>
              <ul className={`space-y-2 ${accentClass}`}>
                <li>• Complete roof replacement with architectural shingles</li>
                <li>• Insurance claim processing and approval</li>
                <li>• Professional installation and cleanup</li>
                <li>• 50-year warranty coverage</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`${cardBgClass} rounded-2xl p-6 border`}>
              <h3 className={`text-xl font-bold ${textClass} mb-4`}>Quality Assurance</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className={`${isRedBackground ? 'bg-black/30' : 'bg-gray-900/50'} rounded-xl p-3 text-center`}>
                  <p className={`${textClass} font-semibold`}>Class H Wind</p>
                  <p className={`${accentClass} text-sm`}>150 mph rating</p>
                </div>
                <div className={`${isRedBackground ? 'bg-black/30' : 'bg-gray-900/50'} rounded-xl p-3 text-center`}>
                  <p className={`${textClass} font-semibold`}>Class 3 Impact</p>
                  <p className={`${accentClass} text-sm`}>Hail protection</p>
                </div>
                <div className={`${isRedBackground ? 'bg-black/30' : 'bg-gray-900/50'} rounded-xl p-3 text-center`}>
                  <p className={`${textClass} font-semibold`}>50-Year</p>
                  <p className={`${accentClass} text-sm`}>Warranty</p>
                </div>
                <div className={`${isRedBackground ? 'bg-black/30' : 'bg-gray-900/50'} rounded-xl p-3 text-center`}>
                  <p className={`${textClass} font-semibold`}>MHIC</p>
                  <p className={`${accentClass} text-sm`}>#164678</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Slider */}
        <div className={`${cardBgClass} rounded-2xl border overflow-hidden`}>
          <div className={`${isRedBackground ? 'bg-black/40 border-white/10' : 'bg-black/40 border-[#FF0000]/20'} border-b p-6`}>
            <h3 className={`text-2xl font-bold ${textClass} text-center`}>Project Photos</h3>
            <p className={`${accentClass} text-center mt-2`}>Before and after images of the completed work</p>
          </div>
          
          <div className="p-6">
            {images.length > 0 ? (
              <>
                {/* Main Image Display */}
                <div className={`relative ${isRedBackground ? 'bg-black/30' : 'bg-gray-900/50'} rounded-xl overflow-hidden mb-6`}>
                  <div className="aspect-video relative">
                    <SafeImg
                      srcPath={images[currentImageIndex]}
                      alt={`Project photo ${currentImageIndex + 1}`}
                      className="w-full h-full object-contain"
                    />
                    
                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                      <>
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
                      </>
                    )}
                    
                    {/* Image Counter */}
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  </div>
                </div>
                
                {/* Thumbnail Navigation */}
                {images.length > 1 && (
                  <>
                    <div className="flex justify-center space-x-3 mb-4">
                      {images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                            index === currentImageIndex
                              ? `${isRedBackground ? 'border-white' : 'border-[#FF0000]'} scale-110`
                              : `${isRedBackground ? 'border-white/30 hover:border-white/70' : 'border-gray-600 hover:border-[#FF0000]/50'} hover:scale-105`
                          }`}
                        >
                          <SafeImg
                            srcPath={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                    
                    {/* Dot Indicators */}
                    <div className="flex justify-center space-x-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentImageIndex
                              ? `${isRedBackground ? 'bg-white' : 'bg-[#FF0000]'} scale-125`
                              : `${isRedBackground ? 'bg-white/40 hover:bg-white/70' : 'bg-gray-600 hover:bg-[#FF0000]/50'}`
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              /* Placeholder for when no images are uploaded yet */
              <div className={`${isRedBackground ? 'bg-black/30' : 'bg-gray-900/50'} rounded-xl p-12 text-center`}>
                <div className={`w-20 h-20 ${isRedBackground ? 'bg-black/40' : 'bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20'} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <Camera className={`w-10 h-10 ${isRedBackground ? 'text-white/70' : 'text-[#FF0000]'}`} />
                </div>
                <h4 className={`text-xl font-bold ${textClass} mb-2`}>Project Photos Coming Soon</h4>
                <p className={accentClass}>
                  Before and after photos of this completed project will be uploaded here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};