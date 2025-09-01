import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { getSchemaForType, FormData } from '../lib/formSchemas';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { FileText, ExternalLink } from 'lucide-react';

export function useCertForm(type: string) {
  const schema = getSchemaForType(type);
  const signatureRef = useRef<SignatureCanvas>(null);
  const [signatureDataURL, setSignatureDataURL] = useState<string>('');
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: (type === 'estimate' || type === 'invoice' || type === 'contracts') ? {
      repName: '',
      repPhone: '',
      repEmail: '',
      context: '',
    } : (type === 'warranty') ? {
      customerName: '',
      installationDate: '',
      shingleColor: '',
      customerAddress: '',
      amountPaid: 0,
      signature: '',
    } : (type === 'receipt') ? {
      customerName: '',
      customerAddress: '',
      paymentAmount: 0,
      amountPaid: 0,
      signature: '',
    } : {
      homeownerName: '',
      insuranceCompany: '',
      address1: '',
      address2: '',
      contractDate: '',
      certificateDate: '',
      claimNumber: '',
      signature: '',
    }
  });

  // Load draft data on mount
  useEffect(() => {
    const draftData = localStorage.getItem(`phoenix-forms-draft-${type}`);
    if (draftData) {
      try {
        const parsedData = JSON.parse(draftData);
        methods.reset(parsedData);
        if (parsedData.signature) {
          setSignatureDataURL(parsedData.signature);
        }
      } catch (error) {
        console.error('Failed to load draft data:', error);
      }
    }
  }, [type, methods]);

  const handleSignatureEnd = () => {
    if (signatureRef.current) {
      const dataURL = signatureRef.current.toDataURL();
      setSignatureDataURL(dataURL);
      methods.setValue('signature', dataURL);
    }
  };

  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
      setSignatureDataURL('');
      methods.setValue('signature', '');
    }
  };

  const renderFormInputs = () => {
    if (type === 'estimate' || type === 'invoice' || type === 'contracts') {
      return (
        <div className="space-y-6">
          <div>
            <Label htmlFor="repName">Rep Name *</Label>
            <Input
              id="repName"
              {...methods.register('repName')}
              className="mt-1"
            />
            {methods.formState.errors.repName && (
              <p className="text-red-500 text-sm mt-1">
                {methods.formState.errors.repName.message}
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor="repPhone">Rep Phone *</Label>
            <Input
              id="repPhone"
              {...methods.register('repPhone')}
              className="mt-1"
            />
            {methods.formState.errors.repPhone && (
              <p className="text-red-500 text-sm mt-1">
                {methods.formState.errors.repPhone.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="repEmail">Rep Email *</Label>
            <Input
              id="repEmail"
              type="email"
              {...methods.register('repEmail')}
              className="mt-1"
            />
            {methods.formState.errors.repEmail && (
              <p className="text-red-500 text-sm mt-1">
                {methods.formState.errors.repEmail.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="context">Context *</Label>
            <textarea
              id="context"
              {...methods.register('context')}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder={type === 'estimate' ? "Enter context about the type of estimate being generated" : type === 'invoice' ? "Enter context about the type of invoice being generated" : type === 'contracts' ? "Enter context about the type of contract being generated" : "Enter context about the document being generated"}
            />
            {methods.formState.errors.context && (
              <p className="text-red-500 text-sm mt-1">
                {methods.formState.errors.context.message}
              </p>
            )}
          </div>
        </div>
      );
    }

    if (type === 'warranty') {
      return (
        <div className="space-y-6">
          <div>
            <Label htmlFor="customerName">Customer Name *</Label>
            <Input
              id="customerName"
              {...methods.register('customerName')}
              className="mt-1"
            />
            {methods.formState.errors.customerName && (
              <p className="text-red-500 text-sm mt-1">
                {methods.formState.errors.customerName.message}
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor="installationDate">Installation Date *</Label>
            <Input
              id="installationDate"
              type="date"
              {...methods.register('installationDate')}
              className="mt-1"
            />
            {methods.formState.errors.installationDate && (
              <p className="text-red-500 text-sm mt-1">
                {methods.formState.errors.installationDate.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="shingleColor">Shingle / Color *</Label>
            <Input
              id="shingleColor"
              {...methods.register('shingleColor')}
              className="mt-1"
            />
            {methods.formState.errors.shingleColor && (
              <p className="text-red-500 text-sm mt-1">
                {methods.formState.errors.shingleColor.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="customerAddress">Customer Address *</Label>
            <textarea
              id="customerAddress"
              {...methods.register('customerAddress')}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Enter complete customer address"
            />
            {methods.formState.errors.customerAddress && (
              <p className="text-red-500 text-sm mt-1">
                {methods.formState.errors.customerAddress.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="amountPaid">Amount Paid *</Label>
            <Input
              id="amountPaid"
              type="number"
              step="0.01"
              {...methods.register('amountPaid', { valueAsNumber: true })}
              className="mt-1"
            />
            {methods.formState.errors.amountPaid && (
              <p className="text-red-500 text-sm mt-1">
                {methods.formState.errors.amountPaid.message}
              </p>
            )}
          </div>

          {/* Signature Section */}
          <div>
            <Label>Signature *</Label>
            <div className="mt-2 border-2 border-gray-300 rounded-lg p-4">
              <SignatureCanvas
                ref={signatureRef}
                onEnd={handleSignatureEnd}
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: 'signature-canvas w-full border rounded'
                }}
              />
              <div className="flex justify-end mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={clearSignature}
                >
                  Clear Signature
                </Button>
              </div>
            </div>
            {methods.formState.errors.signature && (
              <p className="text-red-500 text-sm mt-1">
                {methods.formState.errors.signature.message}
              </p>
            )}
          </div>
        </div>
      );
    }
    
    if (type === 'receipt') {
      return (
        <div className="space-y-6">
          <div>
            <Label htmlFor="customerName">Customer Name *</Label>
            <Input
              id="customerName"
              {...methods.register('customerName')}
              className="mt-1"
            />
            {methods.formState.errors.customerName && (
              <p className="text-red-500 text-sm mt-1">
                {methods.formState.errors.customerName.message}
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor="customerAddress">Customer Address *</Label>
            <textarea
              id="customerAddress"
              {...methods.register('customerAddress')}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Enter complete customer address"
            />
            {methods.formState.errors.customerAddress && (
              <p className="text-red-500 text-sm mt-1">
                {methods.formState.errors.customerAddress.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="paymentAmount">Payment Amount *</Label>
            <Input
              id="paymentAmount"
              type="number"
              step="0.01"
              {...methods.register('paymentAmount', { valueAsNumber: true })}
              className="mt-1"
            />
            {methods.formState.errors.paymentAmount && (
              <p className="text-red-500 text-sm mt-1">
                {methods.formState.errors.paymentAmount.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="receiptDate">Date *</Label>
            <Input
              id="receiptDate"
              type="date"
              {...methods.register('receiptDate')}
              className="mt-1"
            />
            {methods.formState.errors.receiptDate && (
              <p className="text-red-500 text-sm mt-1">
                {methods.formState.errors.receiptDate.message}
              </p>
            )}
          </div>

          {/* Signature Section */}
          <div>
            <Label>Signature *</Label>
            <div className="mt-2 border-2 border-gray-300 rounded-lg p-4">
              <SignatureCanvas
                ref={signatureRef}
                onEnd={handleSignatureEnd}
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: 'signature-canvas w-full border rounded'
                }}
              />
              <div className="flex justify-end mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={clearSignature}
                >
                  Clear Signature
                </Button>
              </div>
            </div>
            {methods.formState.errors.signature && (
              <p className="text-red-500 text-sm mt-1">
                {methods.formState.errors.signature.message}
              </p>
            )}
          </div>
        </div>
      );
    }

    if (type === 'insurancePaymentAuth') {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const homeowner1SignatureRef = useRef<SignatureCanvas>(null);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const homeowner2SignatureRef = useRef<SignatureCanvas>(null);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const contractorSignatureRef = useRef<SignatureCanvas>(null);
      
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [homeowner1SignatureDataURL, setHomeowner1SignatureDataURL] = useState<string>('');
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [homeowner2SignatureDataURL, setHomeowner2SignatureDataURL] = useState<string>('');
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [contractorSignatureDataURL, setContractorSignatureDataURL] = useState<string>('');

      const handleHomeowner1SignatureEnd = () => {
        if (homeowner1SignatureRef.current) {
          const dataURL = homeowner1SignatureRef.current.toDataURL();
          setHomeowner1SignatureDataURL(dataURL);
          methods.setValue('homeowner1SignatureDataURL', dataURL);
        }
      };

      const handleHomeowner2SignatureEnd = () => {
        if (homeowner2SignatureRef.current) {
          const dataURL = homeowner2SignatureRef.current.toDataURL();
          setHomeowner2SignatureDataURL(dataURL);
          methods.setValue('homeowner2SignatureDataURL', dataURL);
        }
      };

      const handleContractorSignatureEnd = () => {
        if (contractorSignatureRef.current) {
          const dataURL = contractorSignatureRef.current.toDataURL();
          setContractorSignatureDataURL(dataURL);
          methods.setValue('contractorSignatureDataURL', dataURL);
        }
      };

      const clearHomeowner1Signature = () => {
        if (homeowner1SignatureRef.current) {
          homeowner1SignatureRef.current.clear();
          setHomeowner1SignatureDataURL('');
          methods.setValue('homeowner1SignatureDataURL', '');
        }
      };

      const clearHomeowner2Signature = () => {
        if (homeowner2SignatureRef.current) {
          homeowner2SignatureRef.current.clear();
          setHomeowner2SignatureDataURL('');
          methods.setValue('homeowner2SignatureDataURL', '');
        }
      };

      const clearContractorSignature = () => {
        if (contractorSignatureRef.current) {
          contractorSignatureRef.current.clear();
          setContractorSignatureDataURL('');
          methods.setValue('contractorSignatureDataURL', '');
        }
      };

      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="homeownerNames">Homeowner(s) Name(s) *</Label>
              <Input
                id="homeownerNames"
                {...methods.register('homeownerNames')}
                className="mt-1"
              />
              {methods.formState.errors.homeownerNames && (
                <p className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.homeownerNames.message}
                </p>
              )}
            </div>
            
            <div>
              <Label htmlFor="propertyAddress">Property Address *</Label>
              <Input
                id="propertyAddress"
                {...methods.register('propertyAddress')}
                className="mt-1"
              />
              {methods.formState.errors.propertyAddress && (
                <p className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.propertyAddress.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                {...methods.register('city')}
                className="mt-1"
              />
              {methods.formState.errors.city && (
                <p className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.city.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                {...methods.register('state')}
                className="mt-1"
              />
              {methods.formState.errors.state && (
                <p className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.state.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="zip">ZIP *</Label>
              <Input
                id="zip"
                {...methods.register('zip')}
                className="mt-1"
              />
              {methods.formState.errors.zip && (
                <p className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.zip.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                {...methods.register('phone')}
                className="mt-1"
              />
              {methods.formState.errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...methods.register('email')}
                className="mt-1"
              />
              {methods.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="insuranceCarrier">Insurance Carrier *</Label>
              <Input
                id="insuranceCarrier"
                {...methods.register('insuranceCarrier')}
                className="mt-1"
              />
              {methods.formState.errors.insuranceCarrier && (
                <p className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.insuranceCarrier.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="claimNumber">Claim Number *</Label>
              <Input
                id="claimNumber"
                {...methods.register('claimNumber')}
                className="mt-1"
              />
              {methods.formState.errors.claimNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.claimNumber.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="mortgageCompany">Mortgage Company/Lender *</Label>
              <Input
                id="mortgageCompany"
                {...methods.register('mortgageCompany')}
                className="mt-1"
              />
              {methods.formState.errors.mortgageCompany && (
                <p className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.mortgageCompany.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="loanNumber">Loan Number *</Label>
              <Input
                id="loanNumber"
                {...methods.register('loanNumber')}
                className="mt-1"
              />
              {methods.formState.errors.loanNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.loanNumber.message}
                </p>
              )}
            </div>
          </div>

          <h3 className="text-lg font-semibold mt-6">Contractor Representative</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="contractorRepName">Name *</Label>
              <Input
                id="contractorRepName"
                {...methods.register('contractorRepName')}
                className="mt-1"
              />
              {methods.formState.errors.contractorRepName && (
                <p className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.contractorRepName.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="contractorRepTitle">Title *</Label>
              <Input
                id="contractorRepTitle"
                {...methods.register('contractorRepTitle')}
                className="mt-1"
              />
              {methods.formState.errors.contractorRepTitle && (
                <p className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.contractorRepTitle.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="contractorDate">Date *</Label>
              <Input
                id="contractorDate"
                type="date"
                {...methods.register('contractorDate')}
                className="mt-1"
              />
              {methods.formState.errors.contractorDate && (
                <p className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.contractorDate.message}
                </p>
              )}
            </div>
          </div>

          <h3 className="text-lg font-semibold mt-6">Homeowner 1</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="homeowner1PrintedName">Printed Name *</Label>
              <Input
                id="homeowner1PrintedName"
                {...methods.register('homeowner1PrintedName')}
                className="mt-1"
              />
              {methods.formState.errors.homeowner1PrintedName && (
                <p className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.homeowner1PrintedName.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="homeowner1Date">Date *</Label>
              <Input
                id="homeowner1Date"
                type="date"
                {...methods.register('homeowner1Date')}
                className="mt-1"
              />
              {methods.formState.errors.homeowner1Date && (
                <p className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.homeowner1Date.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label>Homeowner 1 Signature *</Label>
            <div className="mt-2 border-2 border-gray-300 rounded-lg p-4">
              <SignatureCanvas
                ref={homeowner1SignatureRef}
                onEnd={handleHomeowner1SignatureEnd}
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: 'signature-canvas w-full border rounded'
                }}
              />
              <div className="flex justify-end mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={clearHomeowner1Signature}
                >
                  Clear Signature
                </Button>
              </div>
            </div>
            {methods.formState.errors.homeowner1SignatureDataURL && (
              <p className="text-red-500 text-sm mt-1">
                {methods.formState.errors.homeowner1SignatureDataURL.message}
              </p>
            )}
          </div>

          <h3 className="text-lg font-semibold mt-6">Homeowner 2 (Optional)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="homeowner2PrintedName">Printed Name</Label>
              <Input
                id="homeowner2PrintedName"
                {...methods.register('homeowner2PrintedName')}
                className="mt-1"
              />
              {methods.formState.errors.homeowner2PrintedName && (
                <p className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.homeowner2PrintedName.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="homeowner2Date">Date</Label>
              <Input
                id="homeowner2Date"
                type="date"
                {...methods.register('homeowner2Date')}
                className="mt-1"
              />
              {methods.formState.errors.homeowner2Date && (
                <p className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.homeowner2Date.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label>Homeowner 2 Signature (Optional)</Label>
            <div className="mt-2 border-2 border-gray-300 rounded-lg p-4">
              <SignatureCanvas
                ref={homeowner2SignatureRef}
                onEnd={handleHomeowner2SignatureEnd}
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: 'signature-canvas w-full border rounded'
                }}
              />
              <div className="flex justify-end mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={clearHomeowner2Signature}
                >
                  Clear Signature
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Label>Contractor Signature</Label>
            <div className="mt-2 border-2 border-gray-300 rounded-lg p-4">
              <SignatureCanvas
                ref={contractorSignatureRef}
                onEnd={handleContractorSignatureEnd}
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: 'signature-canvas w-full border rounded'
                }}
              />
              <div className="flex justify-end mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={clearContractorSignature}
                >
                  Clear Signature
                </Button>
              </div>
            </div>
          </div>

          {/* View ICPRA Document Button */}
          <div className="mt-8 pt-6 border-t border-gray-300">
            <div className="flex flex-col items-center space-y-4">
              <button
                type="button"
                onClick={() => setShowPdfViewer(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <FileText className="w-5 h-5" />
                <span>View ICPRA Document</span>
                <ExternalLink className="w-4 h-4" />
              </button>
              <p className="text-sm text-gray-600 text-center">
                Click to view the complete Insurance Claim Payment & Representation Authorization document
              </p>
            </div>
          </div>

          {/* PDF Viewer Modal */}
          {showPdfViewer && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="text-lg font-semibold">ICPRA Document</h3>
                  <button
                    onClick={() => setShowPdfViewer(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-4 h-[calc(90vh-120px)]">
                  <iframe
                    src="/docs/icpra.pdf"
                    className="w-full h-full border border-gray-300 rounded"
                    title="ICPRA Document"
                  />
                </div>
                <div className="flex justify-center p-4 border-t bg-gray-50">
                  <a
                    href="/docs/icpra.pdf"
                    download="ICPRA.pdf"
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="homeownerName">Homeowner Name *</Label>
            <Input
              id="homeownerName"
              {...methods.register('homeownerName')}
              className="mt-1"
            />
            {methods.formState.errors.homeownerName && (
              <p className="text-red-500 text-sm mt-1">
                {methods.formState.errors.homeownerName.message}
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor="insuranceCompany">Insurance Company *</Label>
            <Input
              id="insuranceCompany"
              {...methods.register('insuranceCompany')}
              className="mt-1"
            />
            {methods.formState.errors.insuranceCompany && (
              <p className="text-red-500 text-sm mt-1">
                {methods.formState.errors.insuranceCompany.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="address1">Street Address *</Label>
          <Input
            id="address1"
            {...methods.register('address1')}
            className="mt-1"
          />
          {methods.formState.errors.address1 && (
            <p className="text-red-500 text-sm mt-1">
              {methods.formState.errors.address1.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="address2">City, State, ZIP *</Label>
          <Input
            id="address2"
            {...methods.register('address2')}
            className="mt-1"
          />
          {methods.formState.errors.address2 && (
            <p className="text-red-500 text-sm mt-1">
              {methods.formState.errors.address2.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contractDate">Contract Date *</Label>
            <Input
              id="contractDate"
              type="date"
              {...methods.register('contractDate')}
              className="mt-1"
            />
            {methods.formState.errors.contractDate && (
              <p className="text-red-500 text-sm mt-1">
                {methods.formState.errors.contractDate.message}
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor="certificateDate">Certificate Date *</Label>
            <Input
              id="certificateDate"
              type="date"
              {...methods.register('certificateDate')}
              className="mt-1"
            />
            {methods.formState.errors.certificateDate && (
              <p className="text-red-500 text-sm mt-1">
                {methods.formState.errors.certificateDate.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="claimNumber">Claim Number *</Label>
          <Input
            id="claimNumber"
            {...methods.register('claimNumber')}
            className="mt-1"
          />
          {methods.formState.errors.claimNumber && (
            <p className="text-red-500 text-sm mt-1">
              {methods.formState.errors.claimNumber.message}
            </p>
          )}
        </div>

        {/* Conditional fields based on form type */}
        {type === 'depreciation' && (
          <div>
            <Label htmlFor="recoverableDep">Recoverable Depreciation *</Label>
            <Input
              id="recoverableDep"
              type="number"
              step="0.01"
              {...methods.register('recoverableDep', { valueAsNumber: true })}
              className="mt-1"
            />
            {methods.formState.errors.recoverableDep && (
              <p className="text-red-500 text-sm mt-1">
                {methods.formState.errors.recoverableDep.message}
              </p>
            )}
          </div>
        )}

        {type === 'job-cost-dep' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="totalJobCost">Total Job Cost *</Label>
              <Input
                id="totalJobCost"
                type="number"
                step="0.01"
                {...methods.register('totalJobCost', { valueAsNumber: true })}
                className="mt-1"
              />
              {methods.formState.errors.totalJobCost && (
                <p className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.totalJobCost.message}
                </p>
              )}
            </div>
            
            <div>
              <Label htmlFor="depreciationAmount">Depreciation Amount *</Label>
              <Input
                id="depreciationAmount"
                type="number"
                step="0.01"
                {...methods.register('depreciationAmount', { valueAsNumber: true })}
                className="mt-1"
              />
              {methods.formState.errors.depreciationAmount && (
                <p className="text-red-500 text-sm mt-1">
                  {methods.formState.errors.depreciationAmount.message}
                </p>
              )}
            </div>
          </div>
        )}

        {type === 'job-total-only' && (
          <div>
            <Label htmlFor="jobTotal">Job Total *</Label>
            <Input
              id="jobTotal"
              type="number"
              step="0.01"
              {...methods.register('jobTotal', { valueAsNumber: true })}
              className="mt-1"
            />
            {methods.formState.errors.jobTotal && (
              <p className="text-red-500 text-sm mt-1">
                {methods.formState.errors.jobTotal.message}
              </p>
            )}
          </div>
        )}

        {/* Signature Section - only for non-estimate forms */}
        {type !== 'estimate' && type !== 'invoice' && type !== 'contracts' && (
          <div>
            <Label>Signature *</Label>
            <div className="mt-2 border-2 border-gray-300 rounded-lg p-4">
              <SignatureCanvas
                ref={signatureRef}
                onEnd={handleSignatureEnd}
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: 'signature-canvas w-full border rounded'
                }}
              />
              <div className="flex justify-end mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={clearSignature}
                >
                  Clear Signature
                </Button>
              </div>
            </div>
            {methods.formState.errors.signature && (
              <p className="text-red-500 text-sm mt-1">
                {methods.formState.errors.signature.message}
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  const getSignatureDataURL = () => {
    return signatureDataURL;
  };

  return {
    ...methods,
    renderFormInputs,
    getSignatureDataURL,
    clearSignature,
  };
}