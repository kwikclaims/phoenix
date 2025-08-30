import React from "react";
import type { InsurancePaymentAuthFormData } from "../lib/formSchemas";

const FieldInline: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
  <span style={styles.inlineField}>
    <span style={styles.inlineLabel}>{label}:</span>
    <span style={styles.inlineValue}>{value || "\u00A0"}</span>
  </span>
);

const InlineRow: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div style={styles.inlineRow}>{children}</div>
);

const BulletList: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ul style={styles.bulletList}>{children}</ul>
);

const Bullet: React.FC<React.PropsWithChildren> = ({ children }) => (
  <li style={styles.bulletItem}>{children}</li>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section>
    <div style={styles.sectionTitle}>{title}</div>
    {children}
  </section>
);

const Paragraph: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div style={styles.paragraph}>{children}</div>
);

const Indent: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div style={{ marginLeft: 20 }}>{children}</div>
);

// Compact signature block, no lines/underlines
const SignatureBlock: React.FC<{ label: string; sig?: string; date?: string; printed?: string }> = ({
  label, sig, date, printed,
}) => (
  <div style={styles.signatureBlock}>
    <div style={styles.signatureLabel}>{label}</div>
    {sig && <img src={sig} alt={label} style={styles.signatureImage} />}
    <InlineRow>
      <FieldInline label="Date" value={date} />
      <FieldInline label="Printed Name" value={printed} />
    </InlineRow>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "'Times New Roman', serif", // Changed to Times New Roman for a more formal look
    fontSize: 12, // Adjusted font size for better readability
    lineHeight: 1.35, // Adjusted line height for better spacing
    color: "#000",
    padding: "24px 28px",
    whiteSpace: "normal",
    wordBreak: "break-word",
  },
  headerBlock: { textAlign: "center", marginBottom: 5 }, // Reduced margin-bottom
  title: { fontSize: 18, fontWeight: 700, marginBottom: 2 },
  subtitle: { fontSize: 14, fontWeight: 600, marginBottom: 8 },

  sectionTitle: { fontWeight: 700, fontSize: 13, marginTop: 8, marginBottom: 4 }, // Reduced margins
  paragraph: { marginBottom: 4 }, // Reduced margin-bottom

  // Bullets
  bulletList: { margin: 0, paddingLeft: 18, listStyleType: "disc", listStylePosition: "outside" },
  bulletItem: { marginBottom: 4 },

  // NEW: inline field styling (no lines, tight label/value spacing)
  inlineField: {
    display: "inline",
    marginRight: 10,   // tiny breathing room before the next field
  },
  inlineLabel: {
    fontWeight: 600,
    display: "inline",
    whiteSpace: "nowrap",
    marginRight: 4, // gap between caption and value
  },
  inlineValue: {
    display: "inline",
    whiteSpace: "nowrap",
  },

  // NEW: group rows for multiple inline fields on the same line
  inlineRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12, // spacing between pairs like "City: X" and "State: Y"
    marginBottom: 2, // Reduced margin-bottom
  },

  // Signatures: compact, no lines
  signatureBlock: { marginTop: 4, marginBottom: 4 }, // Reduced margins
  signatureLabel: { fontWeight: 600, marginBottom: 4 },
  signatureImage: { maxHeight: 58, maxWidth: "100%" },

  // Optional page break helper (use sparingly)
  pageBreak: { pageBreakAfter: "always" },
};

type Props = {
  formData: InsurancePaymentAuthFormData;
};

