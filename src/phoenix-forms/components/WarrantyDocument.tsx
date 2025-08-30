import { WarrantyFormData } from '../lib/formSchemas';

interface WarrantyDocumentProps {
  type: string;
  data: WarrantyFormData;
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

const getCurrentYear = (): string => {
  return new Date().getFullYear().toString();
};

const generateCertificateNumber = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  return `${getCurrentYear()}-${timestamp}`;
};

export default function WarrantyDocument({ type, data, signatureDataURL }: WarrantyDocumentProps) {
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
        fontFamily: 'Arial, Helvetica, sans-serif'
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
          ROOFING WARRANTY CERTIFICATE
        </h1>
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>PHOENIX ROOFING & CONSTRUCTION SOLUTIONS LLC</p>
          <p style={{ marginBottom: '4px' }}>10334 Vista Meadow Way</p>
          <p style={{ marginBottom: '4px' }}>Lanham, MD 20706</p>
          <p style={{ marginBottom: '4px' }}>MHIC License #: 05-164678</p>
        </div>
      </div>

      {/* Customer & Installation Info Section */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
          Customer & Installation Information
        </h2>
        <div style={{ marginBottom: '12px' }}>
          <strong>CUSTOMER NAME:</strong> {data.customerName}
        </div>
        <div style={{ marginBottom: '12px' }}>
          <strong>INSTALLATION DATE:</strong> {formatDate(data.installationDate)}
        </div>
        <div style={{ marginBottom: '12px' }}>
          <strong>SHINGLE / COLOR:</strong> {data.shingleColor}
        </div>
        <div style={{ marginBottom: '12px' }}>
          <strong>CUSTOMER ADDRESS:</strong> {data.customerAddress}
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

      {/* Transferability Clause */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
          Transferability
        </h2>
        <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
          This workmanship warranty may be transferred one (1) time to a subsequent property owner within the warranty term, provided the Contractor receives written notice within sixty (60) days of transfer and an inspection fee is paid.
        </p>
      </div>

      {/* Limitation of Liability Clause */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
          Limitation of Liability
        </h2>
        <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
          The remedies provided herein are the sole and exclusive remedies available to the Owner. In no event shall the Contractor be liable for incidental or consequential damages. All implied warranties are limited to five (5) years to the extent permitted by law.
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
          <strong>Amount Paid:</strong> {formatMoney(data.amountPaid)}
        </div>
      </div>

      {/* Representative Signature Block */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
          Authorization
        </h2>
        <div style={{ marginBottom: '16px' }}>
          <strong>Certificate Number:</strong> PHX-WARR-{generateCertificateNumber()}
        </div>
        <div style={{ marginBottom: '8px' }}>
          <strong>Contractor Signature:</strong>
        </div>
        <img 
          src={signatureDataURL} 
          alt="signature" 
          style={{ height: '64px', maxWidth: '300px', objectFit: 'contain', marginBottom: '16px' }}
        />
        <div style={{ borderTop: '1px solid #000', width: '300px', marginTop: '8px', paddingTop: '4px' }}>
          <p style={{ fontSize: '12px', textAlign: 'center' }}>
            Authorized Representative, Phoenix Roofing & Construction Solutions LLC
          </p>
        </div>
      </div>
    </div>
  );
}