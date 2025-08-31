import { useParams, Link } from 'react-router-dom';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ArrowLeft, FileText, Eye } from 'lucide-react';
import { LABELS, SUBS } from '../lib/constants';
import { useCertForm } from '../hooks/useCertForm';
import { useFormContext } from '../contexts/FormContext';
import { toast } from 'sonner';

export default function FormPage() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { setFormData, setSignatureDataURL } = useFormContext();
  
  if (!type || !(type in LABELS)) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="bg-white border-red-500 border-2 max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-black mb-4">Form Not Found</h2>
            <p className="text-gray-600 mb-6">The requested form type does not exist.</p>
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

  const formType = type as keyof typeof LABELS;
  const form = useCertForm(type);

  const handlePreview = async () => {
    const isValid = await form.trigger();
    
    if (!isValid) {
      toast.error('Please fix the form errors before previewing');
      return;
    }

    const formData = form.getValues();
    const signatureDataURL = (type === 'estimate' || type === 'invoice') ? '' : form.getSignatureDataURL();
    
    if (!signatureDataURL && type !== 'estimate' && type !== 'invoice' && type !== 'contracts' && type !== 'receipt' && type !== 'insurancePaymentAuth') {
      toast.error('Please provide a signature before previewing');
      return;
    }

    // Store in context
    setFormData(formData);
    setSignatureDataURL(signatureDataURL);
    
    // Clear draft from localStorage since we're moving to preview
    localStorage.removeItem(`phoenix-forms-draft-${type}`);
    
    toast.success('Form validated successfully!');
    navigate(`../preview/${type}`);
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
          <Link to="/" className="inline-flex items-center text-red-500 hover:text-red-400 mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <FileText className="text-red-600 w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold text-white">
                {LABELS[formType]}
              </h1>
              <p className="text-gray-300 text-lg mt-2">
                {SUBS[formType]}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white border-red-500 border-2">
            <CardHeader>
              <CardTitle className="text-black text-2xl flex items-center gap-3">
                <FileText className="w-8 h-8" />
                Certificate Form
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => e.preventDefault()}>
                {form.renderFormInputs()}
              </form>
              
              <div className="flex justify-center mt-6">
                <Button
                  type="button"
                  onClick={handlePreview}
                  className="bg-red-600 hover:bg-red-700 text-white px-8"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Form
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}