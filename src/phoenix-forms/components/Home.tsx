import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Flame, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CERT_TYPES, LABELS, SUBS } from '../lib/constants';

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

      {/* Certificate Forms Section */}
      <section className="py-8 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Document Generation
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Choose the appropriate form type for your certification needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CERT_TYPES.map((type, index) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white border-red-500 border-2 h-full hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="text-red-600 w-8 h-8" />
                      <CardTitle className="text-black text-xl">
                        {LABELS[type]}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-gray-600 text-base">
                      {SUBS[type]}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-between flex-1">
                    <div className="mb-6">
                      <div className="h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                        <FileText className="text-gray-400 w-12 h-12" />
                      </div>
                      <p className="text-gray-500 text-sm">
                        Professional certificate form with validation and PDF generation
                      </p>
                    </div>
                    <Link to={`/form/${type}`} className="w-full">
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 transition-colors duration-200">
                        Create Form
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}