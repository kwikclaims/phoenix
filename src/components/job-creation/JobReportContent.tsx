import React from 'react';
import { JobProgress } from '../../types/Job';

interface JobReportContentProps {
  jobData: Partial<JobProgress>;
}

export const JobReportContent: React.FC<JobReportContentProps> = ({ jobData }) => {
  const Print = {
    root: {
      width: '8.5in',
      margin: '0 auto',
      padding: '1in',                 // 1" page margins
      boxSizing: 'border-box',
      background: '#fff',
      color: '#000',
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: '12px',
      lineHeight: 1.4,
      display: 'block',
      overflow: 'visible',
    },
    header: {
      width: '100%',
      textAlign: 'left' as const,
      marginBottom: 18,
    },
    titleH1: { margin: '6px 0 2px 0', fontWeight: 800, fontSize: '22px', letterSpacing: 0.5 },
    headerLine: { margin: 0, lineHeight: 1.6 },

    // page-break helper node
    pageBreak: {
      breakBefore: 'page' as const,
      pageBreakBefore: 'always' as const,
      height: 0,
      lineHeight: 0,
    },

    // section wrapper that prevents splitting + prevents top margin collapse
    section: {
      display: 'block',
      margin: '0 0 14px 0',
      paddingTop: 8,
      borderTop: '1px solid transparent',
      breakInside: 'avoid' as const,
      pageBreakInside: 'avoid' as const,
      WebkitColumnBreakInside: 'avoid' as const,
    },
    // keep the title row with the first lines of content
    titleRow: {
      breakAfter: 'avoid' as const,
      pageBreakAfter: 'avoid' as const,
      margin: 0,
    },
    sectionTitle: { margin: '0 0 6px 0', color: '#d71920', fontWeight: 800 },
    hr: { margin: '4px 0 10px 0', border: 0, borderTop: '1px solid #e6e6e6' },

    // simple 2- or 3-col grid
    grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 20px' },
    grid3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px 20px' },
    label: { fontWeight: 700 },
    muted: { fontStyle: 'italic', color: '#444' },

    footer: { width: '100%', textAlign: 'center' as const, marginTop: 24, color: '#666' }
  } as const;

  const formatDate = (dateString: string): string => {
    if (!dateString) return 'Not provided';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatValue = (value: any, fallback: string = 'Not provided'): string => {
    if (value === null || value === undefined || value === '') {
      return fallback;
    }
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    return String(value);
  };

  const getCurrentDate = (): string => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div id="job-report" style={Print.root}>
      <header style={Print.header}>
        <img 
          src="/phoenix-logo.svg"
          alt="Phoenix Logo" 
          style={{ display: 'block', margin: '0 auto 12px auto', maxHeight: 64 }}
        />
        <h1 style={Print.titleH1}>PHOENIX ROOFING & CONSTRUCTION SOLUTIONS</h1>
        <p style={Print.headerLine}>10334 Vista Meadow Way, Lanham, MD 20706</p>
        <p style={Print.headerLine}>Phone: (301) 450-9487 | MHIC #164678</p>
        <p style={{...Print.headerLine, fontWeight: 700}}>Insurance Claim Job Report</p>
        <hr style={{ margin: '16px 0', border: 'none', borderTop: '2px solid #d71920' }} />
      </header>

      {/* COMPREHENSIVE JOB REPORT */}
      <section style={Print.section}>
        <div style={Print.titleRow}>
          <h2 style={Print.sectionTitle}>COMPREHENSIVE JOB REPORT</h2>
          <hr style={Print.hr} />
        </div>
        <div style={Print.grid2}>
          <div><span style={Print.label}>Report Generated:</span> {getCurrentDate()}</div>
          <div><span style={Print.label}>Job ID:</span> {jobData.id || 'Pending Creation'}</div>
          <div><span style={Print.label}>Date of Loss:</span> {jobData.stormDate ? formatDate(jobData.stormDate) : 'Not provided'}</div>
          <div><span style={Print.label}>Claim Number:</span> {(jobData as any).claimInfo?.claimNumber || 'Not provided'}</div>
        </div>
      </section>

      {/* HOMEOWNER INFORMATION */}
      <section style={Print.section}>
        <div style={Print.titleRow}>
          <h2 style={Print.sectionTitle}>HOMEOWNER INFORMATION</h2>
          <hr style={Print.hr} />
        </div>
        <div style={Print.grid2}>
          <div><span style={Print.label}>First Name:</span> {formatValue(jobData.homeownerInfo?.firstName)}</div>
          <div><span style={Print.label}>Last Name:</span> {formatValue(jobData.homeownerInfo?.lastName)}</div>
          <div><span style={Print.label}>Email:</span> {formatValue(jobData.homeownerInfo?.email)}</div>
          <div><span style={Print.label}>Phone:</span> {formatValue(jobData.homeownerInfo?.phoneNumber)}</div>
          <div style={{ gridColumn: '1 / -1' }}><span style={Print.label}>Property Address:</span> {formatValue(jobData.homeownerInfo?.propertyAddress)}</div>
          <div><span style={Print.label}>City:</span> {formatValue(jobData.homeownerInfo?.city)}</div>
          <div><span style={Print.label}>State:</span> {formatValue(jobData.homeownerInfo?.state)}</div>
          <div><span style={Print.label}>ZIP Code:</span> {formatValue(jobData.homeownerInfo?.zipCode)}</div>
          <div><span style={Print.label}>Insurance Company:</span> {formatValue(jobData.homeownerInfo?.insuranceCompany)}</div>
          <div><span style={Print.label}>Roof Age (years):</span> {formatValue(jobData.homeownerInfo?.roofAge)}</div>
          <div><span style={Print.label}>Last Roof Access:</span> {formatValue(jobData.homeownerInfo?.lastRoofAccess)}</div>
          <div><span style={Print.label}>Years with Insurer:</span> {formatValue(jobData.homeownerInfo?.yearsWithInsurer)}</div>
        </div>

        <div style={{ marginTop: 12 }}>
          <div style={{ marginBottom: 8 }}>
            <span style={Print.label}>Previous Claims Details:</span>
            <div style={{ marginLeft: 16, marginTop: 4, fontStyle: jobData.homeownerInfo?.previousClaimsDetails ? 'normal' : 'italic' }}>
              {formatValue(jobData.homeownerInfo?.previousClaimsDetails, 'No previous claims reported')}
            </div>
          </div>
          <div style={{ marginBottom: 8 }}>
            <span style={Print.label}>Out-of-Pocket Payment Details:</span>
            <div style={{ marginLeft: 16, marginTop: 4, fontStyle: jobData.homeownerInfo?.paidOutOfPocketDetails ? 'normal' : 'italic' }}>
              {formatValue(jobData.homeownerInfo?.paidOutOfPocketDetails, 'No out-of-pocket payments reported')}
            </div>
          </div>
          <div style={{ marginBottom: 8 }}>
            <span style={Print.label}>Interior Damage, Leaks/Water Stains:</span>
            <div style={{ marginLeft: 16, marginTop: 4, fontStyle: jobData.homeownerInfo?.leakRooms ? 'normal' : 'italic' }}>
              {formatValue(jobData.homeownerInfo?.leakRooms, 'No interior damage, leaks or water stains reported')}
            </div>
          </div>
        </div>
      </section>

      {/* Force Representative to Page 2 */}
      <div className="html2pdf__page-break" style={Print.pageBreak} />

      {/* REPRESENTATIVE INFORMATION */}
      <section style={Print.section} id="rep-info">
        <div style={Print.titleRow}>
          <h2 style={Print.sectionTitle}>REPRESENTATIVE INFORMATION</h2>
          <hr style={Print.hr} />
        </div>
        
        <div style={{ marginBottom: 16 }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Property Details</h4>
          <div style={Print.grid3}>
            <div><span style={Print.label}>Roof Type:</span> {formatValue(jobData.representativeInfo?.roofType)}</div>
            <div><span style={Print.label}>Number of Stories:</span> {formatValue(jobData.representativeInfo?.numberOfStories)}</div>
            <div><span style={Print.label}>Roofing Layers:</span> {formatValue(jobData.representativeInfo?.roofingLayers)}</div>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Damage Assessment</h4>
          <div>
            <div style={{ marginBottom: 8 }}>
              <span style={Print.label}>Damage Details:</span>
              <div style={{ marginLeft: 16, marginTop: 4, fontStyle: jobData.representativeInfo?.hailDamageDetails ? 'normal' : 'italic' }}>
                {formatValue(jobData.representativeInfo?.hailDamageDetails, 'No damage reported')}
              </div>
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={Print.label}>Tree Damage Details:</span>
              <div style={{ marginLeft: 16, marginTop: 4, fontStyle: jobData.representativeInfo?.treeDamageDetails ? 'normal' : 'italic' }}>
                {formatValue(jobData.representativeInfo?.treeDamageDetails, 'No tree damage reported')}
              </div>
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={Print.label}>HVAC Damage Details:</span>
              <div style={{ marginLeft: 16, marginTop: 4, fontStyle: jobData.representativeInfo?.hvacDamageDetails ? 'normal' : 'italic' }}>
                {formatValue(jobData.representativeInfo?.hvacDamageDetails, 'No HVAC damage reported')}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Primary Representative</h4>
          <div style={Print.grid3}>
            <div><span style={Print.label}>Name:</span> {formatValue(jobData.representativeInfo?.primaryRepName)}</div>
            <div><span style={Print.label}>Email:</span> {formatValue(jobData.representativeInfo?.primaryRepEmail)}</div>
            <div><span style={Print.label}>Phone:</span> {formatValue(jobData.representativeInfo?.primaryRepPhone)}</div>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Second Representative</h4>
          <div style={Print.grid3}>
            <div><span style={Print.label}>Name:</span> {formatValue(jobData.representativeInfo?.secondRepName)}</div>
            <div><span style={Print.label}>Email:</span> {formatValue(jobData.representativeInfo?.secondRepEmail)}</div>
            <div><span style={Print.label}>Phone:</span> {formatValue(jobData.representativeInfo?.secondRepPhone)}</div>
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Additional Notes</h4>
          <div style={Print.muted as any}>
            {formatValue(jobData.representativeInfo?.additionalNotes, 'No additional notes provided')}
          </div>
        </div>
      </section>

      {/* STORM INFORMATION */}
      <section style={Print.section}>
        <div style={Print.titleRow}>
          <h2 style={Print.sectionTitle}>LOSS INFORMATION</h2>
          <hr style={Print.hr} />
        </div>
        <div style={Print.grid2}>
          <div><span style={Print.label}>Date of Loss:</span> {jobData.stormDate ? formatDate(jobData.stormDate) : 'Not provided'}</div>
          <div style={{ gridColumn: '1 / -1' }}>
            <span style={Print.label}>Loss Description:</span>
            <div style={{ marginLeft: 16, marginTop: 4, fontStyle: (jobData as any).stormDescription ? 'normal' : 'italic' }}>
              {formatValue((jobData as any).stormDescription, 'No loss description provided')}
            </div>
          </div>
        </div>
      </section>

      {/* CLAIM INFORMATION */}
      <section style={Print.section}>
        <div style={Print.titleRow}>
          <h2 style={Print.sectionTitle}>CLAIM INFORMATION</h2>
          <hr style={Print.hr} />
        </div>
        <div style={Print.grid2}>
          <div><span style={Print.label}>Claim Number:</span> {formatValue((jobData as any).claimInfo?.claimNumber)}</div>
          <div><span style={Print.label}>Adjuster Meeting Date:</span> {(jobData as any).claimInfo?.adjusterMeetingDate ? formatDate((jobData as any).claimInfo.adjusterMeetingDate) : 'Not provided'}</div>
          <div><span style={Print.label}>Adjuster First Name:</span> {formatValue((jobData as any).claimInfo?.adjusterFirstName)}</div>
          <div><span style={Print.label}>Adjuster Last Name:</span> {formatValue((jobData as any).claimInfo?.adjusterLastName)}</div>
          <div><span style={Print.label}>Adjuster Phone:</span> {formatValue((jobData as any).claimInfo?.adjusterPhone)}</div>
          <div><span style={Print.label}>Adjuster Extension:</span> {formatValue((jobData as any).claimInfo?.adjusterExt)}</div>
          <div style={{ gridColumn: '1 / -1' }}><span style={Print.label}>Adjuster Email:</span> {formatValue((jobData as any).claimInfo?.adjusterEmail)}</div>
          <div><span style={Print.label}>Ladder Assist Phone:</span> {formatValue((jobData as any).claimInfo?.ladderAssistPhone)}</div>
          <div><span style={Print.label}>Insurance Email:</span> {formatValue((jobData as any).claimInfo?.insuranceEmail)}</div>
          <div style={{ gridColumn: '1 / -1' }}>
            <span style={Print.label}>Insurance Portal Link:</span> 
            <div style={{ marginTop: 4, wordBreak: 'break-all' }}>
              {(jobData as any).claimInfo?.insurancePortalLink || 'Not provided'}
            </div>
          </div>
        </div>
      </section>

      {/* Force Cover Letter to Page 3 */}
      <div className="html2pdf__page-break" style={Print.pageBreak} />

      {/* Add 3 spaces before Cover Letter */}
      <div style={{ height: '3em' }}></div>

      {/* COVER LETTER */}
      <section style={Print.section} id="cover-letter">
        <div style={Print.titleRow}>
          <h2 style={Print.sectionTitle}>COVER LETTER</h2>
          <hr style={Print.hr} />
        </div>
        <div style={{ 
          padding: 12, 
          backgroundColor: '#f9f9f9', 
          border: '1px solid #ddd', 
          borderRadius: 4,
          fontStyle: jobData.coverLetter?.trim() ? 'normal' : 'italic'
        }}>
          {jobData.coverLetter?.trim() || 'No cover letter context provided'}
        </div>
        {jobData.coverLetter?.trim() && (
          <div style={{ fontSize: 10, color: '#666', marginTop: 8 }}>
            Character count: {jobData.coverLetter.length}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer style={Print.footer}>
        <p style={{ margin: '4px 0' }}>This report was generated on {getCurrentDate()}</p>
        <p style={{ margin: '4px 0' }}>Phoenix Roofing & Construction Solutions LLC | MHIC #164678</p>
        <p style={{ margin: '4px 0' }}>For questions about this report, contact us at (301) 450-9487</p>
      </footer>
    </div>
  );
};