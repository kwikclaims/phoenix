import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Flame, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-8 flex items-center justify-center bg-white">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-red-500 tracking-tight" 
              style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                fontWeight: 900,
                color: '#FF0000',
                letterSpacing: '-0.025em'
              }}
            >
              Phoenix Forms
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Empty State - No Forms Available */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Document Generation
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
              Access external document generation tools for Phoenix projects.
            </p>
            
            <div className="flex justify-center">
              <a
                href="https://phxrcs.com/PDFmaker.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 font-semibold text-lg transform hover:scale-105"
              >
                <FileText className="w-6 h-6" />
                <span>Contract Generator</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            
            <p className="text-gray-400 text-sm max-w-2xl mx-auto mt-6">
              Opens the external Phoenix contract generation tool in a new tab.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}