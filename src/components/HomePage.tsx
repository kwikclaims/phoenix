import React from 'react';
import { Phone, Shield, FileText, Users, Target, CheckCircle } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-black px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Your Secret Weapon When the Insurance Company Plays Hardball
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            I personally review your policy, document your damage, and create a winning strategy so you can walk into the claims process with leverage — and keep more of your money.
          </p>
          
          <a
            href="tel:3463749083"
            className="inline-flex items-center space-x-3 px-12 py-6 bg-gradient-to-r from-[#FF0000] to-[#C20F1F] text-white rounded-2xl hover:shadow-2xl hover:shadow-[#FF0000]/25 transition-all duration-300 font-bold text-xl transform hover:scale-105"
          >
            <Phone className="w-8 h-8" />
            <span>Call Now: (346) 374-9083</span>
          </a>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              The Insurance Process Is Stacked Against You.
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              When disaster strikes, you're stressed, overwhelmed, and vulnerable — and that's exactly when insurance companies hope you'll take the lowest offer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Confusing Policies</h3>
              <p className="text-gray-700">You shouldn't need a law degree to understand what's covered.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lowball Settlements</h3>
              <p className="text-gray-700">Most first offers aren't anywhere near what repairs really cost.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🔨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Contractor Nightmares</h3>
              <p className="text-gray-700">Some contractors inflate costs or take advantage of desperate homeowners.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Endless Delays</h3>
              <p className="text-gray-700">Without perfect documentation, claims can drag on for months.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 md:col-span-2">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">😞</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">No One on Your Side</h3>
              <p className="text-gray-700">You're left feeling like you're fighting a billion-dollar company alone.</p>
            </div>
          </div>

          <div className="text-center bg-[#FF0000]/10 border border-[#FF0000]/20 rounded-2xl p-8">
            <p className="text-2xl font-bold text-[#FF0000]">
              The result: Most homeowners leave thousands — sometimes tens of thousands — on the table.
            </p>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="bg-gradient-to-br from-gray-900 to-black py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              I'm Here to Level the Playing Field.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-[#FF0000]/20">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-[#FF0000]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Policy Review & Explanation</h3>
              <p className="text-gray-300">I translate the fine print into plain English.</p>
            </div>

            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-[#FF0000]/20">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📸</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Damage Documentation</h3>
              <p className="text-gray-300">Professional photo reports that insurers respect.</p>
            </div>

            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-[#FF0000]/20">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">💯</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Accurate Estimates</h3>
              <p className="text-gray-300">Know the real cost before you accept any offer.</p>
            </div>

            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-[#FF0000]/20">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-[#FF0000]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Strategy & Coaching</h3>
              <p className="text-gray-300">I arm you with the right words and approach.</p>
            </div>

            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-[#FF0000]/20 md:col-span-2">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[#FF0000]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Contractor Guidance</h3>
              <p className="text-gray-300">Learn how to choose trustworthy pros and avoid scams.</p>
            </div>
          </div>

          <div className="text-center bg-[#FF0000]/20 border border-[#FF0000]/30 rounded-2xl p-8">
            <p className="text-2xl font-bold text-[#FF0000] mb-4">
              End result: You walk into every insurer conversation confident, backed by facts — not fear.
            </p>
            <a
              href="tel:3463749083"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-[#FF0000] to-[#C20F1F] text-white rounded-xl hover:shadow-lg hover:shadow-[#FF0000]/25 transition-all duration-300 font-semibold text-lg transform hover:scale-105"
            >
              <Phone className="w-6 h-6" />
              <span>Call Now: (346) 374-9083</span>
            </a>
          </div>
        </div>
      </section>

      {/* Why People Hire Me Section */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              I Only Take a Few Claims Per Month — Because This Is Personal.
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              This isn't a call center. When you hire me, you get:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-[#FF0000] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">My direct attention</h3>
                <p className="text-gray-700">I personally review every policy and report.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-[#FF0000] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Fast turnaround</h3>
                <p className="text-gray-700">So your claim doesn't stall.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 md:col-span-2">
              <div className="w-8 h-8 bg-[#FF0000] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Peace of mind</h3>
                <p className="text-gray-700">Knowing you're not leaving money on the table.</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a
              href="tel:3463749083"
              className="inline-flex items-center space-x-3 px-12 py-6 bg-gradient-to-r from-[#FF0000] to-[#C20F1F] text-white rounded-2xl hover:shadow-2xl hover:shadow-[#FF0000]/25 transition-all duration-300 font-bold text-xl transform hover:scale-105"
            >
              <Phone className="w-8 h-8" />
              <span>Call Now: (346) 374-9083</span>
            </a>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="bg-gradient-to-br from-gray-900 to-black py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <span className="text-4xl">👨‍💼</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Meet Zach Kwik</h2>
          </div>

          <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-[#FF0000]/20">
            <blockquote className="text-xl sm:text-2xl text-gray-300 leading-relaxed text-center italic">
              "I built Kwik Claims because I watched too many good people get bullied by insurers and exploited by contractors after a loss.
              <br /><br />
              Today, I work with a handful of clients each month to protect their homes, businesses, and financial futures — and to make sure they're treated fairly."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Vision / Scarcity Section */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
            Right Now, You Can Still Work With Me Directly.
          </h2>
          
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 mb-12">
            <p className="text-xl text-gray-700 leading-relaxed">
              I'm building Claim Fighter — an app that will revolutionize how policyholders fight back — but right now, I'm still in the trenches with my clients, personally taking on cases.
              <br /><br />
              <strong>If you want my direct help, now is the time.</strong>
            </p>
          </div>

          <a
            href="tel:3463749083"
            className="inline-flex items-center space-x-3 px-12 py-6 bg-gradient-to-r from-[#FF0000] to-[#C20F1F] text-white rounded-2xl hover:shadow-2xl hover:shadow-[#FF0000]/25 transition-all duration-300 font-bold text-xl transform hover:scale-105"
          >
            <Phone className="w-8 h-8" />
            <span>Call Now: (346) 374-9083</span>
          </a>
        </div>
      </section>

      {/* Legal Disclaimer Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Legal Disclaimer</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Kwik Claims is a consultation service and does not provide legal advice, adjust claims, or negotiate settlements on behalf of clients. For representation or claim negotiation, we may refer you to a licensed public adjuster in Maryland.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};