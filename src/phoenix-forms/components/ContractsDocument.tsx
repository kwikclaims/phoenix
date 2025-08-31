import { ContractsFormData } from '../lib/formSchemas';

interface ContractsDocumentProps {
  type: string;
  data: ContractsFormData;
}

export default function ContractsDocument({ type, data }: ContractsDocumentProps) {
  return (
    <div id="cert">
      {/* Page 1 */}
      <div className="page" style={{ padding: '24px 28px' }}>
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
            Generate a detailed construction contract using Xactimate market pricing.
            Apply a 10% overhead and profit margin to the total.
            Use either the insurance scope of work and/or the uploaded measurements as the source data.
            The contract must reflect the exact dollar amount, with no rounding.
            All line items should follow Xactimate formatting and structure.
          </p>

          <p style={{ marginBottom: '16px' }}>
            <strong>Context:</strong> {data.context}
          </p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>
            PHOENIX CONTRACT FORMAT SPECIFICATION
          </h2>
          <p style={{ marginBottom: '16px' }}>
            This is a layout guide for a clean, insurer-compliant PDF contract.
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
            2. Contract Information Block
          </h3>
          <div style={{ marginBottom: '16px', lineHeight: '1.4' }}>
            <p>Contract #: [Alphanumeric ID]</p>
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
      </div>

      {/* Page 2 */}
      <div className="page" style={{ padding: '24px 28px' }}>
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
            5. Page Handling for Multi-Page Contracts
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
            <p><strong>Total Contract: $XX,XXX.XX</strong></p>
            <p>Contract Date: [Month DD, YYYY]</p>
            <p>Price List: [Region Code]</p>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Formatting:</p>
            <ul style={{ marginLeft: '20px', marginBottom: '0' }}>
              <li>Bold only the "Total Contract:" label and amount.</li>
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
            This contract reflects storm-related damages observed on-site and incorporates all required materials, labor, and code upgrades necessary to return the property to pre-loss condition. Steep slope, elevation, and material-specific pricing have been applied in accordance with [Pricing Code] database.
          </p>
          
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Formatting:</p>
            <ul style={{ marginLeft: '20px', marginBottom: '0' }}>
              <li>Plain paragraph placed immediately above the Total Contract block.</li>
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
            <li>Bolding: Company name and Total Contract line must be bold.</li>
            <li>Table: Must use full grid lines.</li>
            <li>Content: Prevent content overflow in table cells.</li>
            <li>Other: No logos, page numbers, bullets, special characters, or color.</li>
            <li>Filename Format: [CustomerLastName]_[Claim#]_PRCS_Contract_[YYYY-MM-DD].pdf</li>
          </ul>
        </div>
      </div>

      {/* Page 3 */}
      <div className="page" style={{ padding: '24px 28px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
            TERMS AND CONDITIONS
          </h2>
          <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
            In consideration of payment of one dollar ($1.00), receipt of which is hereby acknowledged, Contractor warrants that it will (1) advise Customer on the specification of materials and the scope of work, (2) supervise and manage project(s), and (3) assist in the adjustment of the insurance claim including, but not limited to: the preparation of documentation and office fees, as authorized through Phoenix Roofing & Construction Solutions LLC. This agreement authorizes the work to be performed as per the Customer scope of work and/or insurance estimate. Customer understands and agrees that all work authorized and performed shall be invoiced and paid for in accordance with the estimate value provided by the insurer as a result of performing the work outlined in this Agreement, including any supplements, or negotiated change orders, to the estimate of work. This Agreement is executed between Customer and Phoenix Roofing & Construction Solutions LLC immediately upon receipt from insurer. Customer shall furnish a copy of the insurer-approved estimate to Phoenix Roofing & Construction Solutions LLC.
          </p>
          
          <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
            Should the insurer's award prove sufficient, or in the opinion of Phoenix Roofing & Construction Solutions LLC, not adequately fund the work as prescribed, Phoenix Roofing & Construction Solutions LLC reserves the right to decline some or all of the work. Should Customer fail and/or refuse to adequately compensate for all authorized improvements performed by Contractor, Contractor shall be entitled to equitable compensation for work not covered by insurer. In such event, Phoenix Roofing & Construction Solutions LLC shall be entitled to specific damages up to 10% of total estimate value provided by the insurer, as a result of performing such work.
          </p>
          
          <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
            This Agreement including any addendums, constitutes the complete understanding of the Parties, is intended to incorporate and supersede all prior negotiations, representations or agreements, whether written or oral, and may not be altered or amended, except in writing by all Parties. The customer may cancel this Agreement at any time within (5) five business days of the date of signing the Agreement. The customer may cancel this agreement at any time if customer is at least 65 years old, within 7 days of the signature specified by a "Notice of Cancellation", in writing, by certified mail. Verbal requests will not be accepted.
          </p>
        </div>
      </div>

      {/* Page 4 */}
      <div className="page" style={{ padding: '24px 28px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
            NOTICE REGARDING UNFORESEEN CONDITIONS AND ADDITIONAL CHARGES
          </h2>
          <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
            At Phoenix Roofing & Construction Solutions LLC, we strive to ensure that every job is completed thoroughly, professionally, and in alignment with the scope of work as approved by the insurance carrier or agreed upon in writing. However, it is important for all customers to understand that certain unforeseen conditions may arise once work has begun that are not visible or detectable during the initial inspection or estimation process.
          </p>
          
          <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
            If, during the course of the work, our team identifies conditions that fall outside the original scope of work—such as but not limited to rotted wood, damaged framing, mold, electrical hazards, or structural deficiencies—we will promptly notify the Customer and provide documentation and a cost breakdown for any additional work required. These additional repairs or services may not be covered by the insurance estimate and will be the financial responsibility of the Customer unless otherwise agreed in writing.
          </p>
          
          <p style={{ marginBottom: '16px', textAlign: 'justify' }}>
            To avoid surprise charges and maintain transparency, no additional work will be performed without the Customer's prior written approval, which may be in the form of a signed work authorization or email confirmation.
          </p>
        </div>
      </div>

      {/* Page 5 */}
      <div className="page" style={{ padding: '24px 28px' }}>
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Special Note for Roofing Jobs:</p>
          <p style={{ marginBottom: '8px', textAlign: 'justify' }}>
            In roofing projects where roof decking (plywood) must be removed and replaced due to rot, damage, or failure to meet local code requirements:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
            <li style={{ marginBottom: '8px' }}>Phoenix Roofing & Construction Solutions LLC will cover the cost of up to four (4) sheets of plywood.</li>
            <li style={{ marginBottom: '8px' }}>Any additional sheets required beyond the first four (4) will be billed to the Customer at a rate disclosed prior to installation.</li>
            <li style={{ marginBottom: '8px' }}>We will provide photographic documentation and measurements of all decking replaced beyond the covered amount.</li>
          </ul>
          <p style={{ textAlign: 'justify', marginBottom: '32px' }}>
            This policy is intended to ensure a fair and transparent process for both parties and to maintain the structural integrity and quality of the work being performed.
          </p>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px' }}>
            AGREEMENT SIGNATURES
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>
                CONTRACTOR
              </h3>
              <div style={{ marginBottom: '12px' }}>
                <p style={{ marginBottom: '4px' }}>Name:</p>
                <div style={{ borderBottom: '1px solid #000', height: '24px', width: '100%' }}></div>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <p style={{ marginBottom: '4px' }}>Date:</p>
                <div style={{ borderBottom: '1px solid #000', height: '24px', width: '100%' }}></div>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <p style={{ marginBottom: '4px' }}>Signature:</p>
                <div style={{ borderBottom: '1px solid #000', height: '48px', width: '100%' }}></div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>
                HOMEOWNER
              </h3>
              <div style={{ marginBottom: '12px' }}>
                <p style={{ marginBottom: '4px' }}>Name:</p>
                <div style={{ borderBottom: '1px solid #000', height: '24px', width: '100%' }}></div>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <p style={{ marginBottom: '4px' }}>Date:</p>
                <div style={{ borderBottom: '1px solid #000', height: '24px', width: '100%' }}></div>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <p style={{ marginBottom: '4px' }}>Signature:</p>
                <div style={{ borderBottom: '1px solid #000', height: '48px', width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}