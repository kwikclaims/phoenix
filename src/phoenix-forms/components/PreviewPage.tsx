import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ArrowLeft, Eye, Edit, Download, Home } from 'lucide-react';
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
  const { formData, signatureDataURL, clearFormData } = useFormContext();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [docOnly, setDocOnly] = useState(false);
  const fsHostRef = useRef<HTMLDivElement | null>(null);

  // Redirect if no form data
  useEffect(() => {
    if (!formData || (type !== 'estimate' && type !== 'invoice' && type !== 'contracts' && type !== 'insurancePaymentAuth' && !signatureDataURL)) {
      toast.error('No form data found. Please fill out the form first.');
      navigate('/');
    }
  }, [formData, signatureDataURL, navigate]);
  
  const enterFullscreen = async () => {
    setDocOnly(false);
    setIsFullscreen(true);
    await Promise.resolve();
    if (fsHostRef.current && !document.fullscreenElement) {
      try { await fsHostRef.current.requestFullscreen(); } catch {}
    }
  };

  const exitFullscreen = async () => {
    if (document.fullscreenElement) {
      try { await document.exitFullscreen(); } catch {}
    }
    setIsFullscreen(false);
    setDocOnly(false);
  };

  useEffect(() => {
    const onFsChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
        setDocOnly(false);
      }
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
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
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
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

        {/* Certificate Preview */}
        <motion.div
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
                <div className="transform scale-50 origin-top-left" style={{ width: '200%' }}>
                  {renderCertificate()}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Button 
                  variant="outline" 
                  onClick={handleEdit}
                  className="border-red-600 text-red-600 hover:bg-red-50"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Form
                </Button>
                <Button 
                  onClick={handleDownloadPDF}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <button type="button" onClick={() => { setIsFullscreen(true); setDocOnly(false); }} data-nonprint className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                  Fullscreen
                </button>
                <button type="button" onClick={enterFullscreen} data-nonprint className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                  Fullscreen
                </button>
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

        {/* Hidden full-size certificate for PDF generation */}
        <div className="hidden">
          {renderCertificate()}
        </div>

        {/* Fullscreen overlay via portal */}
        {isFullscreen &&
          ReactDOM.createPortal(
            <div
              ref={fsHostRef}
              className={`fs-host ${docOnly ? "doc-only" : ""}`}
              role="dialog"
              aria-modal="true"
            >
              {!docOnly && (
                <header className="fs-header" data-nonprint>
                  <div>
                    <h1 className="text-2xl font-bold text-white">{LABELS[formType]}</h1>
                    <p className="text-gray-300">{SUBS[formType]}</p>
                  </div>
                  <div className="fs-actions flex space-x-2" data-nonprint>
                    <button type="button" onClick={() => window.print()} data-nonprint className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors">
                      Print Page
                    </button>
                    <button type="button" onClick={handleDownloadPDF} data-nonprint className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors">
                      Download PDF
                    </button>
                    <button type="button" onClick={() => setDocOnly(true)} data-nonprint className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                      Hide Header
                    </button>
                    <button type="button" onClick={exitFullscreen} data-nonprint className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors">
                      Close
                    </button>
                  </div>
                </header>
              )}

              {docOnly && (
                <button
                  type="button"
                  className="show-header-dot"
                  data-nonprint
                  aria-label="Show header"
                  onClick={() => setDocOnly(false)}
                />
              )}

              <div className="fs-doc">
                <div id="print-root">
                  <div className="page">
                    {renderCertificate()}
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        }

        {/* IMPORTANT: Keep fullscreen intact. The Hide Header toggle only affects fullscreen UI chrome. */}
        {isFullscreen && (
          <div className={`fullscreen-root ${docOnly ? "doc-only" : ""}`} role="dialog" aria-modal="true">
            {!docOnly && (
              <header className="fullscreen-header" data-nonprint>
                <div className="flex items-center justify-between p-4 bg-white border-b">
                  <div>
                    <h1 className="text-2xl font-bold text-black">{LABELS[formType]}</h1>
                    <p className="text-gray-600">{SUBS[formType]}</p>
                  </div>
                  <div className="actions flex space-x-2" data-nonprint>
                    <button type="button" onClick={() => window.print()} data-nonprint className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors">
                      Print Page
                    </button>
                    <button type="button" onClick={handleDownloadPDF} data-nonprint className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors">
                      Download PDF
                    </button>
                    <button type="button" onClick={() => setDocOnly(true)} data-nonprint className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                      Hide Header
                    </button>
                    <button type="button" onClick={() => setIsFullscreen(false)} data-nonprint className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors">
                      Close
                    </button>
                  </div>
                </div>
              </header>
            )}

            {docOnly && (
              <button
                type="button"
                className="show-header-dot"
                data-nonprint
                aria-label="Show header"
                onClick={() => setDocOnly(false)}
              />
            )}

            <div id="print-root">
              <div className="page">
                {renderCertificate()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}