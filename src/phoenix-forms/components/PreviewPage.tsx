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

  const formatMoney = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderWebpageContent = () => {
    if (type === 'depreciation') {
      const depData = formData as any;
      return (
        <div className="max-w-4xl mx-auto bg-white p-8 min-h-screen">
          <div className="text-center mb-8">
            <img 
              src="/phoenix-logo.svg"
              alt="Phoenix Logo" 
              className="mx-auto mb-6 w-32 h-auto"
            />
            <h1 className="text-3xl font-bold text-black mb-4">
              Certification of Work Completion
            </h1>
            <div className="text-lg text-gray-700">
              <p className="font-bold">PHOENIX ROOFING & CONSTRUCTION SOLUTIONS LLC</p>
              <p>10334 Vista Meadow Way, Lanham, MD 20706</p>
              <p>MHIC #05-164678</p>
            </div>
          </div>

          <div className="space-y-6 text-black">
            <p className="text-lg leading-relaxed">
              This is to certify that the work performed at the above-referenced property has been
              completed in accordance with generally accepted trade standards
              <strong> for {formatMoney(depData.recoverableDep)} in recoverable depreciation</strong>.
            </p>

            <p className="leading-relaxed">
              The contractor certifies that all work has been performed in a workmanlike manner and in
              compliance with applicable building codes and industry standards.
            </p>

            <p className="leading-relaxed">
              This certificate is issued in good faith and represents the contractor's professional
              assessment of the completed work. All materials used meet or exceed industry standards
              and manufacturer specifications.
            </p>

            <p className="leading-relaxed">
              The undersigned contractor hereby certifies that the above statements are true and
              accurate to the best of their knowledge and belief.
            </p>

            <hr className="my-8 border-black" />

            <div className="space-y-2">
              <p><strong>Homeowner:</strong> {depData.homeownerName}</p>
              <p><strong>Attn:</strong> {depData.insuranceCompany}</p>
              <p>{depData.address1}<br />{depData.address2}</p>
              <p><strong>Contract Date:</strong> {formatDate(depData.contractDate)}</p>
              <p><strong>Certificate Date:</strong> {formatDate(depData.certificateDate)}</p>
              <p><strong>Claim #:</strong> {depData.claimNumber}</p>
            </div>

            <div className="mt-8">
              <p className="mb-4">Contractor Signature:</p>
              {signatureDataURL && (
                <img 
                  src={signatureDataURL} 
                  alt="signature" 
                  className="h-16 max-w-xs"
                />
              )}
            </div>

            <p className="mt-16 text-center font-bold uppercase text-xl">
              JOB PHOTOS ATTACHED BELOW
            </p>
          </div>
        </div>
      );
    }

    if (type === 'job-cost-dep') {
      const jobData = formData as any;
      return (
        <div className="max-w-4xl mx-auto bg-white p-8 min-h-screen">
          <div className="text-center mb-8">
            <img 
              src="/phoenix-logo.svg"
              alt="Phoenix Logo" 
              className="mx-auto mb-6 w-32 h-auto"
            />
            <h1 className="text-3xl font-bold text-black mb-4">
              Certification of Work Completion
            </h1>
            <div className="text-lg text-gray-700">
              <p className="font-bold">PHOENIX ROOFING & CONSTRUCTION SOLUTIONS LLC</p>
              <p>10334 Vista Meadow Way, Lanham, MD 20706</p>
              <p>MHIC #05-164678</p>
            </div>
          </div>

          <div className="space-y-6 text-black">
            <p className="text-lg leading-relaxed">
              This is to certify that the work performed at the above-referenced property has been
              completed in accordance with generally accepted trade standards
              <strong> for a total job cost of {formatMoney(jobData.totalJobCost)} and recoverable depreciation of {formatMoney(jobData.depreciationAmount)}</strong>.
            </p>

            <p className="leading-relaxed">
              The contractor certifies that all work has been performed in a workmanlike manner and in
              compliance with applicable building codes and industry standards.
            </p>

            <p className="leading-relaxed">
              This certificate is issued in good faith and represents the contractor's professional
              assessment of the completed work. All materials used meet or exceed industry standards
              and manufacturer specifications.
            </p>

            <p className="leading-relaxed">
              The undersigned contractor hereby certifies that the above statements are true and
              accurate to the best of their knowledge and belief.
            </p>

            <hr className="my-8 border-black" />

            <div className="space-y-2">
              <p><strong>Homeowner:</strong> {jobData.homeownerName}</p>
              <p><strong>Attn:</strong> {jobData.insuranceCompany}</p>
              <p>{jobData.address1}<br />{jobData.address2}</p>
              <p><strong>Contract Date:</strong> {formatDate(jobData.contractDate)}</p>
              <p><strong>Certificate Date:</strong> {formatDate(jobData.certificateDate)}</p>
              <p><strong>Claim #:</strong> {jobData.claimNumber}</p>
            </div>

            <div className="mt-8">
              <p className="mb-4">Contractor Signature:</p>
              {signatureDataURL && (
                <img 
                  src={signatureDataURL} 
                  alt="signature" 
                  className="h-16 max-w-xs"
                />
              )}
            </div>

            <p className="mt-16 text-center font-bold uppercase text-xl">
              JOB PHOTOS ATTACHED BELOW
            </p>
          </div>
        </div>
      );
    }

    if (type === 'job-total-only') {
      const jobData = formData as any;
      return (
        <div className="max-w-4xl mx-auto bg-white p-8 min-h-screen">
          <div className="text-center mb-8">
            <img 
              src="/phoenix-logo.svg"
              alt="Phoenix Logo" 
              className="mx-auto mb-6 w-32 h-auto"
            />
            <h1 className="text-3xl font-bold text-black mb-4">
              Certification of Work Completion
            </h1>
            <div className="text-lg text-gray-700">
              <p className="font-bold">PHOENIX ROOFING & CONSTRUCTION SOLUTIONS LLC</p>
              <p>10334 Vista Meadow Way, Lanham, MD 20706</p>
              <p>MHIC #05-164678</p>
            </div>
          </div>

          <div className="space-y-6 text-black">
            <p className="text-lg leading-relaxed">
              This is to certify that the work performed at the above-referenced property has been
              completed in accordance with generally accepted trade standards
              <strong> for {formatMoney(jobData.jobTotal)} in total job cost</strong>.
            </p>

            <p className="leading-relaxed">
              The contractor certifies that all work has been performed in a workmanlike manner and in
              compliance with applicable building codes and industry standards.
            </p>

            <p className="leading-relaxed">
              This certificate is issued in good faith and represents the contractor's professional
              assessment of the completed work. All materials used meet or exceed industry standards
              and manufacturer specifications.
            </p>

            <p className="leading-relaxed">
              The undersigned contractor hereby certifies that the above statements are true and
              accurate to the best of their knowledge and belief.
            </p>

            <hr className="my-8 border-black" />

            <div className="space-y-2">
              <p><strong>Homeowner:</strong> {jobData.homeownerName}</p>
              <p><strong>Attn:</strong> {jobData.insuranceCompany}</p>
              <p>{jobData.address1}<br />{jobData.address2}</p>
              <p><strong>Contract Date:</strong> {formatDate(jobData.contractDate)}</p>
              <p><strong>Certificate Date:</strong> {formatDate(jobData.certificateDate)}</p>
              <p><strong>Claim #:</strong> {jobData.claimNumber}</p>
            </div>

            <div className="mt-8">
              <p className="mb-4">Contractor Signature:</p>
              {signatureDataURL && (
                <img 
                  src={signatureDataURL} 
                  alt="signature" 
                  className="h-16 max-w-xs"
                />
              )}
            </div>

            <p className="mt-16 text-center font-bold uppercase text-xl">
              JOB PHOTOS ATTACHED BELOW
            </p>
          </div>
        </div>
      );
    }

    if (type === 'standard') {
      const stdData = formData as any;
      return (
        <div className="max-w-4xl mx-auto bg-white p-8 min-h-screen">
          <div className="text-center mb-8">
            <img 
              src="/phoenix-logo.svg"
              alt="Phoenix Logo" 
              className="mx-auto mb-6 w-32 h-auto"
            />
            <h1 className="text-3xl font-bold text-black mb-4">
              Certification of Work Completion
            </h1>
            <div className="text-lg text-gray-700">
              <p className="font-bold">PHOENIX ROOFING & CONSTRUCTION SOLUTIONS LLC</p>
              <p>10334 Vista Meadow Way, Lanham, MD 20706</p>
              <p>MHIC #05-164678</p>
            </div>
          </div>

          <div className="space-y-6 text-black">
            <p className="text-lg leading-relaxed">
              This is to certify that the work performed at the above-referenced property has been
              completed in accordance with generally accepted trade standards.
            </p>

            <p className="leading-relaxed">
              The contractor certifies that all work has been performed in a workmanlike manner and in
              compliance with applicable building codes and industry standards.
            </p>

            <p className="leading-relaxed">
              This certificate is issued in good faith and represents the contractor's professional
              assessment of the completed work. All materials used meet or exceed industry standards
              and manufacturer specifications.
            </p>

            <p className="leading-relaxed">
              The undersigned contractor hereby certifies that the above statements are true and
              accurate to the best of their knowledge and belief.
            </p>

            <hr className="my-8 border-black" />

            <div className="space-y-2">
              <p><strong>Homeowner:</strong> {stdData.homeownerName}</p>
              <p><strong>Attn:</strong> {stdData.insuranceCompany}</p>
              <p>{stdData.address1}<br />{stdData.address2}</p>
              <p><strong>Contract Date:</strong> {formatDate(stdData.contractDate)}</p>
              <p><strong>Certificate Date:</strong> {formatDate(stdData.certificateDate)}</p>
              <p><strong>Claim #:</strong> {stdData.claimNumber}</p>
            </div>

            <div className="mt-8">
              <p className="mb-4">Contractor Signature:</p>
              {signatureDataURL && (
                <img 
                  src={signatureDataURL} 
                  alt="signature" 
                  className="h-16 max-w-xs"
                />
              )}
            </div>

            <p className="mt-16 text-center font-bold uppercase text-xl">
              JOB PHOTOS ATTACHED BELOW
            </p>
          </div>
        </div>
      );
    }

    if (type === 'warranty') {
      const warData = formData as any;
      return (
        <div className="max-w-4xl mx-auto bg-white p-8 min-h-screen">
          <div className="text-center mb-8">
            <img 
              src="/phoenix-logo.svg"
              alt="Phoenix Logo" 
              className="mx-auto mb-6 w-32 h-auto"
            />
            <h1 className="text-3xl font-bold text-black mb-4">
              ROOFING WARRANTY CERTIFICATE
            </h1>
            <div className="text-lg text-gray-700">
              <p className="font-bold">PHOENIX ROOFING & CONSTRUCTION SOLUTIONS LLC</p>
              <p>10334 Vista Meadow Way, Lanham, MD 20706</p>
              <p>MHIC License #: 05-164678</p>
            </div>
          </div>

          <div className="space-y-8 text-black">
            <div>
              <h2 className="text-xl font-bold mb-4">Customer & Installation Information</h2>
              <div className="space-y-2">
                <p><strong>CUSTOMER NAME:</strong> {warData.customerName}</p>
                <p><strong>INSTALLATION DATE:</strong> {formatDate(warData.installationDate)}</p>
                <p><strong>SHINGLE / COLOR:</strong> {warData.shingleColor}</p>
                <p><strong>CUSTOMER ADDRESS:</strong> {warData.customerAddress}</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">LIMITED 5-YEAR WORKMANSHIP WARRANTY</h2>
              <div className="space-y-4 text-justify">
                <p>
                  PHOENIX ROOFING & CONSTRUCTION SOLUTIONS LLC ("Contractor") warrants to the original property owner ("Owner") that the roofing installation described herein will be free from workmanship defects that result in leakage or loss of watertight integrity for a period of five (5) years from the installation date.
                </p>
                <p>
                  The roofing system installed consists of Owens Corning Duration® asphalt shingles in the color Onyx Black. These shingles carry a separate 35-year limited material warranty provided directly by Owens Corning; all terms and conditions of that manufacturer warranty apply.
                </p>
                <p>
                  Should a defect attributable solely to workmanship be discovered within the five-year period, the Owner must notify the Contractor in writing within thirty (30) days of discovery. Upon verification, the Contractor will repair or correct the defect at no cost to the Owner. This workmanship warranty covers labor only and excludes material failures, acts of God, misuse, neglect, structural movement, or alterations performed by others.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Payment Acknowledgment</h2>
              <div className="space-y-2">
                <p><strong>Receipt of Purchase:</strong> The Owner acknowledges full payment for the roofing services described in this certificate.</p>
                <p><strong>Amount Paid:</strong> {formatMoney(warData.amountPaid)}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Authorization</h2>
              <p className="mb-4"><strong>Contractor Signature:</strong></p>
              {signatureDataURL && (
                <img 
                  src={signatureDataURL} 
                  alt="signature" 
                  className="h-16 max-w-xs mb-4"
                />
              )}
              <div className="border-t border-black w-80 pt-2">
                <p className="text-sm text-center">
                  Authorized Representative, Phoenix Roofing & Construction Solutions LLC
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (type === 'receipt') {
      const recData = formData as any;
      return (
        <div className="max-w-4xl mx-auto bg-white p-8 min-h-screen">
          <div className="text-center mb-8">
            <img 
              src="/phoenix-logo.svg"
              alt="Phoenix Logo" 
              className="mx-auto mb-6 w-32 h-auto"
            />
            <h1 className="text-3xl font-bold text-black mb-4">
              RECEIPT
            </h1>
            <div className="text-lg text-gray-700">
              <p className="font-bold">PHOENIX ROOFING & CONSTRUCTION SOLUTIONS LLC</p>
              <p>10334 Vista Meadow Way, Lanham, MD 20706</p>
              <p>MHIC License #: 05-164678</p>
            </div>
          </div>

          <div className="space-y-8 text-black">
            <div>
              <h2 className="text-xl font-bold mb-4">Payment Details</h2>
              <div className="space-y-2">
                <p><strong>CUSTOMER NAME:</strong> {recData.customerName}</p>
                <p><strong>CUSTOMER ADDRESS:</strong> {recData.customerAddress}</p>
                <p><strong>PAYMENT AMOUNT:</strong> {formatMoney(recData.paymentAmount)}</p>
                <p><strong>DATE:</strong> {formatDate(recData.receiptDate)}</p>
              </div>
            </div>

            <div>
              <p className="text-justify">
                This receipt acknowledges the payment received for services rendered by PHOENIX ROOFING & CONSTRUCTION SOLUTIONS LLC.
                All services have been provided in accordance with the agreed-upon terms and conditions.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Acknowledgment</h2>
              <p className="mb-4"><strong>Received By:</strong></p>
              {signatureDataURL && (
                <img 
                  src={signatureDataURL} 
                  alt="signature" 
                  className="h-16 max-w-xs mb-4"
                />
              )}
              <div className="border-t border-black w-80 pt-2">
                <p className="text-sm text-center">
                  Authorized Signature, Phoenix Roofing & Construction Solutions LLC
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (type === 'estimate' || type === 'invoice' || type === 'contracts') {
      const docData = formData as any;
      const docType = type === 'estimate' ? 'Estimate' : type === 'invoice' ? 'Invoice' : 'Contract';
      
      return (
        <div className="max-w-4xl mx-auto bg-white p-8 min-h-screen">
          <div className="text-center mb-8">
            <img 
              src="/phoenix-logo.svg"
              alt="Phoenix Logo" 
              className="mx-auto mb-6 w-32 h-auto"
            />
            <h1 className="text-3xl font-bold text-black mb-4">
              PHOENIX {docType.toUpperCase()} FORMAT SPECIFICATION
            </h1>
            <div className="text-lg text-gray-700">
              <p className="font-bold">PHOENIX ROOFING & CONSTRUCTION SOLUTIONS LLC</p>
              <p>10334 Vista Meadow Way, Lanham, MD 20706</p>
              <p>MHIC #05-164678 | Rep: {docData.repName} | Phone: {docData.repPhone} | Email: {docData.repEmail}</p>
            </div>
          </div>

          <div className="space-y-8 text-black">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Context</h2>
              <p className="text-lg">{docData.context}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Document Requirements</h2>
              <p className="mb-4">
                Generate a detailed construction {type} using Xactimate market pricing.
                Apply a 10% overhead and profit margin to the total.
                Use either the insurance scope of work and/or the uploaded measurements as the source data.
                The {type} must reflect the exact dollar amount, with no rounding.
                All line items should follow Xactimate formatting and structure.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3">1. Header (Top of Each Page)</h3>
              <div className="bg-gray-50 p-4 rounded mb-4">
                <p className="font-bold">PHOENIX ROOFING & CONSTRUCTION SOLUTIONS LLC</p>
                <p>10334 Vista Meadow Way, Lanham, MD 20706</p>
                <p>MHIC #05-164678 | Rep Name: {docData.repName} | Rep Phone: {docData.repPhone} | Rep Email: {docData.repEmail}</p>
              </div>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Align all text flush-left with the line item chart</li>
                <li>Font: Arial or Helvetica, 10–12 pt</li>
                <li>Company name must be bold</li>
                <li>No colors, logos, or images</li>
                <li>One line per field, single spaced</li>
                <li>Repeat this header on every page</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3">2. {docType} Information Block</h3>
              <div className="bg-gray-50 p-4 rounded mb-4">
                <p>{docType} #: [Alphanumeric ID]</p>
                <p>Customer: [Full Name]</p>
                <p>Property: [Full Address]</p>
                <p>Claim #: [Insurance Claim #]</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3">3. Line-Item Table (WITH GRID LINES)</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold mb-2">Columns:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>#: Numeric, left-aligned</li>
                    <li>Description: Multiline, left-aligned (text wraps within cell)</li>
                    <li>Qty: Numeric with units (e.g., SQ, LF, EA), right-aligned</li>
                    <li>Unit Price: Dollar amount, right-aligned</li>
                    <li>Total: Dollar amount, right-aligned</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Formatting Rules:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Grid lines must be visible around every cell (full box borders)</li>
                    <li>No text overflow or bleeding across cells</li>
                    <li>All content must stay within its own cell</li>
                    <li>The entire table must be fully left-aligned</li>
                    <li>Font: Arial or Helvetica, 9–10 pt</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3">4. Total Summary Block</h3>
              <div className="bg-gray-50 p-4 rounded mb-4">
                <p><strong>Total {docType}: $XX,XXX.XX</strong></p>
                <p>{docType} Date: [Month DD, YYYY]</p>
                <p>Price List: [Region Code]</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3">FINAL PDF REQUIREMENTS</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Fonts: Arial or Helvetica only (embedded)</li>
                <li>Alignment: Header, table, and all body content must be fully left-aligned</li>
                <li>Bolding: Company name and Total {docType} line must be bold</li>
                <li>Table: Must use full grid lines</li>
                <li>Content: Prevent content overflow in table cells</li>
                <li>Other: No logos, page numbers, bullets, special characters, or color</li>
                <li>Filename Format: [CustomerLastName]_[Claim#]_PRCS_{docType}_[YYYY-MM-DD].pdf</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    if (type === 'insurancePaymentAuth') {
      const authData = formData as any;
      return (
        <div className="max-w-4xl mx-auto bg-white p-8 min-h-screen">
          <div className="text-center mb-8">
            <img 
              src="/phoenix-logo.svg"
              alt="Phoenix Logo" 
              className="mx-auto mb-6 w-32 h-auto"
            />
            <h1 className="text-2xl font-bold text-black mb-4">
              Insurance Claim Payment & Representation Authorization
            </h1>
            <div className="text-lg text-gray-700">
              <p className="font-bold">Phoenix Restorations and Construction Solutions LLC</p>
              <p>10334 Vista Meadow Way, Lanham, MD 20706</p>
              <p>Phone: (301) 450-9487 | MHIC #164678</p>
            </div>
          </div>

          <hr className="my-8 border-black" />

          <div className="space-y-8 text-black">
            <div>
              <h2 className="text-xl font-bold mb-4">1. PARTIES</h2>
              <div className="space-y-2">
                <p><strong>Homeowner(s):</strong> {authData.homeownerNames}</p>
                <p><strong>Property Address:</strong> {authData.propertyAddress}</p>
                <p><strong>City, State, ZIP:</strong> {authData.city}, {authData.state} {authData.zip}</p>
                <p><strong>Phone:</strong> {authData.phone} | <strong>Email:</strong> {authData.email}</p>
                <p><strong>Insurance Carrier:</strong> {authData.insuranceCarrier}</p>
                <p><strong>Claim Number:</strong> {authData.claimNumber}</p>
                <p><strong>Mortgage Company/Lender:</strong> {authData.mortgageCompany}</p>
                <p><strong>Loan Number:</strong> {authData.loanNumber}</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">2. PURPOSE</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Receive direct check payments from the insurance company and/or mortgage company for all claim-related proceeds.</li>
                <li>Communicate directly with all parties (insurance, mortgage, legal, engineering) regarding the claim.</li>
                <li>Act as the Homeowner's representative for all payment handling and claim communications.</li>
                <li>Ensure compliance with Maryland law, MHIC regulations, and mortgage loss payee provisions.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">3. DIRECTION OF PAYMENT – INSURANCE COMPANY</h2>
              <p className="mb-4">Homeowner(s) authorize and instruct their insurance carrier to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Issue all claim-related payments by check payable to Phoenix Restorations and Construction Solutions LLC and, if required by policy, the Mortgage Company as a co-payee.</li>
                <li>Send all checks via trackable delivery service (FedEx, UPS, USPS Priority/Express) with tracking numbers provided to both Homeowner and Contractor.</li>
                <li>Recognize Contractor as an authorized contact for payment status, claim documents, and tracking details.</li>
                <li>Include Contractor's name as a payee on all supplemental or depreciation checks.</li>
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">SIGNATURES</h2>
              <div className="space-y-6">
                <div>
                  <p className="font-semibold mb-2">Contractor Representative:</p>
                  <p><strong>Name:</strong> {authData.contractorRepName} | <strong>Title:</strong> {authData.contractorRepTitle}</p>
                  <p><strong>Date:</strong> {authData.contractorDate && formatDate(authData.contractorDate)}</p>
                  {authData.contractorSignatureDataURL && (
                    <img 
                      src={authData.contractorSignatureDataURL} 
                      alt="contractor signature" 
                      className="h-16 max-w-xs mt-2"
                    />
                  )}
                </div>

                <div>
                  <p className="font-semibold mb-2">Homeowner 1:</p>
                  <p><strong>Printed Name:</strong> {authData.homeowner1PrintedName}</p>
                  <p><strong>Date:</strong> {authData.homeowner1Date && formatDate(authData.homeowner1Date)}</p>
                  {authData.homeowner1SignatureDataURL && (
                    <img 
                      src={authData.homeowner1SignatureDataURL} 
                      alt="homeowner 1 signature" 
                      className="h-16 max-w-xs mt-2"
                    />
                  )}
                </div>

                {authData.homeowner2PrintedName && (
                  <div>
                    <p className="font-semibold mb-2">Homeowner 2:</p>
                    <p><strong>Printed Name:</strong> {authData.homeowner2PrintedName}</p>
                    <p><strong>Date:</strong> {authData.homeowner2Date && formatDate(authData.homeowner2Date)}</p>
                    {authData.homeowner2SignatureDataURL && (
                      <img 
                        src={authData.homeowner2SignatureDataURL} 
                        alt="homeowner 2 signature" 
                        className="h-16 max-w-xs mt-2"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default fallback for other form types
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 min-h-screen">
        <div className="text-center mb-8">
          <img 
            src="/phoenix-logo.svg"
            alt="Phoenix Logo" 
            className="mx-auto mb-6 w-32 h-auto"
          />
          <h1 className="text-3xl font-bold text-black mb-4">
            {LABELS[formType]}
          </h1>
          <div className="text-lg text-gray-700">
            <p className="font-bold">PHOENIX ROOFING & CONSTRUCTION SOLUTIONS LLC</p>
            <p>10334 Vista Meadow Way, Lanham, MD 20706</p>
            <p>MHIC #05-164678</p>
          </div>
        </div>
        <div className="text-black">
          <p>Form data preview for {LABELS[formType]} will be displayed here.</p>
        </div>
      </div>
    );
  };

  const enterFullscreen = async () => {
    if (printRootRef.current) {
      try {
        await printRootRef.current.requestFullscreen();
      } catch (error) {
        console.error('Failed to enter fullscreen:', error);
      }
    }
  };

  const onCloseFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  const handlePrint = () => {
    window.print();
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
        {isFullscreen && (
          <div className={`fs-host ${docOnly ? "doc-only" : ""}`} role="dialog" aria-modal="true">
            {!docOnly && (
              <header className="fs-header" data-nonprint>
                <div>
                  <h1 className="text-xl font-bold">{LABELS[formType]}</h1>
                  <p className="text-sm text-gray-400">{SUBS[formType]}</p>
                </div>
                <div className="fs-actions" data-nonprint>
                  <button type="button" onClick={handlePrint} data-nonprint className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Print Page</button>
                  <button type="button" onClick={handleDownloadPDF} data-nonprint className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Download PDF</button>
                  <button type="button" onClick={() => setDocOnly(true)} data-nonprint className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Hide Header</button>
                  <button type="button" onClick={onCloseFullscreen} data-nonprint className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Close</button>
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
              <div id="print-root" ref={printRootRef}>
                <div className="page">
                  {renderCertificate()}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div 
          id="print-root" 
          ref={printRootRef}
          className={`${isDocumentOnlyMode ? 'document-only-mode' : 'hidden'} ${isFullscreen ? 'is-fullscreen-active' : ''}`}
        >
          <div className="page">
            {isDocumentOnlyMode ? renderWebpageContent() : renderCertificate()}
          </div>
        </div>
      </div>
    </div>
  );
}