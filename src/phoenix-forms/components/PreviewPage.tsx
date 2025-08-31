import { useParams, Link } from 'react-router-dom';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ArrowLeft, Eye, Edit, Download, Home, Maximize, Printer } from 'lucide-react';
import { LABELS, SUBS } from '../lib/constants';
import { useFormContext } from '../contexts/FormContext';
import HtmlCertificate from './HtmlCertificate';
import ClcJobTotalOnly from './ClcJobTotalOnly';
import EstimateDocument from './EstimateDocument';
import InvoiceDocument from './InvoiceDocument';
import ContractsDocument from './ContractsDocument';
import WarrantyDocument from './WarrantyDocument';
import ReceiptDocument from './ReceiptDocument';
import InsurancePaymentAuthDocument from './InsurancePaymentAuthDocument';
import html2pdf from 'html2pdf.js';
import { toast } from 'sonner';

interface PreviewPageProps {
  onNavigateToMainAppPage?: (page: string) => void;
}

export default function PreviewPage({ onNavigateToMainAppPage }: PreviewPageProps) {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { formData, signatureDataURL, clearFormData } = useFormContext();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [docOnly, setDocOnly] = useState(false);
  const printRootRef = useRef<HTMLDivElement>(null);
  
  // Check if we're in document-only mode
  const isDocumentOnlyMode = searchParams.get('mode') === 'document-only';

  // Redirect if no form data
  useEffect(() => {
    if (!formData || (type !== 'estimate' && type !== 'invoice' && type !== 'contracts' && type !== 'insurancePaymentAuth' && !signatureDataURL)) {
      toast.error('No form data found. Please fill out the form first.');
      navigate('/');
    }
  }, [formData, signatureDataURL, navigate]);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);
  
  if (!type || !(type in LABELS)) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="bg-white border-red-500 border-2 max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-black mb-4">Preview Not Found</h2>
            <p className="text-gray-600 mb-6">The requested form preview does not exist.</p>
            <Link to="/">
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                Return Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!formData || (type !== 'estimate' && type !== 'invoice' && type !== 'contracts' && type !== 'insurancePaymentAuth' && !signatureDataURL)) {
    return null; // Will redirect via useEffect
  }

  const formType = type as keyof typeof LABELS;

  const enterFullscreen = async () => {
    if (printRootRef.current) {
      try {
        await printRootRef.current.requestFullscreen();
        setIsFullscreen(true);
      } catch (error) {
        console.error('Failed to enter fullscreen:', error);
      }
    }
  };

  const handlePrint = () => {
    setDocOnly(true);
    setTimeout(() => {
      window.print();
      setTimeout(() => setDocOnly(false), 100);
    }, 100);
  };

  const renderCertificate = () => {
    if (type === 'job-total-only') {
      return (
        <ClcJobTotalOnly 
          type={type} 
          data={formData as any} 
          signatureDataURL={signatureDataURL} 
        />
      );
    }
    
    if (type === 'estimate') {
      return (
        <EstimateDocument 
          type={type} 
          data={formData as any} 
        />
      );
    }
    
    if (type === 'invoice') {
      return (
        <InvoiceDocument 
          type={type} 
          data={formData as any} 
        />
      );
    }
    
    if (type === 'contracts') {
      return (
        <ContractsDocument 
          type={type} 
          data={formData as any} 
        />
      );
    }
    
    if (type === 'warranty') {
      return (
        <WarrantyDocument 
          type={type} 
          data={formData as any} 
          signatureDataURL={signatureDataURL} 
        />
      );
    }

    if (type === 'receipt') {
      return (
        <ReceiptDocument
          type={type}
          data={formData as any}
          signatureDataURL={signatureDataURL}
        />
      );
    }
    
    if (type === 'insurancePaymentAuth') {
      return (
        <InsurancePaymentAuthDocument 
          formData={formData as any} 
        />
      );
    }
    
    return (
      <HtmlCertificate 
        type={type} 
        data={formData} 
        signatureDataURL={signatureDataURL} 
      />
    );
  };
  const handleDownloadPDF = async () => {
    try {
      const element = document.getElementById('cert');
      if (!element) {
        toast.error('Certificate not found');
        return;
      }

      toast.info('Generating PDF...');
      
      const cert = document.getElementById('cert')!;
      
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `${LABELS[formType] || "document"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "letter", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"] },
      };

      html2pdf()
        .set(opt)
        .from(cert)
        .save();
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

  const handleEdit = () => {
    navigate(-1);
  };

  const handleHome = () => {
    clearFormData();
    if (onNavigateToMainAppPage) {
      onNavigateToMainAppPage('projects');
    } else {
      navigate('/phoenix-forms');
    }
  };

  return (
    <div className={`min-h-screen bg-black ${docOnly ? 'doc-only' : ''}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header - only show if not in document-only mode */}
        {!isDocumentOnlyMode && (
          <motion.div
            data-nonprint
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <button 
              onClick={handleEdit}
              className="inline-flex items-center text-red-600 hover:text-red-500 mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Form Editor
            </button>
            
            <div className="flex items-center gap-4 mb-4">
              <Eye className="text-red-600 w-12 h-12" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Preview: {LABELS[formType]}
                </h1>
                <p className="text-gray-300 text-lg mt-2">
                  {SUBS[formType]}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Certificate Preview - only show if not in document-only mode */}
        {!isDocumentOnlyMode && (
          <motion.div
            data-nonprint
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white border-red-500 border-2 mb-6">
              <CardHeader>
                <CardTitle className="text-black text-2xl flex items-center gap-3">
                  <Eye className="w-8 h-8" />
                  Certificate Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
                  <div className="transform scale-50 origin-top-left" style={{ width: '200%' }} data-nonprint>
                    {renderCertificate()}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6" data-nonprint>
                  <Button 
                    variant="outline" 
                    onClick={handleEdit}
                    className="border-red-600 text-red-600 hover:bg-red-50"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Form
                  </Button>
                  <Button 
                    onClick={enterFullscreen}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Maximize className="w-4 h-4 mr-2" />
                    Fullscreen
                  </Button>
                  <Button 
                    onClick={handlePrint}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Print
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleHome}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Full-size certificate - always rendered */}
        <div 
          id="print-root" 
          ref={printRootRef}
          className={`${isFullscreen ? 'is-fullscreen-active' : ''} ${isDocumentOnlyMode ? 'document-only-mode' : 'hidden'}`}
        >
          {renderCertificate()}
        </div>
      </div>
    </div>
  );
}