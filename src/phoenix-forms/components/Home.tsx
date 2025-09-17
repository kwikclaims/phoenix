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
              All document generation forms have been removed from this system.
            </p>
            <p className="text-gray-400 text-base max-w-2xl mx-auto">
              This page previously contained various certificate and document generation tools, 
              but they are no longer available in this version of Phoenix Forms.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}