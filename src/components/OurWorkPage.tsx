import React from 'react';
import { Wrench, Trophy, MapPin } from 'lucide-react';
import { AddressSection } from './AddressSection';
import { projectImages } from '../data/imageRegistry';
import { ImageDebugPanel } from './ImageDebugPanel';

interface ProjectAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export const OurWorkPage: React.FC = () => {
  const completedProjects: ProjectAddress[] = [
    { street: '3105 May Green Ave', city: 'District Heights', state: 'MD', zipCode: '20747' },
    { street: '5324 Kepler Rd', city: 'Temple Hills', state: 'MD', zipCode: '20748' },
    { street: '7610 Martha St', city: 'District Heights', state: 'MD', zipCode: '20747' },
    { street: '8137 Murray Hill Dr', city: 'Fort Washington', state: 'MD', zipCode: '20744' },
    { street: '5911 Center Dr', city: 'Temple Hills', state: 'MD', zipCode: '20748' },
    { street: '909 Shelby Dr', city: 'Oxon Hill', state: 'MD', zipCode: '20745' },
    { street: '13213 Old Chapel Rd', city: 'Bowie', state: 'MD', zipCode: '20720' },
    { street: '8504 Denton Ct', city: 'Clinton', state: 'MD', zipCode: '20735' },
    { street: '5200 Varnum St', city: 'Bladensburg', state: 'MD', zipCode: '20710' },
    { street: '8027 Carey Branch Pl', city: 'Fort Washington', state: 'MD', zipCode: '20744' },
  ];

  // Helper function to get full address key for image lookup
  const getImageKey = (project: ProjectAddress): string => {
    return `${project.street}, ${project.city}, ${project.state} ${project.zipCode}`;
  };

  // Collect all image paths for debugging
  const allImagePaths = Object.values(projectImages).flat();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-black px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Wrench className="w-10 h-10 text-[#FF0000]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">My Work</h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-8">
            Showcasing some of my recently completed restoration projects across Maryland. Each project represents my commitment to quality craftsmanship and customer satisfaction.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 gap-6 max-w-xl mx-auto">
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-4 border border-[#FF0000]/20">
              <div className="text-2xl font-bold text-[#FF0000]">100%</div>
              <div className="text-gray-400 text-sm">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Sections */}
      <div>
        {completedProjects.map((project, index) => (
          <AddressSection
            key={getImageKey(project)}
            address={project}
            isRedBackground={index % 2 === 0}
            images={projectImages[getImageKey(project)] || []}
          />
        ))}
      </div>

      {/* Footer Call to Action */}
      <div className="bg-gradient-to-br from-gray-900 to-black py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-[#FF0000]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Join Our Success Stories?</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Let us help you navigate your insurance claim and upgrade your roof with the same quality and professionalism 
            shown in these completed projects.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="tel:(346)374-9083"
              className="px-8 py-4 bg-gradient-to-r from-[#FF0000] to-[#C20F1F] text-white rounded-xl hover:shadow-lg hover:shadow-[#FF0000]/25 transition-all duration-300 font-semibold text-lg transform hover:scale-105"
            >
              Call (346) 374-9083
            </a>
            <p className="text-gray-400">
              Free 10-minute inspection • No obligation
            </p>
          </div>
        </div>
      </div>

      {/* Debug Panel */}
      <ImageDebugPanel 
        imagePaths={allImagePaths}
        title="Our Work Images"
      />
    </div>
  );
};