import React from 'react';
import { Wrench, Trophy, MapPin } from 'lucide-react';
import { AddressSection } from './AddressSection';

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

  // Project images mapping
  const projectImages: Record<string, string[]> = {
    '3105 May Green Ave': [
      '/images/3105-may-green-ave-district-heights-md-20747/SnapInsta.to_504452813_17885974488282192_6322601057509822858_n.jpg',
      '/images/3105-may-green-ave-district-heights-md-20747/SnapInsta.to_503189712_17885974572282192_7286911066833312736_n.jpg',
      '/images/3105-may-green-ave-district-heights-md-20747/SnapInsta.to_504275980_17885974551282192_5371025775081805917_n.jpg',
      '/images/3105-may-green-ave-district-heights-md-20747/SnapInsta.to_503323475_17885974542282192_7031478435624072144_n (1).jpg',
      '/images/3105-may-green-ave-district-heights-md-20747/SnapInsta.to_504465919_17885974524282192_1002589573664417717_n.jpg',
      '/images/3105-may-green-ave-district-heights-md-20747/SnapInsta.to_504517057_17885974608282192_8159283913973834757_n (1).jpg'
    ],
    '5324 Kepler Rd': [
      '/images/uploads/photo_10_2025-08-27_00-34-15 copy.jpg',
      '/images/uploads/photo_1_2025-08-27_00-34-15 copy.jpg',
      '/images/uploads/photo_2_2025-08-27_00-34-15 copy.jpg',
      '/images/uploads/photo_3_2025-08-27_00-34-15 copy.jpg',
      '/images/uploads/photo_4_2025-08-27_00-34-15 copy.jpg',
      '/images/uploads/photo_5_2025-08-27_00-34-15 copy.jpg',
      '/images/uploads/photo_6_2025-08-27_00-34-15 copy.jpg',
      '/images/uploads/photo_7_2025-08-27_00-34-15 copy.jpg',
      '/images/uploads/photo_8_2025-08-27_00-34-15 copy.jpg',
      '/images/uploads/photo_9_2025-08-27_00-34-15 copy.jpg'
    ],
    '7610 Martha St': [
      '/images/uploads/photo_1_2025-08-27_10-12-49.jpg',
      '/images/uploads/photo_2_2025-08-27_10-12-49.jpg',
      '/images/uploads/photo_3_2025-08-27_10-12-49.jpg',
      '/images/uploads/photo_4_2025-08-27_10-12-49.jpg',
      '/images/uploads/photo_5_2025-08-27_10-12-49.jpg',
      '/images/uploads/photo_6_2025-08-27_10-12-49.jpg'
    ],
    '8137 Murray Hill Dr': [
      '/images/uploads/SnapInsta.to_504460985_17885973921282192_8587515272757148955_n.jpg',
      '/images/uploads/SnapInsta.to_503903323_17885973909282192_644569933208942934_n.jpg',
      '/images/uploads/SnapInsta.to_503365766_17885973888282192_1145922153204289291_n.jpg',
      '/images/uploads/SnapInsta.to_503419559_17885973792282192_8581030595624720935_n.jpg',
      '/images/uploads/SnapInsta.to_505464637_1788597375028219'
    ],
    '5911 Center Dr': [
      '/images/uploads/SnapInsta.to_504223286_17885977719282192_1735330335656921233_n.jpg',
      '/images/uploads/SnapInsta.to_503954872_17885977710282192_5664430865531804436_n.jpg',
      '/images/uploads/SnapInsta.to_504828801_17885977701282192_3131300563178741868_n.jpg',
      '/images/uploads/SnapInsta.to_504256811_17885977692282192_5077496721810342716_n.jpg',
      '/images/uploads/SnapInsta.to_505088083_1788597767128219',
      '/images/uploads/SnapInsta.to_504223286_17885977719282192_1735330335656921233_n copy.jpg',
      '/images/uploads/SnapInsta.to_503954872_17885977710282192_5664430865531804436_n copy.jpg',
      '/images/uploads/SnapInsta.to_504828801_17885977701282192_3131300563178741868_n copy.jpg',
      '/images/uploads/SnapInsta.to_504256811_17885977692282192_5077496721810342716_n copy.jpg',
      '/images/uploads/SnapInsta.to_505088083_17885977671282192_4283342335613094576_n copy.jpg',
      '/images/uploads/SnapInsta.to_504392835_17885977767282192_8332413579950957337_n.jpg',
      '/images/uploads/SnapInsta.to_504996443_17885977776282192_6714522870948717935_n.jpg',
      '/images/uploads/SnapInsta.to_503972141_17885977755282192_2654150386616423149_n.jpg',
      '/images/uploads/SnapInsta.to_503498018_17885977746282192_4554176372288094356_n.jpg',
      '/images/uploads/SnapInsta.to_503285820_1788597773728219',
      '/images/uploads/SnapInsta.to_504494197_17885977821282192_7327016843287653997_n.jpg',
      '/images/uploads/SnapInsta.to_505116058_17885977812282192_750560660073360059_n.jpg',
      '/images/uploads/SnapInsta.to_504375969_17885977803282192_1535556661833637271_n.jpg',
      '/images/uploads/SnapInsta.to_503202948_17885977794282192_3086059477859752779_n.jpg',
      '/images/uploads/SnapInsta.to_503936538_17885977785282',
      '/images/uploads/SnapInsta.to_504065293_1788597783328219'
    ]
    '5911 Center Dr': [
      '/images/uploads/SnapInsta.to_504065293_17885977833282192_1063594985484969744_n copy copy.jpg',
      '/images/uploads/SnapInsta.to_504494197_17885977821282192_7327016843287653997_n copy.jpg',
      '/images/uploads/SnapInsta.to_505116058_17885977812282192_750560660073360059_n copy copy.jpg',
      '/images/uploads/SnapInsta.to_504375969_17885977803282192_1535556661833637271_n copy copy.jpg',
      '/images/uploads/SnapInsta.to_503202948_17885977794282192_3086059477859752779_n copy copy.jpg',
      '/images/uploads/SnapInsta.to_503936538_17885977785282192_6165421142506469450_n copy.jpg',
      '/images/uploads/SnapInsta.to_504392835_17885977767282192_8332413579950957337_n copy.jpg',
      '/images/uploads/SnapInsta.to_504996443_17885977776282192_6714522870948717935_n copy.jpg',
      '/images/uploads/SnapInsta.to_503972141_17885977755282192_2654150386616423149_n copy.jpg',
      '/images/uploads/SnapInsta.to_503498018_17885977746282192_4554176372288094356_n copy.jpg',
      '/images/uploads/SnapInsta.to_504323507_17885977728282192_290734542248004959_n.jpg',
      '/images/uploads/SnapInsta.to_504223286_17885977719282192_1735330335656921233_n copy copy.jpg',
      '/images/uploads/SnapInsta.to_503954872_17885977710282192_5664430865531804436_n copy copy.jpg',
      '/images/uploads/SnapInsta.to_504828801_17885977701282192_3131300563178741868_n copy copy.jpg',
      '/images/uploads/SnapInsta.to_504256811_17885977692282192_5077496721810342716_n copy copy.jpg'
    ]
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-black px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Wrench className="w-10 h-10 text-[#FF0000]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Work</h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-8">
            Showcasing our completed roofing projects across Maryland. Each project represents our commitment to quality craftsmanship and customer satisfaction.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl mx-auto">
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-4 border border-[#FF0000]/20">
              <div className="text-2xl font-bold text-[#FF0000]">100%</div>
              <div className="text-gray-400 text-sm">Customer Satisfaction</div>
            </div>
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-4 border border-[#FF0000]/20">
              <div className="text-2xl font-bold text-[#FF0000]">50 Year</div>
              <div className="text-gray-400 text-sm">Warranty Coverage</div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Sections */}
      <div>
        {completedProjects.map((project, index) => (
          <AddressSection
            key={`${project.street}-${project.zipCode}`}
            address={project}
            isRedBackground={index % 2 === 0}
            images={projectImages[project.street] || []}
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
              href="tel:(301)450-9487"
              className="px-8 py-4 bg-gradient-to-r from-[#FF0000] to-[#C20F1F] text-white rounded-xl hover:shadow-lg hover:shadow-[#FF0000]/25 transition-all duration-300 font-semibold text-lg transform hover:scale-105"
            >
              Call (301) 450-9487
            </a>
            <p className="text-gray-400">
              Free 10-minute inspection • No obligation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};