import React from 'react';
import { AlertTriangle, Shield, FileText, Phone, TrendingDown } from 'lucide-react';

export const LossDatePage: React.FC = () => {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Alert Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-8 mb-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            STORM DAMAGE NOTICE
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold">
            PG & MONTGOMERY COUNTY
          </h2>
        </div>

        {/* Storm Event Overview */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="text-3xl mr-3">🌪️</span>
            Storm Event Overview
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Storm Date</h4>
              <p className="text-3xl font-bold text-red-600">April 19, 2025</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Storm Details</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>76+ mph gusts</strong> recorded in Frederick & Washington Counties (per NWS)</li>
                <li>• <strong>PG & Montgomery County</strong> saw gusts of 35–40+ mph (some areas even higher)</li>
                <li>• <strong>National Weather Service (NWS)</strong> declared this a severe wind event for central Maryland</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Your Roof May Be Compromised */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="text-3xl mr-3">🏠</span>
            Why Your Roof May Be Compromised
          </h3>
          
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Age & Materials</h4>
              <p className="text-gray-700">
                Most homes in PG and Montgomery County use builder-grade 3-tab shingles.
              </p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Weakness</h4>
              <p className="text-gray-700">
                These shingles lose strength quickly over time.
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Wind Damage Threshold</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>After 10–15 years:</strong> Shingles may lift in 30–40 mph winds</li>
                <li>• <strong>After 20+ years:</strong> Even 20–30 mph winds may cause damage</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Shingle Wind Resistance Graph */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingDown className="w-8 h-8 text-red-600 mr-3" />
            Shingle Wind Resistance Over Time
          </h3>
          
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="relative h-64 mb-4">
              {/* Simple visual representation of declining wind resistance */}
              <svg className="w-full h-full" viewBox="0 0 400 200">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Axes */}
                <line x1="40" y1="20" x2="40" y2="180" stroke="#374151" strokeWidth="2"/>
                <line x1="40" y1="180" x2="380" y2="180" stroke="#374151" strokeWidth="2"/>
                
                {/* Y-axis labels (Wind Resistance) */}
                <text x="25" y="25" textAnchor="middle" className="text-xs fill-gray-600">60</text>
                <text x="25" y="65" textAnchor="middle" className="text-xs fill-gray-600">45</text>
                <text x="25" y="105" textAnchor="middle" className="text-xs fill-gray-600">30</text>
                <text x="25" y="145" textAnchor="middle" className="text-xs fill-gray-600">15</text>
                <text x="25" y="185" textAnchor="middle" className="text-xs fill-gray-600">0</text>
                
                {/* X-axis labels (Years) */}
                <text x="40" y="195" textAnchor="middle" className="text-xs fill-gray-600">0</text>
                <text x="120" y="195" textAnchor="middle" className="text-xs fill-gray-600">5</text>
                <text x="200" y="195" textAnchor="middle" className="text-xs fill-gray-600">10</text>
                <text x="280" y="195" textAnchor="middle" className="text-xs fill-gray-600">15</text>
                <text x="360" y="195" textAnchor="middle" className="text-xs fill-gray-600">20+</text>
                
                {/* Decline curve */}
                <path 
                  d="M 40 20 Q 120 30 200 80 Q 280 130 360 160" 
                  fill="none" 
                  stroke="#dc2626" 
                  strokeWidth="3"
                />
                
                {/* Data points */}
                <circle cx="40" cy="20" r="4" fill="#dc2626"/>
                <circle cx="200" cy="80" r="4" fill="#dc2626"/>
                <circle cx="360" cy="160" r="4" fill="#dc2626"/>
              </svg>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-900">X-Axis: Years Since Installation</p>
                <p className="text-gray-600">0 to 25 years</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Y-Axis: Wind Resistance (mph)</p>
                <p className="text-gray-600">0 to 60 mph</p>
              </div>
            </div>
            
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-medium">
                Key Insight: Shingles lose wind resistance as they age, going from ~60 mph when new to below 30 mph around 20+ years.
              </p>
            </div>
          </div>
        </div>

        {/* Your Rights */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Shield className="w-8 h-8 text-blue-600 mr-3" />
            Your Rights
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Free Inspection</h4>
              <p className="text-gray-700 text-sm">for Storm Damage</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Right to File</h4>
              <p className="text-gray-700 text-sm">an Insurance Claim for April 18th Storm</p>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Full Code-Compliant</h4>
              <p className="text-gray-700 text-sm">Replacement if Two Layers Exist</p>
            </div>
          </div>
        </div>

        {/* Take Action Now */}
        <div className="bg-gradient-to-r from-[#FF0000] to-[#C20F1F] text-white rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Take Action Now</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h4 className="font-semibold mb-2">Schedule a Free</h4>
              <p className="text-white/90">Roof Inspection</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h4 className="font-semibold mb-2">File an</h4>
              <p className="text-white/90">Insurance Claim</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h4 className="font-semibold mb-2">Get Full</h4>
              <p className="text-white/90">Code-Compliant Repairs</p>
            If you suspect storm damage from the April 19th event, don't wait. 
            Early documentation is crucial for a successful insurance claim.
          
          <div className="text-center">
            <a
              href="tel:3463749083"
              className="inline-flex items-center space-x-3 px-12 py-6 bg-black text-white rounded-2xl hover:bg-gray-900 transition-all duration-300 font-bold text-xl transform hover:scale-105"
            >
              <Phone className="w-8 h-8" />
              <span>Call for Free Inspection: (346) 374-9083</span>
            </a>
          </div>
        </div>

        {/* Company Information */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Company Information</h3>
          
          <div className="text-center space-y-2">
            <p className="text-xl font-bold text-gray-900">Kwik Claims</p>
            <p className="text-gray-700">10334 Vista Meadow Way, Lanham, MD 20706</p>
            <p className="text-gray-700">License: MHIC #164678</p>
            <p className="text-gray-700">Phone: (346) 374-9083</p>
          </div>
          
          <div className="mt-8 bg-gray-50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3 text-center">Emergency Storm Response</h4>
            <p className="text-gray-700 text-center">
              If you suspect storm damage from the April 18th event, don't wait. 
              Early documentation is crucial for a successful insurance claim.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
  )
}