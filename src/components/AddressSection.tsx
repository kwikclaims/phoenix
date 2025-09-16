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

  // Helper function to get display title (just city name)
  const getDisplayTitle = (address: ProjectAddress): string => {
    return address.city;
  };

  const bgClass = isRedBackground 
    ? 'bg-gradient-to-br from-[#FF0000] to-[#C20F1F]'
    : 'bg-gradient-to-br from-gray-900 to-black';

  const textClass = isRedBackground ? 'text-white' : 'text-white';
  const accentClass = isRedBackground ? 'text-white/90' : 'text-gray-400';
  const cardBgClass = isRedBackground 
    ? 'bg-black/20 backdrop-blur-xl border-white/10'
    : 'bg-black/60 backdrop-blur-xl border-[#FF0000]/20';

  return (
    <section className={`${bgClass} py-16 animate-fade-in-up`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Address Header */}
        <div className="text-center mb-12">
          <div className={`w-16 h-16 ${isRedBackground ? 'bg-black/20' : 'bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20'} rounded-2xl flex items-center justify-center mx-auto mb-6 animate-scale-in animate-delay-200`}>
            <MapPin className={`w-8 h-8 ${isRedBackground ? 'text-white' : 'text-[#FF0000]'}`} />
          </div>
          <h2 className={`text-2xl sm:text-3xl font-bold ${textClass} mb-2 animate-fade-in-up animate-delay-300`}>
            {getDisplayTitle(address)}
          </h2>
        </div>

        {/* Photo Slider */}
        <div className={`${cardBgClass} rounded-2xl border overflow-hidden animate-scale-in animate-delay-400 hover-lift`}>
          <div className={`${isRedBackground ? 'bg-black/40 border-white/10' : 'bg-black/40 border-[#FF0000]/20'} border-b p-6`}>
            <h3 className={`text-2xl font-bold ${textClass} text-center animate-fade-in-up animate-delay-500`}>Project Photos</h3>
            <p className={`${accentClass} text-center mt-2 animate-fade-in-up animate-delay-600`}>Before and after images of the completed work</p>
          </div>
          
          <div className="p-6">
            {images.length > 0 ? (
              <>
                {/* Main Image Display */}
                <div className={`relative ${isRedBackground ? 'bg-black/30' : 'bg-gray-900/50'} rounded-xl overflow-hidden mb-6 animate-fade-in animate-delay-700`}>
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
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover-lift"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover-lift"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    )}
                    
                    {/* Image Counter */}
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium animate-fade-in animate-delay-800">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  </div>
                </div>
                
                {/* Thumbnail Navigation */}
                {images.length > 1 && (
                  <>
                    <div className="flex justify-center space-x-3 mb-4 animate-fade-in-up animate-delay-800">
                      {images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 hover-scale ${
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
                    <div className="flex justify-center space-x-2 animate-fade-in-up animate-delay-300">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 hover-scale ${
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
              <div className={`${isRedBackground ? 'bg-black/30' : 'bg-gray-900/50'} rounded-xl p-12 text-center animate-fade-in-up animate-delay-700`}>
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