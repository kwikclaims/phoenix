import { FormData } from '../lib/formSchemas';

interface ClcJobTotalOnlyProps {
  type: string;
  data: FormData & { jobTotal: number };
  signatureDataURL: string;
}

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

export default function ClcJobTotalOnly({ type, data, signatureDataURL }: ClcJobTotalOnlyProps) {
  return (
    <div 
      id="cert" 
      className="relative bg-white p-8 mx-auto"
      style={{ 
        width: '8.5in', 
        minHeight: '11in',
        fontSize: '14px',
        lineHeight: '1.6',
        color: '#000000',
        fontFamily: 'Times, serif'
      }}
    >
      <img 
        src={`${window.location.origin}/images/black-phoenix-logo-transparent.png`}
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
        <strong> for {formatMoney(data.jobTotal)} in total job cost</strong>.
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
        <strong>Homeowner:</strong> {data.homeownerName}
      </p>
      <p style={{ marginBottom: '8px' }}>
        <strong>Attn:</strong> {data.insuranceCompany}
      </p>
      <p style={{ marginBottom: '8px' }}>
        {data.address1}<br />{data.address2}
      </p>
      <p style={{ marginBottom: '8px' }}>
        <strong>Contract Date:</strong> {formatDate(data.contractDate)}
      </p>
      <p style={{ marginBottom: '8px' }}>
        <strong>Certificate Date:</strong> {formatDate(data.certificateDate)}
      </p>
      <p style={{ marginBottom: '8px' }}>
        <strong>Claim #:</strong> {data.claimNumber}
      </p>

      <p className="mt-8" style={{ marginTop: '32px', marginBottom: '8px' }}>
        Contractor Signature:
      </p>
      <img 
        src={signatureDataURL} 
        alt="signature" 
        className="h-16" 
        style={{ height: '64px', maxWidth: '300px', objectFit: 'contain' }}
      />
      
      <p className="mt-16 text-center font-bold uppercase">
        JOB PHOTOS ATTACHED BELOW
      </p>
    </div>
  );
}