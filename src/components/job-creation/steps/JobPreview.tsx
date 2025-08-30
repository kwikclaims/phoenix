import React from 'react';
import { FileText, CheckCircle, User, Building, Calendar, Phone, FileImage, TestTube, Ruler, DollarSign, Eye, Calculator, Printer } from 'lucide-react';
import { JobProgress } from '../../../types/Job';
import { JobReportContent } from '../JobReportContent';
import html2pdf from 'html2pdf.js';
import { toast } from 'sonner';

interface JobPreviewProps {
  jobData: Partial<JobProgress>;
  onCreateJob: () => void;
}

export const JobPreview: React.FC<JobPreviewProps> = ({ jobData, onCreateJob }) => {
  const sections = [
    {
      title: 'Homeowner Information',
      completed: !!(jobData.homeownerInfo?.firstName && jobData.homeownerInfo?.lastName),
      content: jobData.homeownerInfo?.firstName ? 
        `${jobData.homeownerInfo.firstName} ${jobData.homeownerInfo.lastName}` : 
        'Not provided'
    },
    {
      title: 'Representative Information',
      completed: !!(jobData.representativeInfo?.primaryRepName),
      content: jobData.representativeInfo?.primaryRepName || 'Not provided'
    },
    {
      title: 'Storm Date',
      completed: !!jobData.stormDate,
      content: jobData.stormDate ? new Date(jobData.stormDate).toLocaleDateString() : 'Not provided'
    },
    {
      title: 'Claim Information',
      completed: !!((jobData as any).claimInfo?.claimNumber),
      content: (jobData as any).claimInfo?.claimNumber ? `Claim #${(jobData as any).claimInfo.claimNumber}` : 'Not provided'
    },
    {
      title: 'Cover Letter',
      completed: !!(jobData.coverLetter?.trim()),
      content: jobData.coverLetter?.trim() ? 'Cover letter written' : 'Not provided'
    },
  ];

  const completedSections = sections.filter(section => section.completed).length;
  const completionPercentage = Math.round((completedSections / sections.length) * 100);

  const handlePrintReport = async () => {
    try {
      toast.info('Generating PDF report...');
      
      // Create a temporary container for the report
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '-9999px';
      document.body.appendChild(tempContainer);
      
      // Render the report content into the temporary container
      const { createRoot } = await import('react-dom/client');
      const root = createRoot(tempContainer);
      
      await new Promise<void>((resolve) => {
        root.render(
          <JobReportContent jobData={jobData} />
        );
        // Give React time to render
        setTimeout(resolve, 100);
      });
      
      // Generate PDF
      const reportElement = tempContainer.querySelector('#job-report');
      if (!reportElement) {
        throw new Error('Report content not found');
      }
      
      const customerName = jobData.homeownerInfo?.lastName || 'Customer';
      const claimNumber = (jobData as any).claimInfo?.claimNumber || 'Unknown';
      const currentDate = new Date().toISOString().split('T')[0];
      const filename = `${customerName}_${claimNumber}_PRCS_JobReport_${currentDate}.pdf`;
      
      const opt = {
        margin: [15, 15, 15, 15],
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff'
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'letter', 
          orientation: 'portrait' 
        },
        pagebreak: { mode: ['css', 'legacy'] },
      };

      await html2pdf()
        .set(opt)
        .from(reportElement)
        .save();
      
      toast.success('PDF report downloaded successfully!');
      
      // Cleanup
      root.unmount();
      document.body.removeChild(tempContainer);
      
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF report. Please try again.');
    }
  };

  const renderFieldValue = (value: any, fallback: string = 'Not provided') => {
    if (value === null || value === undefined || value === '') {
      return <span className="text-gray-500 italic">{fallback}</span>;
    }
    if (typeof value === 'boolean') {
      return <span className={value ? 'text-green-400' : 'text-gray-500'}>{value ? 'Yes' : 'No'}</span>;
    }
    return <span className="text-white font-medium">{value}</span>;
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-[#FF0000]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Job Preview & Creation</h2>
        <p className="text-gray-400">Review your claim details before creating the job</p>
      </div>

      {/* Completion Summary */}
      <div className="bg-[#FF0000]/10 border border-[#FF0000]/20 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-[#FF0000]">Mission Completion</h3>
          <span className="text-3xl font-bold text-[#FF0000]">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-4 mb-4">
          <div
            className="bg-gradient-to-r from-[#FF0000] to-[#C20F1F] h-4 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <p className="text-white">
          {completedSections} of {sections.length} sections completed
        </p>
      </div>

      {/* Detailed Job Preview */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white mb-6">📋 Complete Job Details Preview</h3>
        
        {/* Homeowner Information */}
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-[#FF0000]/10">
          <div className="flex items-center space-x-3 mb-6">
            <User className="w-6 h-6 text-[#FF0000]" />
            <h4 className="text-xl font-semibold text-white">Homeowner Information</h4>
          </div>
          
          <div className="space-y-6">
            {/* Basic Contact Info */}
            <div>
              <h5 className="text-lg font-medium text-[#FF0000] mb-4">Contact Information</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">First Name</p>
                  {renderFieldValue(jobData.homeownerInfo?.firstName)}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Last Name</p>
                  {renderFieldValue(jobData.homeownerInfo?.lastName)}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  {renderFieldValue(jobData.homeownerInfo?.email)}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone Number</p>
                  {renderFieldValue(jobData.homeownerInfo?.phoneNumber)}
                </div>
              </div>
            </div>

            {/* Property Information */}
            <div>
              <h5 className="text-lg font-medium text-[#FF0000] mb-4">Property Information</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <p className="text-gray-400 text-sm">Property Address</p>
                  {renderFieldValue(jobData.homeownerInfo?.propertyAddress)}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">City</p>
                  {renderFieldValue(jobData.homeownerInfo?.city)}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">State</p>
                  {renderFieldValue(jobData.homeownerInfo?.state)}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">ZIP Code</p>
                  {renderFieldValue(jobData.homeownerInfo?.zipCode)}
                </div>
              </div>
            </div>

            {/* Insurance & Roof Information */}
            <div>
              <h5 className="text-lg font-medium text-[#FF0000] mb-4">Insurance & Roof Information</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Insurance Company</p>
                  {renderFieldValue(jobData.homeownerInfo?.insuranceCompany)}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Age of Roof (years)</p>
                  {renderFieldValue(jobData.homeownerInfo?.roofAge)}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Last Time Someone Was on Roof</p>
                  {renderFieldValue(jobData.homeownerInfo?.lastRoofAccess)}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Years with Current Insurer</p>
                  {renderFieldValue(jobData.homeownerInfo?.yearsWithInsurer)}
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h5 className="text-lg font-medium text-[#FF0000] mb-4">Additional Information</h5>
              
              {/* Previous Claims */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <p className="text-gray-400 text-sm">Previous Claim Filed:</p>
                  {renderFieldValue(jobData.homeownerInfo?.previousClaims)}
                </div>
                {jobData.homeownerInfo?.previousClaims && (
                  <div className="bg-gray-900/50 rounded-xl p-4 ml-4">
                    <p className="text-gray-400 text-sm mb-2">Details:</p>
                    {renderFieldValue(jobData.homeownerInfo?.previousClaimsDetails, 'No details provided')}
                  </div>
                )}
              </div>

              {/* Out of Pocket Payments */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <p className="text-gray-400 text-sm">Paid Out-of-Pocket for Roof Repairs:</p>
                  {renderFieldValue(jobData.homeownerInfo?.paidOutOfPocket)}
                </div>
                {jobData.homeownerInfo?.paidOutOfPocket && (
                  <div className="bg-gray-900/50 rounded-xl p-4 ml-4">
                    <p className="text-gray-400 text-sm mb-2">Payment Details:</p>
                    {renderFieldValue(jobData.homeownerInfo?.paidOutOfPocketDetails, 'No details provided')}
                  </div>
                )}
              </div>

              {/* Active Leaks */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <p className="text-gray-400 text-sm">Interior Damage, Leaks or Water Stains:</p>
                  {renderFieldValue(jobData.homeownerInfo?.activeLeaks)}
                </div>
                {jobData.homeownerInfo?.activeLeaks && (
                  <div className="bg-gray-900/50 rounded-xl p-4 ml-4">
                    <p className="text-gray-400 text-sm mb-2">Which Rooms:</p>
                    {renderFieldValue(jobData.homeownerInfo?.leakRooms, 'No rooms specified')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Representative Information */}
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-[#FF0000]/10">
          <div className="flex items-center space-x-3 mb-6">
            <Building className="w-6 h-6 text-[#FF0000]" />
            <h4 className="text-xl font-semibold text-white">Representative Information</h4>
          </div>
          
          <div className="space-y-6">
            {/* Property Details */}
            <div>
              <h5 className="text-lg font-medium text-[#FF0000] mb-4">Property Details</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Type of Roof</p>
                  {renderFieldValue(jobData.representativeInfo?.roofType)}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Number of Stories</p>
                  {renderFieldValue(jobData.representativeInfo?.numberOfStories)}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Layers of Roofing</p>
                  {renderFieldValue(jobData.representativeInfo?.roofingLayers)}
                </div>
              </div>
            </div>

            {/* Damage Assessment */}
            <div>
              <h5 className="text-lg font-medium text-[#FF0000] mb-4">Damage Assessment</h5>
              
              {/* Damage */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <p className="text-gray-400 text-sm">Damage to Windows, Siding, Gutters:</p>
                  {renderFieldValue(jobData.representativeInfo?.hailDamage)}
                </div>
                {jobData.representativeInfo?.hailDamage && (
                  <div className="bg-gray-900/50 rounded-xl p-4 ml-4">
                    <p className="text-gray-400 text-sm mb-2">Damage Details:</p>
                    {renderFieldValue(jobData.representativeInfo?.hailDamageDetails, 'No details provided')}
                  </div>
                )}
              </div>

              {/* Tree Damage */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <p className="text-gray-400 text-sm">Tree Damage Present:</p>
                  {renderFieldValue(jobData.representativeInfo?.treeDamage)}
                </div>
                {jobData.representativeInfo?.treeDamage && (
                  <div className="bg-gray-900/50 rounded-xl p-4 ml-4">
                    <p className="text-gray-400 text-sm mb-2">Tree Damage Details:</p>
                    {renderFieldValue(jobData.representativeInfo?.treeDamageDetails, 'No details provided')}
                  </div>
                )}
              </div>

              {/* HVAC Damage */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <p className="text-gray-400 text-sm">HVAC Damage:</p>
                  {renderFieldValue(jobData.representativeInfo?.hvacDamage)}
                </div>
                {jobData.representativeInfo?.hvacDamage && (
                  <div className="bg-gray-900/50 rounded-xl p-4 ml-4">
                    <p className="text-gray-400 text-sm mb-2">HVAC Damage Details:</p>
                    {renderFieldValue(jobData.representativeInfo?.hvacDamageDetails, 'No details provided')}
                  </div>
                )}
              </div>
            </div>

            {/* Primary Representative */}
            <div>
              <h5 className="text-lg font-medium text-[#FF0000] mb-4">Primary Representative</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Name</p>
                  {renderFieldValue(jobData.representativeInfo?.primaryRepName)}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  {renderFieldValue(jobData.representativeInfo?.primaryRepEmail)}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  {renderFieldValue(jobData.representativeInfo?.primaryRepPhone)}
                </div>
              </div>
            </div>

            {/* Second Representative */}
            <div>
              <h5 className="text-lg font-medium text-[#FF0000] mb-4">Second Representative (Optional)</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Name</p>
                  {renderFieldValue(jobData.representativeInfo?.secondRepName)}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  {renderFieldValue(jobData.representativeInfo?.secondRepEmail)}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  {renderFieldValue(jobData.representativeInfo?.secondRepPhone)}
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <h5 className="text-lg font-medium text-[#FF0000] mb-4">Additional Notes/Context</h5>
              <div className="bg-gray-900/50 rounded-xl p-4">
                {renderFieldValue(jobData.representativeInfo?.additionalNotes, 'No additional notes provided')}
              </div>
            </div>
          </div>
        </div>

        {/* Storm Date */}
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-[#FF0000]/10">
          <div className="flex items-center space-x-3 mb-6">
            <Calendar className="w-6 h-6 text-[#FF0000]" />
            <h4 className="text-xl font-semibold text-white">Date of Loss</h4>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm">Date of Loss</p>
              <p className="text-white font-medium text-lg">
                {jobData.stormDate ? new Date(jobData.stormDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : <span className="text-gray-500 italic">Not provided</span>}
              </p>
            </div>
            
            <div>
              <p className="text-gray-400 text-sm">Loss Description</p>
              <div className="bg-gray-900/50 rounded-xl p-4">
                {renderFieldValue((jobData as any).stormDescription, 'No storm description provided')}
              </div>
            </div>
          </div>
        </div>

        {/* Claim Information */}
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-[#FF0000]/10">
          <div className="flex items-center space-x-3 mb-6">
            <Phone className="w-6 h-6 text-[#FF0000]" />
            <h4 className="text-xl font-semibold text-white">Claim Information</h4>
          </div>
          
          <div className="space-y-6">
            {/* Basic Claim Info */}
            <div>
              <h5 className="text-lg font-medium text-[#FF0000] mb-4">Claim Details</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Claim Number</p>
                  {renderFieldValue((jobData as any).claimInfo?.claimNumber)}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Adjuster Meeting Date</p>
                  {renderFieldValue(
                    (jobData as any).claimInfo?.adjusterMeetingDate 
                      ? new Date((jobData as any).claimInfo.adjusterMeetingDate).toLocaleDateString()
                      : null
                  )}
                </div>
              </div>
            </div>

            {/* Adjuster Information */}
            <div>
              <h5 className="text-lg font-medium text-[#FF0000] mb-4">Adjuster Information</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Adjuster First Name</p>
                  {renderFieldValue((jobData as any).claimInfo?.adjusterFirstName)}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Adjuster Last Name</p>
                  {renderFieldValue((jobData as any).claimInfo?.adjusterLastName)}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Adjuster Phone Number</p>
                  {renderFieldValue((jobData as any).claimInfo?.adjusterPhone)}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Adjuster Extension</p>
                  {renderFieldValue((jobData as any).claimInfo?.adjusterExt)}
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-400 text-sm">Adjuster Email</p>
                  {renderFieldValue((jobData as any).claimInfo?.adjusterEmail)}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h5 className="text-lg font-medium text-[#FF0000] mb-4">Contact Information</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Ladder Assist Phone Number</p>
                  {renderFieldValue((jobData as any).claimInfo?.ladderAssistPhone)}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Insurance Email</p>
                  {renderFieldValue((jobData as any).claimInfo?.insuranceEmail)}
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-400 text-sm">Insurance File Upload Portal Link</p>
                  <div className="bg-gray-900/50 rounded-xl p-4">
                    {(jobData as any).claimInfo?.insurancePortalLink ? (
                      <a 
                        href={(jobData as any).claimInfo.insurancePortalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF0000] hover:text-[#FF0000]/80 transition-colors underline break-all"
                      >
                        {(jobData as any).claimInfo.insurancePortalLink}
                      </a>
                    ) : (
                      <span className="text-gray-500 italic">No portal link provided</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cover Letter */}
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-[#FF0000]/10">
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="w-6 h-6 text-[#FF0000]" />
            <h4 className="text-xl font-semibold text-white">Cover Letter</h4>
          </div>
          
          <div>
            <p className="text-gray-400 text-sm mb-3">Cover Letter Context</p>
            <div className="bg-gray-900/50 rounded-xl p-4 min-h-[120px]">
              {jobData.coverLetter?.trim() ? (
                <div>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {jobData.coverLetter}
                  </p>
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <p className="text-[#FF0000] text-sm">
                      Character count: {jobData.coverLetter.length}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 italic">No cover letter context provided</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Job Button */}
      <div className="text-center pt-8">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            onClick={handlePrintReport}
            className="group flex items-center space-x-3 px-12 py-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:shadow-2xl hover:shadow-blue-600/25 transition-all duration-300 font-bold text-xl transform hover:scale-105"
          >
            <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <Printer className="w-5 h-5" />
            </div>
            <span>Print Report</span>
          </button>
        </div>
        
        <div className="mt-6 space-y-2">
          <p className="text-gray-400">
            Print a comprehensive report of all collected information.
          </p>
          <p className="text-sm text-gray-500">
            The report includes all homeowner details, representative information, claim data, photos, and signatures.
          </p>
        </div>
      </div>
    </div>
  );
};