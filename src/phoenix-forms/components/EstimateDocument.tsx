import { EstimateFormData } from '../lib/formSchemas';

interface EstimateDocumentProps {
  type: string;
  data: EstimateFormData;
}

export default function EstimateDocument({ type, data }: EstimateDocumentProps) {
  return (
    <div 
      id="cert" 
      className="relative bg-white p-8 mx-auto"
      style={{ 
        width: '8.5in', 
        fontSize: '14px',
        lineHeight: '1.6',
        color: '#000000',
        fontFamily: 'Arial, Helvetica, sans-serif'
      }}
    >
      <div style={{ marginBottom: '24px' }}>
        <p style={{ marginBottom: '16px' }}>
          Generate a detailed construction estimate using Xactimate market pricing.
          Apply a 10% overhead and profit margin to the total.
          Use either the insurance scope of work and/or the uploaded measurements as the source data.
          The estimate must reflect the exact dollar amount, with no rounding.
          All line items should follow Xactimate formatting and structure.
        </p>

        <p style={{ marginBottom: '16px' }}>
          <strong>Context:</strong> {data.context}
        </p>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>
          PHOENIX ESTIMATE FORMAT SPECIFICATION
        </h2>
        <p style={{ marginBottom: '16px' }}>
          This is a layout guide for a clean, insurer-compliant PDF estimate.
        </p>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>
          1. Header (Top of Each Page)
        </h3>
        <div style={{ marginBottom: '16px', lineHeight: '1.4' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>PHOENIX ROOFING & CONSTRUCTION SOLUTIONS LLC</p>
          <p style={{ marginBottom: '4px' }}>10334 Vista Meadow Way, Lanham, MD 20706</p>
          <p style={{ marginBottom: '4px' }}>MHIC #05-164678 | Rep Name: {data.repName} | Rep Phone {data.repPhone} | Rep Email: {data.repEmail}</p>
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Formatting:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '0' }}>
            <li>Align all text flush-left with the line item chart.</li>
            <li>Font: Arial or Helvetica, 10–12 pt.</li>
            <li>Company name must be bold.</li>
            <li>No colors, logos, or images.</li>
            <li>One line per field, single spaced.</li>
            <li>Repeat this header on every page.</li>
          </ul>
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>
          2. Estimate Information Block
        </h3>
        <div style={{ marginBottom: '16px', lineHeight: '1.4' }}>
          <p>Estimate #: [Alphanumeric ID]</p>
          <p>Customer: [Full Name]</p>
          <p>Property: [Full Address]</p>
          <p>Claim #: [Insurance Claim #]</p>
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Formatting:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '0' }}>
            <li>Align with the left edge of the line-item table.</li>
            <li>No bolding or styling.</li>
            <li>One line per item.</li>
            <li>Add a line break after this block.</li>
          </ul>
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>
          3. (Optional) Scope/Area Notes Section
        </h3>
        <div style={{ marginBottom: '16px' }}>
          <p style={{ marginBottom: '4px' }}>Example:</p>
          <p style={{ marginBottom: '4px' }}>Main Roof: Approx. 2,600 SF</p>
          <p style={{ marginBottom: '4px' }}>Steep Slope Sections Present</p>
          <p style={{ marginBottom: '4px' }}>Double-Layer Shingles Verified</p>
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Formatting:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '0' }}>
            <li>All notes must align left with the line-item table.</li>
            <li>No bullets, symbols, or special formatting.</li>
            <li>Use single line spacing.</li>
          </ul>
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>
          4. Line-Item Table (WITH GRID LINES)
        </h3>
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Columns:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
            <li>#: Numeric, left-aligned</li>
            <li>Description: Multiline, left-aligned (text wraps within cell)</li>
            <li>Qty: Numeric with units (e.g., SQ, LF, EA), right-aligned</li>
            <li>Unit Price: Dollar amount, right-aligned</li>
            <li>Total: Dollar amount, right-aligned</li>
          </ul>
          
          <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Formatting Rules:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '0' }}>
            <li>Grid lines must be visible around every cell (full box borders).</li>
            <li>No text overflow or bleeding across cells—set explicit cell width and enable word wrap.</li>
            <li>All content must stay within its own cell.</li>
            <li>The entire table must be fully left-aligned.</li>
            <li>Font: Arial or Helvetica, 9–10 pt.</li>
          </ul>
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>
          5. Page Handling for Multi-Page Estimates
        </h3>
        <ul style={{ marginLeft: '20px', marginBottom: '0' }}>
          <li>Repeat the header block at the top of every page.</li>
          <li>Continue the table without interruption (no page breaks within a single item).</li>
          <li>Do not include page numbers or continuation notes.</li>
        </ul>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>
          6. Final Line Items and Table Closure
        </h3>
        <p style={{ marginBottom: '16px' }}>
          The table must end cleanly with all cells enclosed in visible borders.
          Final line items are followed immediately by the total block—no subtotal or section dividers unless manually added.
        </p>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>
          7. Total Summary Block (Bottom of Last Page)
        </h3>
        <div style={{ marginBottom: '16px', lineHeight: '1.4' }}>
          <p><strong>Total Estimate: $XX,XXX.XX</strong></p>
          <p>Estimate Date: [Month DD, YYYY]</p>
          <p>Price List: [Region Code]</p>
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Formatting:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '0' }}>
            <li>Bold only the "Total Estimate:" label and amount.</li>
            <li>All text left-aligned with the table.</li>
            <li>Use the correct Xactimate pricing code (e.g., DCWA8X_JUL25).</li>
          </ul>
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>
          8. Disclaimer Paragraph (Optional)
        </h3>
        <p style={{ marginBottom: '16px' }}>
          This estimate reflects storm-related damages observed on-site and incorporates all required materials, labor, and code upgrades necessary to return the property to pre-loss condition. Steep slope, elevation, and material-specific pricing have been applied in accordance with [Pricing Code] database.
        </p>
        
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Formatting:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '0' }}>
            <li>Plain paragraph placed immediately above the Total Estimate block.</li>
            <li>Fully left-aligned.</li>
            <li>No bold, italics, or special characters.</li>
            <li>One paragraph, maximum two lines if possible.</li>
          </ul>
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>
          FINAL PDF REQUIREMENTS
        </h3>
        <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
          <li>Fonts: Arial or Helvetica only (embedded).</li>
          <li>Alignment: Header, table, and all body content must be fully left-aligned.</li>
          <li>Bolding: Company name and Total Estimate line must be bold.</li>
          <li>Table: Must use full grid lines.</li>
          <li>Content: Prevent content overflow in table cells.</li>
          <li>Other: No logos, page numbers, bullets, special characters, or color.</li>
          <li>Filename Format: [CustomerLastName]_[Claim#]_PRCS_Estimate_[YYYY-MM-DD].pdf</li>
        </ul>
      </div>
    </div>
  );
}