export default function InsurancePaymentAuthDocument({ formData }: Props) {
  return (
    <div id="cert" style={styles.page}>
      <img 
        src={`${window.location.origin}/phoenix-logo.svg`}
        alt="Phoenix Logo" 
        style={{ 
          display: 'block',
          margin: '0 auto 16px auto',
          width: '120px',
          height: 'auto',
          objectFit: 'contain'
        }}
      />
      
      <div style={styles.headerBlock}>
        <div style={styles.title}>Insurance Claim Payment & Representation Authorization</div>
        <div style={styles.subtitle}>Phoenix Restorations and Construction Solutions LLC</div>
        <div>10334 Vista Meadow Way, Lanham, MD 20706</div>
        <div>Phone: (301) 450-9487 | MHIC #164678</div>
      </div>

      <hr style={{ margin: "16px 0", border: "none", borderTop: "1px solid #000" }} />

      <Section title="1. PARTIES">
        <div>Homeowner(s):</div>

        <InlineRow>
          <FieldInline label="Name(s)" value={formData.homeownerNames} />
        </InlineRow>

        <InlineRow>
          <FieldInline label="Property Address" value={formData.propertyAddress} />
        </InlineRow>

        <InlineRow>
          <FieldInline label="City" value={formData.city} />
          <FieldInline label="State" value={formData.state} />
          <FieldInline label="ZIP" value={formData.zip} />
        </InlineRow>

        <InlineRow>
          <FieldInline label="Phone" value={formData.phone} />
          <FieldInline label="Email" value={formData.email} />
        </InlineRow>

        <InlineRow>
          <FieldInline label="Insurance Carrier" value={formData.insuranceCarrier} />
        </InlineRow>
        <InlineRow>
          <FieldInline label="Claim Number" value={formData.claimNumber} />
        </InlineRow>

        <InlineRow>
          <FieldInline label="Mortgage Company/Lender" value={formData.mortgageCompany} />
        </InlineRow>
        <InlineRow>
          <FieldInline label="Loan Number" value={formData.loanNumber} />
        </InlineRow>

        <div>Contractor:</div>
        <div>
          Phoenix Restorations and Construction Solutions LLC ("Contractor")
        </div>
      </Section>

      <Section title="2. PURPOSE">
        <BulletList>
          <Bullet>Receive direct check payments from the insurance company and/or mortgage company for all claim-related proceeds.</Bullet>
          <Bullet>Communicate directly with all parties (insurance, mortgage, legal, engineering) regarding the claim.</Bullet>
          <Bullet>Act as the Homeowner's representative for all payment handling and claim communications.</Bullet>
          <Bullet>Ensure compliance with Maryland law, MHIC regulations, and mortgage loss payee provisions.</Bullet>
        </BulletList>
      </Section>

      <Section title="3. DIRECTION OF PAYMENT – INSURANCE COMPANY">
        <Paragraph>Homeowner(s) authorize and instruct their insurance carrier to:</Paragraph>
        <BulletList>
          <Bullet>Issue all claim-related payments by check payable to:</Bullet>
        </BulletList>
        <Indent>Phoenix Restorations and Construction Solutions LLC<br/>and, if required by policy, the Mortgage Company as a co-payee.</Indent>
        <BulletList>
          <Bullet>Send all checks via trackable delivery service (FedEx, UPS, USPS Priority/Express) with tracking numbers provided to both Homeowner and Contractor.</Bullet>
          <Bullet>Recognize Contractor as an authorized contact for payment status, claim documents, and tracking details.</Bullet>
          <Bullet>Include Contractor's name as a payee on all supplemental or depreciation checks.</Bullet>
        </BulletList>
      </Section>

      <div style={styles.pageBreak}></div>

      <Section title="4. DIRECTION OF PAYMENT – MORTGAGE COMPANY">
        <Paragraph>Homeowner(s) authorize and instruct their mortgage company to:</Paragraph>
        <BulletList>
          <Bullet>Endorse all claim checks upon receipt and either:</Bullet>
        </BulletList>
        <Indent>Release the endorsed check directly to Contractor, OR</Indent>
        <Indent>Deposit into loss draft account and disburse funds directly to Contractor per draw schedule.</Indent>
        <BulletList>
          <Bullet>Accept this Agreement as a standing Direction of Pay for all current and future claim disbursements related to this loss.</Bullet>
          <Bullet>Allow Contractor to submit documents, coordinate inspections, and receive payment status updates directly from the loss draft department.</Bullet>
          <Bullet>Send all disbursements via trackable delivery service with tracking shared with Contractor.</Bullet>
        </BulletList>
      </Section>

      <Section title="5. ASSIGNMENT OF INSURANCE PROCEEDS">
        <Paragraph>To the fullest extent permitted by Maryland law and the insurance policy, Homeowner(s) assign to Contractor all rights to insurance proceeds for work performed under the signed contract, including supplemental claims, depreciation/holdback, and any additional damage approvals.</Paragraph>
      </Section>

      <Section title="6. REPRESENTATION AUTHORIZATION">
        <BulletList>
          <Bullet>Communicate directly with the insurance carrier, adjusters, engineers, mortgage company representatives, and attorneys regarding this claim.</Bullet>
          <Bullet>Request and receive past/current scopes of loss, estimates, claim documents, and correspondence.</Bullet>
          <Bullet>Submit supporting documentation (photos, videos, reports, invoices, supplemental requests).</Bullet>
          <Bullet>Engage in discussions to support, supplement, or dispute claim findings.</Bullet>
          <Bullet>Receive all claim-related updates directly from insurers or lenders.</Bullet>
        </BulletList>
      </Section>

      <Section title="7. TRUST FUND DECLARATION (Maryland Real Property Code §9-201)">
        <Paragraph>
          Homeowner(s) acknowledge that all insurance claim funds are trust funds held for payment of the Contractor for labor, services, and materials related to this project. Any misappropriation of these funds for purposes other than paying for the repairs described constitutes a violation of Maryland trust fund law and may result in civil and criminal liability.
        </Paragraph>
      </Section>

      <Section title="8. HOMEOWNER COOPERATION & NON-REVOCATION">
        <BulletList>
          <Bullet>Homeowner(s) agree to promptly forward any checks, claim documents, or correspondence received to Contractor.</Bullet>
          <Bullet>This Agreement survives cancellation of the main work contract unless the Contractor has been paid in full for all work performed and materials provided.</Bullet>
          <Bullet>Homeowner(s) may not revoke this Direction of Pay or Assignment without the Contractor's written consent once work has commenced.</Bullet>
        </BulletList>
      </Section>

      <Section title="9. SCOPE OF WORK COMMITMENT">
        <Paragraph>
          The parties acknowledge the insurance scope may not be finalized at signing. Contractor agrees to complete all work in accordance with the approved insurance scope unless otherwise agreed in writing and will furnish the approved scope to the mortgage company upon receipt.
        </Paragraph>
      </Section>

      <Section title="10. SUPPLEMENTAL CLAIM PAYMENTS">
        <Paragraph>This Agreement applies to all claim payments related to the above loss, including:</Paragraph>
        <BulletList>
          <Bullet>Initial claim checks</Bullet>
          <Bullet>Depreciation/holdback releases</Bullet>
          <Bullet>Supplemental claim payments for additional damage or repairs</Bullet>
          <Bullet>Any additional payments resulting from disputes, appraisals, or legal action</Bullet>
        </BulletList>
      </Section>

      <hr style={{ margin: "20px 0", border: "none", borderTop: "1px solid #000" }} />

      <div style={styles.pageBreak}></div>

      <Section title="11. SIGNATURES">
        <div>Contractor Representative:</div>

        <InlineRow>
          <FieldInline label="Name" value={formData.contractorRepName} />
          <FieldInline label="Title" value={formData.contractorRepTitle} />
        </InlineRow>

        <SignatureBlock
          label="Contractor Signature"
          sig={formData.contractorSignatureDataURL}
          date={formData.contractorDate}
          printed={`${formData.contractorRepName} (${formData.contractorRepTitle})`}
        />

        <hr style={{ margin: "20px 0", border: "none", borderTop: "1px solid #000" }} />

        <div>Homeowner(s):</div>

        <SignatureBlock
          label="Homeowner 1 Signature"
          sig={formData.homeowner1SignatureDataURL}
          date={formData.homeowner1Date}
          printed={formData.homeowner1PrintedName}
        />

        {formData.homeowner2PrintedName && (
          <SignatureBlock
            label="Homeowner 2 Signature"
            sig={formData.homeowner2SignatureDataURL}
            date={formData.homeowner2Date}
            printed={formData.homeowner2PrintedName}
          />
        )}
      </Section>
    </div>
  );
}
