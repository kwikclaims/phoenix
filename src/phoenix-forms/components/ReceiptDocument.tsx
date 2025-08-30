import { ReceiptFormData } from '../lib/formSchemas';

interface ReceiptDocumentProps {
  type: string;
  data: ReceiptFormData;
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

export default function ReceiptDocument({ type, data, signatureDataURL }: ReceiptDocumentProps) {
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
          <strong>CUSTOMER NAME:</strong> {data.customerName}
        </div>
        <div style={{ marginBottom: '12px' }}>
          <strong>CUSTOMER ADDRESS:</strong> {data.customerAddress}
        </div>
        <div style={{ marginBottom: '12px' }}>
          <strong>PAYMENT AMOUNT:</strong> {formatMoney(data.paymentAmount)}
        </div>
        <div style={{ marginBottom: '12px' }}>
          <strong>DATE:</strong> {formatDate(data.receiptDate)}
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
        <img
          src={signatureDataURL}
          alt="signature"
          style={{ height: '64px', maxWidth: '300px', objectFit: 'contain', marginBottom: '16px' }}
        />
        <div style={{ borderTop: '1px solid #000', width: '300px', marginTop: '8px', paddingTop: '4px' }}>
          <p style={{ fontSize: '12px', textAlign: 'center' }}>
            Authorized Signature, Phoenix Roofing & Construction Solutions LLC
          </p>
        </div>
      </div>
    </div>
  );
}