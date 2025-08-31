import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { LABELS, SUBS } from '../lib/constants';
import { useFormContext } from '../contexts/FormContext';
import { toast } from 'sonner';

interface PreviewPageProps {
  onNavigateToMainAppPage?: (page: string) => void;
}

export default function PreviewPage({ onNavigateToMainAppPage }: PreviewPageProps) {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { formData, signatureDataURL, clearFormData } = useFormContext();

  // Redirect if no form data
  useEffect(() => {
    if (!formData || (type !== 'estimate' && type !== 'invoice' && type !== 'contracts' && type !== 'insurancePaymentAuth' && !signatureDataURL)) {
      toast.error('No form data found. Please fill out the form first.');
      window.history.back();
    }
  }, [formData, signatureDataURL, navigate]);

  if (!type || !(type in LABELS)) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="bg-white border-red-500 border-2 max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-black mb-4">Preview Not Found</h2>
            <p className="text-gray-600 mb-6">The requested form preview does not exist.</p>
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

  const renderContent = () => {
    if (type === 'depreciation') {
      const depData = formData as any;
      return (
        <div className="page">
          <img 
            src="/phoenix-logo.svg"
            alt="Phoenix Logo" 
            style={{ 
              display: 'block',
              margin: '0 auto 24px auto',
              width: '120px',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
          
          <h2 className="text-center text-xl font-bold my-4" style={{ fontSize: '20px', textAlign: 'center', fontWeight: 'bold', margin: '16px 0' }}>
            Certification of Work Completion
          </h2>

          <p style={{ marginBottom: '16px' }}>
            This is to certify that the work performed at the above-referenced property has been
            completed in accordance with generally accepted trade standards
            <strong> for {formatMoney(depData.recoverableDep)} in recoverable depreciation</strong>.
          </p>

          <p style={{ marginBottom: '16px' }}>
            The contractor certifies that all work has been performed in a workmanlike manner and in
            compliance with applicable building codes and industry standards.
          </p>

          <p style={{ marginBottom: '16px' }}>
            This certificate is issued in good faith and represents the contractor's professional
            assessment of the completed work. All materials used meet or exceed industry standards
            and manufacturer specifications.
          </p>

          <p style={{ marginBottom: '16px' }}>
            The undersigned contractor hereby certifies that the above statements are true and
            accurate to the best of their knowledge and belief.
          </p>

          <hr className="my-4" style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #000' }} />

          <p style={{ marginBottom: '8px' }}>
            <strong>Homeowner:</strong> {depData.homeownerName}
          </p>
          <p style={{ marginBottom: '8px' }}>
            <strong>Attn:</strong> {depData.insuranceCompany}
          </p>
          <p style={{ marginBottom: '8px' }}>
            {depData.address1}<br />{depData.address2}
          </p>
          <p style={{ marginBottom: '8px' }}>
            <strong>Contract Date:</strong> {formatDate(depData.contractDate)}
          </p>
          <p style={{ marginBottom: '8px' }}>
            <strong>Certificate Date:</strong> {formatDate(depData.certificateDate)}
          </p>
          <p style={{ marginBottom: '8px' }}>
            <strong>Claim #:</strong> {depData.claimNumber}
          </p>

          <p className="mt-8" style={{ marginTop: '32px', marginBottom: '8px' }}>
            Contractor Signature:
          </p>
          {signatureDataURL && (
            <img 
              src={signatureDataURL} 
              alt="signature" 
              className="h-16" 
              style={{ height: '64px', maxWidth: '300px', objectFit: 'contain' }}
            />
          )}
          
          <p className="mt-16 text-center font-bold uppercase">
            JOB PHOTOS ATTACHED BELOW
          </p>
        </div>
      );
    }

    if (type === 'job-cost-dep') {
      const jobData = formData as any;
      return (
        <div className="page">
          <img 
            src="/phoenix-logo.svg"
            alt="Phoenix Logo" 
            style={{ 
              display: 'block',
              margin: '0 auto 24px auto',
              width: '120px',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
          
          <h2 className="text-center text-xl font-bold my-4" style={{ fontSize: '20px', textAlign: 'center', fontWeight: 'bold', margin: '16px 0' }}>
            Certification of Work Completion
          </h2>

          <p style={{ marginBottom: '16px' }}>
            This is to certify that the work performed at the above-referenced property has been
            completed in accordance with generally accepted trade standards
            <strong> for a total job cost of {formatMoney(jobData.totalJobCost)} and recoverable depreciation of {formatMoney(jobData.depreciationAmount)}</strong>.
          </p>

          <p style={{ marginBottom: '16px' }}>
            The contractor certifies that all work has been performed in a workmanlike manner and in
            compliance with applicable building codes and industry standards.
          </p>

          <p style={{ marginBottom: '16px' }}>
            This certificate is issued in good faith and represents the contractor's professional
            assessment of the completed work. All materials used meet or exceed industry standards
            and manufacturer specifications.
          </p>

          <p style={{ marginBottom: '16px' }}>
            The undersigned contractor hereby certifies that the above statements are true and
            accurate to the best of their knowledge and belief.
          </p>

          <hr className="my-4" style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #000' }} />

          <p style={{ marginBottom: '8px' }}>
            <strong>Homeowner:</strong> {jobData.homeownerName}
          </p>
          <p style={{ marginBottom: '8px' }}>
            <strong>Attn:</strong> {jobData.insuranceCompany}
          </p>
          <p style={{ marginBottom: '8px' }}>
            {jobData.address1}<br />{jobData.address2}
          </p>
          <p style={{ marginBottom: '8px' }}>
            <strong>Contract Date:</strong> {formatDate(jobData.contractDate)}
          </p>
          <p style={{ marginBottom: '8px' }}>
            <strong>Certificate Date:</strong> {formatDate(jobData.certificateDate)}
          </p>
          <p style={{ marginBottom: '8px' }}>
            <strong>Claim #:</strong> {jobData.claimNumber}
          </p>

          <p className="mt-8" style={{ marginTop: '32px', marginBottom: '8px' }}>
            Contractor Signature:
          </p>
          {signatureDataURL && (
            <img 
              src={signatureDataURL} 
              alt="signature" 
              className="h-16" 
              style={{ height: '64px', maxWidth: '300px', objectFit: 'contain' }}
            />
          )}
          
          <p className="mt-16 text-center font-bold uppercase">
            JOB PHOTOS ATTACHED BELOW
          </p>
        </div>
      );
    }

    if (type === 'job-total-only') {
      const jobData = formData as any;
      return (
        <div className="page">
          <img 
            src="/phoenix-logo.svg"
            alt="Phoenix Logo" 
            style={{ 
              display: 'block',
              margin: '0 auto 24px auto',
              width: '120px',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
          
          <h2 className="text-center text-xl font-bold my-4" style={{ fontSize: '20px', textAlign: 'center', fontWeight: 'bold', margin: '16px 0' }}>
            Certification of Work Completion
          </h2>

          <p style={{ marginBottom: '16px' }}>
            This is to certify that the work performed at the above-referenced property has been
            completed in accordance with generally accepted trade standards
            <strong> for {formatMoney(jobData.jobTotal)} in total job cost</strong>.
          </p>

          <p style={{ marginBottom: '16px' }}>
            The contractor certifies that all work has been performed in a workmanlike manner and in
            compliance with applicable building codes and industry standards.
          </p>

          <p style={{ marginBottom: '16px' }}>
            This certificate is issued in good faith and represents the contractor's professional
            assessment of the completed work. All materials used meet or exceed industry standards
            and manufacturer specifications.
          </p>

          <p style={{ marginBottom: '16px' }}>
            The undersigned contractor hereby certifies that the above statements are true and
            accurate to the best of their knowledge and belief.
          </p>

          <hr className="my-4" style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #000' }} />

          <p style={{ marginBottom: '8px' }}>
            <strong>Homeowner:</strong> {jobData.homeownerName}
          </p>
          <p style={{ marginBottom: '8px' }}>
            <strong>Attn:</strong> {jobData.insuranceCompany}
          </p>
          <p style={{ marginBottom: '8px' }}>
            {jobData.address1}<br />{jobData.address2}
          </p>
          <p style={{ marginBottom: '8px' }}>
            <strong>Contract Date:</strong> {formatDate(jobData.contractDate)}
          </p>
          <p style={{ marginBottom: '8px' }}>
            <strong>Certificate Date:</strong> {formatDate(jobData.certificateDate)}
          </p>
          <p style={{ marginBottom: '8px' }}>
            <strong>Claim #:</strong> {jobData.claimNumber}
          </p>

          <p className="mt-8" style={{ marginTop: '32px', marginBottom: '8px' }}>
            Contractor Signature:
          </p>
          {signatureDataURL && (
            <img 
              src={signatureDataURL} 
              alt="signature" 
              className="h-16" 
              style={{ height: '64px', maxWidth: '300px', objectFit: 'contain' }}
            />
          )}
          
          <p className="mt-16 text-center font-bold uppercase">
            JOB PHOTOS ATTACHED BELOW
          </p>
        </div>
      );
    }

    if (type === 'standard') {
      const stdData = formData as any;
      return (
        <div className="page">
          <img 
            src="/phoenix-logo.svg"
            alt="Phoenix Logo" 
            style={{ 
              display: 'block',
              margin: '0 auto 24px auto',
              width: '120px',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
          
          <h2 className="text-center text-xl font-bold my-4" style={{ fontSize: '20px', textAlign: 'center', fontWeight: 'bold', margin: '16px 0' }}>
            Certification of Work Completion
          </h2>

          <p style={{ marginBottom: '16px' }}>
            This is to certify that the work performed at the above-referenced property has been
            completed in accordance with generally accepted trade standards.
          </p>

          <p style={{ marginBottom: '16px' }}>
            The contractor certifies that all work has been performed in a workmanlike manner and in
            compliance with applicable building codes and industry standards.
          </p>

          <p style={{ marginBottom: '16px' }}>
            This certificate is issued in good faith and represents the contractor's professional
            assessment of the completed work. All materials used meet or exceed industry standards
            and manufacturer specifications.
          </p>

          <p style={{ marginBottom: '16px' }}>
            The undersigned contractor hereby certifies that the above statements are true and
            accurate to the best of their knowledge and belief.
          </p>

          <hr className="my-4" style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #000' }} />

          <p style={{ marginBottom: '8px' }}>
            <strong>Homeowner:</strong> {stdData.homeownerName}
          </p>
          <p style={{ marginBottom: '8px' }}>
            <strong>Attn:</strong> {stdData.insuranceCompany}
          </p>
          <p style={{ marginBottom: '8px' }}>
            {stdData.address1}<br />{stdData.address2}
          </p>
          <p style={{ marginBottom: '8px' }}>
            <strong>Contract Date:</strong> {formatDate(stdData.contractDate)}
          </p>
          <p style={{ marginBottom: '8px' }}>
            <strong>Certificate Date:</strong> {formatDate(stdData.certificateDate)}
          </p>
          <p style={{ marginBottom: '8px' }}>
            <strong>Claim #:</strong> {stdData.claimNumber}
          </p>

          <p className="mt-8" style={{ marginTop: '32px', marginBottom: '8px' }}>
            Contractor Signature:
          </p>
          {signatureDataURL && (
            <img 
              src={signatureDataURL} 
              alt="signature" 
              className="h-16" 
              style={{ height: '64px', maxWidth: '300px', objectFit: 'contain' }}
            />
          )}
          
          <p className="mt-16 text-center font-bold uppercase">
            JOB PHOTOS ATTACHED BELOW
          </p>
        </div>
      );
    }

    if (type === 'warranty') {
      const warData = formData as any;
      return (
        <div className="page">
          <img 
            src="/phoenix-logo.svg"
            alt="Phoenix Logo" 
            style={{ 
              display: 'block',
              margin: '0 auto 24px auto',
              width: '120px',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
          
          <h1 className="text-center text-xl font-bold mb-4" style={{ fontSize: '24px', textAlign: 'center', fontWeight: 'bold', marginBottom: '16px' }}>
            ROOFING WARRANTY CERTIFICATE
          </h1>
          <div className="text-center mb-8" style={{ textAlign: 'center', marginBottom: '16px' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>PHOENIX ROOFING & CONSTRUCTION SOLUTIONS LLC</p>
            <p style={{ marginBottom: '4px' }}>10334 Vista Meadow Way</p>
            <p style={{ marginBottom: '4px' }}>Lanham, MD 20706</p>
            <p style={{ marginBottom: '4px' }}>MHIC License #: 05-164678</p>
          </div>

          {/* Customer & Installation Info Section */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
              Customer & Installation Information
            </h2>
            <div style={{ marginBottom: '12px' }}>
              <strong>CUSTOMER NAME:</strong> {warData.customerName}
            </div>
            <div style={{ marginBottom: '12px' }}>
              <strong>INSTALLATION DATE:</strong> {formatDate(warData.installationDate)}
            </div>
            <div style={{ marginBottom: '12px' }}>
              <strong>SHINGLE / COLOR:</strong> {warData.shingleColor}
            </div>
            <div style={{ marginBottom: '12px' }}>
              <strong>CUSTOMER ADDRESS:</strong> {warData.customerAddress}
            </div>
          </div>

          {/* Workmanship Warranty Section */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
              LIMITED 5-YEAR WORKMANSHIP WARRANTY
            </h2>
            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              PHOENIX ROOFING & CONSTRUCTION SOLUTIONS LLC ("Contractor") warrants to the original property owner ("Owner") that the roofing installation described herein will be free from workmanship defects that result in leakage or loss of watertight integrity for a period of five (5) years from the installation date.
            </p>
            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              The roofing system installed consists of Owens Corning Duration® asphalt shingles in the color Onyx Black. These shingles carry a separate 35-year limited material warranty provided directly by Owens Corning; all terms and conditions of that manufacturer warranty apply.
            </p>
            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              Should a defect attributable solely to workmanship be discovered within the five-year period, the Owner must notify the Contractor in writing within thirty (30) days of discovery. Upon verification, the Contractor will repair or correct the defect at no cost to the Owner. This workmanship warranty covers labor only and excludes material failures, acts of God, misuse, neglect, structural movement, or alterations performed by others.
            </p>
          </div>

          {/* Payment Acknowledgment Section */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
              Payment Acknowledgment
            </h2>
            <div style={{ marginBottom: '12px' }}>
              <strong>Receipt of Purchase:</strong> The Owner acknowledges full payment for the roofing services described in this certificate.
            </div>
            <div style={{ marginBottom: '12px' }}>
              <strong>Amount Paid:</strong> {formatMoney(warData.amountPaid)}
            </div>
          </div>

          {/* Representative Signature Block */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
              Authorization
            </h2>
            <div style={{ marginBottom: '8px' }}>
              <strong>Contractor Signature:</strong>
            </div>
            {signatureDataURL && (
              <img 
                src={signatureDataURL} 
                alt="signature" 
                style={{ height: '64px', maxWidth: '300px', objectFit: 'contain', marginBottom: '16px' }}
              />
            )}
            <div style={{ borderTop: '1px solid #000', width: '300px', marginTop: '8px', paddingTop: '4px' }}>
              <p style={{ fontSize: '12px', textAlign: 'center' }}>
                Authorized Representative, Phoenix Roofing & Construction Solutions LLC
              </p>
            </div>
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
        <div className="page">
          <img 
            src="/phoenix-logo.svg"
            alt="Phoenix Logo" 
            style={{ 
              display: 'block',
              margin: '0 auto 24px auto',
              width: '120px',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
          
          {/* Header */}
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
              RECEIPT
            </h1>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>PHOENIX ROOFING & CONSTRUCTION SOLUTIONS LLC</p>
              <p style={{ marginBottom: '4px' }}>10334 Vista Meadow Way</p>
              <p style={{ marginBottom: '4px' }}>Lanham, MD 20706</p>
              <p style={{ marginBottom: '4px' }}>MHIC License #: 05-164678</p>
            </div>
          </div>

          {/* Receipt Details */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
              Payment Details
            </h2>
            <div style={{ marginBottom: '12px' }}>
              <strong>CUSTOMER NAME:</strong> {recData.customerName}
            </div>
            <div style={{ marginBottom: '12px' }}>
              <strong>CUSTOMER ADDRESS:</strong> {recData.customerAddress}
            </div>
            <div style={{ marginBottom: '12px' }}>
              <strong>PAYMENT AMOUNT:</strong> {formatMoney(recData.paymentAmount)}
            </div>
            <div style={{ marginBottom: '12px' }}>
              <strong>DATE:</strong> {formatDate(recData.receiptDate)}
            </div>
          </div>

          {/* Purpose of Receipt */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
              This receipt acknowledges the payment received for services rendered by PHOENIX ROOFING & CONSTRUCTION SOLUTIONS LLC.
              All services have been provided in accordance with the agreed-upon terms and conditions.
            </p>
          </div>

          {/* Signature Section */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
              Acknowledgment
            </h2>
            <div style={{ marginBottom: '8px' }}>
              <strong>Received By:</strong>
            </div>
            {signatureDataURL && (
              <img
                src={signatureDataURL}
                alt="signature"
                style={{ height: '64px', maxWidth: '300px', objectFit: 'contain', marginBottom: '16px' }}
              />
            )}
            <div style={{ borderTop: '1px solid #000', width: '300px', marginTop: '8px', paddingTop: '4px' }}>
              <p style={{ fontSize: '12px', textAlign: 'center' }}>
                Authorized Signature, Phoenix Roofing & Construction Solutions LLC
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (type === 'estimate' || type === 'invoice' || type === 'contracts') {
      const docData = formData as any;
      const docType = type === 'estimate' ? 'Estimate' : type === 'invoice' ? 'Invoice' : 'Contract';
      
      return (
        <div className="page">
          <img 
            src="/phoenix-logo.svg"
            alt="Phoenix Logo" 
            style={{ 
              display: 'block',
              margin: '0 auto 24px auto',
              width: '120px',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
          
          <div style={{ marginBottom: '24px' }}>
            <p style={{ marginBottom: '16px' }}>
              Generate a detailed construction {type} using Xactimate market pricing.
              Apply a 10% overhead and profit margin to the total.
              Use either the insurance scope of work and/or the uploaded measurements as the source data.
              The {type} must reflect the exact dollar amount, with no rounding.
              All line items should follow Xactimate formatting and structure.
            </p>

            <p style={{ marginBottom: '16px' }}>
              <strong>Context:</strong> {docData.context}
            </p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <p style={{ marginBottom: '16px' }}>
              Generate a detailed construction {type} using Xactimate market pricing.
              Apply a 10% overhead and profit margin to the total.
              Use either the insurance scope of work and/or the uploaded measurements as the source data.
              The {type} must reflect the exact dollar amount, with no rounding.
              All line items should follow Xactimate formatting and structure.
            </p>

            <p style={{ marginBottom: '16px' }}>
              <strong>Context:</strong> {docData.context}
            </p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>
              PHOENIX {docType.toUpperCase()} FORMAT SPECIFICATION
            </h2>
            <p style={{ marginBottom: '16px' }}>
              This is a layout guide for a clean, insurer-compliant PDF {type}.
            </p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>
              1. Header (Top of Each Page)
            </h3>
            <div style={{ marginBottom: '16px', lineHeight: '1.4' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>PHOENIX ROOFING & CONSTRUCTION SOLUTIONS LLC</p>
              <p style={{ marginBottom: '4px' }}>10334 Vista Meadow Way, Lanham, MD 20706</p>
              <p style={{ marginBottom: '4px' }}>MHIC #05-164678 | Rep Name: {docData.repName} | Rep Phone {docData.repPhone} | Rep Email: {docData.repEmail}</p>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>
              FINAL PDF REQUIREMENTS
            </h3>
            <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
              <li>Fonts: Arial or Helvetica only (embedded).</li>
              <li>Alignment: Header, table, and all body content must be fully left-aligned.</li>
              <li>Bolding: Company name and Total {docType} line must be bold.</li>
              <li>Table: Must use full grid lines.</li>
              <li>Content: Prevent content overflow in table cells.</li>
              <li>Other: No logos, page numbers, bullets, special characters, or color.</li>
              <li>Filename Format: [CustomerLastName]_[Claim#]_PRCS_{docType}_[YYYY-MM-DD].pdf</li>
            </ul>
          </div>
        </div>
      );
    }

    if (type === 'insurancePaymentAuth') {
      const authData = formData as any;
      return (
        <div className="page">
          <img 
            src="/phoenix-logo.svg"
            alt="Phoenix Logo" 
            style={{ 
              display: 'block',
              margin: '0 auto 16px auto',
              width: '120px',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
          
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Insurance Claim Payment & Representation Authorization</div>
            <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Phoenix Restorations and Construction Solutions LLC</div>
            <div>10334 Vista Meadow Way, Lanham, MD 20706</div>
            <div>Phone: (301) 450-9487 | MHIC #164678</div>
          </div>

          <hr style={{ margin: "16px 0", border: "none", borderTop: "1px solid #000" }} />

          <div style={{ fontWeight: 700, fontSize: 13, marginTop: 8, marginBottom: 4 }}>1. PARTIES</div>
          <div>Homeowner(s):</div>
          <div style={{ marginBottom: 4 }}>
            <span style={{ fontWeight: 600, display: 'inline', marginRight: 4 }}>Name(s):</span>
            <span style={{ display: 'inline' }}>{authData.homeownerNames}</span>
          </div>
          <div style={{ marginBottom: 4 }}>
            <span style={{ fontWeight: 600, display: 'inline', marginRight: 4 }}>Property Address:</span>
            <span style={{ display: 'inline' }}>{authData.propertyAddress}</span>
          </div>
          <div style={{ marginBottom: 4 }}>
            <span style={{ fontWeight: 600, display: 'inline', marginRight: 4 }}>City:</span>
            <span style={{ display: 'inline', marginRight: 10 }}>{authData.city}</span>
            <span style={{ fontWeight: 600, display: 'inline', marginRight: 4 }}>State:</span>
            <span style={{ display: 'inline', marginRight: 10 }}>{authData.state}</span>
            <span style={{ fontWeight: 600, display: 'inline', marginRight: 4 }}>ZIP:</span>
            <span style={{ display: 'inline' }}>{authData.zip}</span>
          </div>
          <div style={{ marginBottom: 4 }}>
            <span style={{ fontWeight: 600, display: 'inline', marginRight: 4 }}>Phone:</span>
            <span style={{ display: 'inline', marginRight: 10 }}>{authData.phone}</span>
            <span style={{ fontWeight: 600, display: 'inline', marginRight: 4 }}>Email:</span>
            <span style={{ display: 'inline' }}>{authData.email}</span>
          </div>
          <div style={{ marginBottom: 4 }}>
            <span style={{ fontWeight: 600, display: 'inline', marginRight: 4 }}>Insurance Carrier:</span>
            <span style={{ display: 'inline' }}>{authData.insuranceCarrier}</span>
          </div>
          <div style={{ marginBottom: 4 }}>
            <span style={{ fontWeight: 600, display: 'inline', marginRight: 4 }}>Claim Number:</span>
            <span style={{ display: 'inline' }}>{authData.claimNumber}</span>
          </div>
          <div style={{ marginBottom: 4 }}>
            <span style={{ fontWeight: 600, display: 'inline', marginRight: 4 }}>Mortgage Company/Lender:</span>
            <span style={{ display: 'inline' }}>{authData.mortgageCompany}</span>
          </div>
          <div style={{ marginBottom: 8 }}>
            <span style={{ fontWeight: 600, display: 'inline', marginRight: 4 }}>Loan Number:</span>
            <span style={{ display: 'inline' }}>{authData.loanNumber}</span>
          </div>

          <div>Contractor:</div>
          <div style={{ marginBottom: 8 }}>
            Phoenix Restorations and Construction Solutions LLC ("Contractor")
          </div>

          <div style={{ fontWeight: 700, fontSize: 13, marginTop: 8, marginBottom: 4 }}>2. PURPOSE</div>
          <ul style={{ margin: 0, paddingLeft: 18, listStyleType: "disc", listStylePosition: "outside" }}>
            <li style={{ marginBottom: 4 }}>Receive direct check payments from the insurance company and/or mortgage company for all claim-related proceeds.</li>
            <li style={{ marginBottom: 4 }}>Communicate directly with all parties (insurance, mortgage, legal, engineering) regarding the claim.</li>
            <li style={{ marginBottom: 4 }}>Act as the Homeowner's representative for all payment handling and claim communications.</li>
            <li style={{ marginBottom: 4 }}>Ensure compliance with Maryland law, MHIC regulations, and mortgage loss payee provisions.</li>
          </ul>

          <div style={{ fontWeight: 700, fontSize: 13, marginTop: 8, marginBottom: 4 }}>11. SIGNATURES</div>
          <div>Contractor Representative:</div>
          <div style={{ marginBottom: 4 }}>
            <span style={{ fontWeight: 600, display: 'inline', marginRight: 4 }}>Name:</span>
            <span style={{ display: 'inline', marginRight: 10 }}>{authData.contractorRepName}</span>
            <span style={{ fontWeight: 600, display: 'inline', marginRight: 4 }}>Title:</span>
            <span style={{ display: 'inline' }}>{authData.contractorRepTitle}</span>
          </div>

          <div style={{ marginTop: 4, marginBottom: 4 }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Contractor Signature</div>
            {authData.contractorSignatureDataURL && <img src={authData.contractorSignatureDataURL} alt="Contractor Signature" style={{ maxHeight: 58, maxWidth: "100%" }} />}
            <div style={{ marginBottom: 4 }}>
              <span style={{ fontWeight: 600, display: 'inline', marginRight: 4 }}>Date:</span>
              <span style={{ display: 'inline', marginRight: 10 }}>{authData.contractorDate && formatDate(authData.contractorDate)}</span>
              <span style={{ fontWeight: 600, display: 'inline', marginRight: 4 }}>Printed Name:</span>
              <span style={{ display: 'inline' }}>{authData.contractorRepName} ({authData.contractorRepTitle})</span>
            </div>
          </div>

          <hr style={{ margin: "20px 0", border: "none", borderTop: "1px solid #000" }} />

          <div>Homeowner(s):</div>

          <div style={{ marginTop: 4, marginBottom: 4 }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Homeowner 1 Signature</div>
            {authData.homeowner1SignatureDataURL && <img src={authData.homeowner1SignatureDataURL} alt="Homeowner 1 Signature" style={{ maxHeight: 58, maxWidth: "100%" }} />}
            <div style={{ marginBottom: 4 }}>
              <span style={{ fontWeight: 600, display: 'inline', marginRight: 4 }}>Date:</span>
              <span style={{ display: 'inline', marginRight: 10 }}>{authData.homeowner1Date && formatDate(authData.homeowner1Date)}</span>
              <span style={{ fontWeight: 600, display: 'inline', marginRight: 4 }}>Printed Name:</span>
              <span style={{ display: 'inline' }}>{authData.homeowner1PrintedName}</span>
            </div>
          </div>

          {authData.homeowner2PrintedName && (
            <div style={{ marginTop: 4, marginBottom: 4 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Homeowner 2 Signature</div>
              {authData.homeowner2SignatureDataURL && <img src={authData.homeowner2SignatureDataURL} alt="Homeowner 2 Signature" style={{ maxHeight: 58, maxWidth: "100%" }} />}
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontWeight: 600, display: 'inline', marginRight: 4 }}>Date:</span>
                <span style={{ display: 'inline', marginRight: 10 }}>{authData.homeowner2Date && formatDate(authData.homeowner2Date)}</span>
                <span style={{ fontWeight: 600, display: 'inline', marginRight: 4 }}>Printed Name:</span>
                <span style={{ display: 'inline' }}>{authData.homeowner2PrintedName}</span>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Default fallback for other form types
    return (
      <div className="page">
        <img 
          src="/phoenix-logo.svg"
          alt="Phoenix Logo" 
          style={{ 
            display: 'block',
            margin: '0 auto 24px auto',
            width: '120px',
            height: 'auto',
            objectFit: 'contain'
          }}
        />
        
        <h1 style={{ fontSize: '20px', textAlign: 'center', fontWeight: 'bold', margin: '16px 0' }}>
          {LABELS[formType]}
        </h1>
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>PHOENIX ROOFING & CONSTRUCTION SOLUTIONS LLC</p>
          <p style={{ marginBottom: '4px' }}>10334 Vista Meadow Way, Lanham, MD 20706</p>
          <p style={{ marginBottom: '4px' }}>MHIC #05-164678</p>
        </div>
        <div style={{ color: '#000' }}>
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

  return (
    <div className="min-h-screen bg-white" style={{ 
      width: '8.5in', 
      margin: '0 auto',
      padding: '1in',
      boxSizing: 'border-box',
      background: '#fff',
      color: '#000',
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '12px',
      lineHeight: 1.4
    }}>
      <div id="print-root">
        {renderContent()}
      </div>
    </div>
  );
}