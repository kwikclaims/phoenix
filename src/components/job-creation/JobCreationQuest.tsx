import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight, Save, SkipForward, Zap, Trophy, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { JobProgress } from '../../types/Job';
import { HomeownerQuestions } from './steps/HomeownerQuestions';
import { RepresentativeQuestions } from './steps/RepresentativeQuestions';
import { StormDate } from './steps/StormDate';
import { ClaimCall } from './steps/ClaimCall';
import { SignatureCapture } from './steps/SignatureCapture';
import { PhotoUpload } from './steps/PhotoUpload';
import { CoverLetter } from './steps/CoverLetter';
import { RepairabilityTest } from './steps/RepairabilityTest';
import { FileUpload } from './steps/FileUpload';
import { EstimateUpload } from './steps/EstimateUpload';
import { JobPreview } from './steps/JobPreview';

interface JobCreationQuestProps {
  onJobCreated: () => void;
  onCancel: () => void;
  createJobProgress: () => JobProgress;
  updateJobProgress: (jobId: string, updates: Partial<JobProgress>) => void;
}

export const JobCreationQuest: React.FC<JobCreationQuestProps> = ({
  onJobCreated,
  onCancel,
  createJobProgress,
  updateJobProgress,
}) => {
  const [currentStage, setCurrentStage] = useState(1);
  const [currentJob, setCurrentJob] = useState<JobProgress | null>(null);
  const [savedProgress, setSavedProgress] = useState(false);

  const stages = [
    { id: 1, title: 'Homeowner Questions', component: 'homeowner', questions: 12 },
    { id: 2, title: 'Representative Questions', component: 'representative', questions: 15 },
    { id: 3, title: 'Storm Date', component: 'storm-date', questions: 1 },
    { id: 4, title: 'Claim Call', component: 'claim-call', questions: 1 },
    { id: 5, title: 'Cover Letter', component: 'cover-letter', questions: 1 },
    { id: 6, title: 'Job Preview & Create', component: 'preview', questions: 1 },
  ];

  const currentStageData = stages.find(s => s.id === currentStage)!;
  const progress = (currentStage / stages.length) * 100;
  const xpEarned = currentStage * 50;

  // Create job on first stage if not already created
  React.useEffect(() => {
    if (!currentJob) {
      const newJob = createJobProgress();
      setCurrentJob(newJob);
    }
  }, []);

  const handleSaveProgress = () => {
    if (currentJob) {
      // Update the job in the main jobs list
      updateJobProgress(currentJob.id, currentJob);
      setSavedProgress(true);
      setTimeout(() => setSavedProgress(false), 2000);
    }
  };

  const handleSkip = () => {
    if (currentStage < stages.length) {
      setCurrentStage(prev => prev + 1);
      // Auto-save when skipping
      if (currentJob) {
        updateJobProgress(currentJob.id, { ...currentJob, currentStep: currentStage + 1 });
      }
    }
  };

  const handleNext = () => {
    if (currentStage === stages.length) {
      // Final completion
      if (currentJob) {
        // Send job data to Google Sheets via webhook
        sendJobDataToSheet(currentJob);
        
        updateJobProgress(currentJob.id, { 
          ...currentJob, 
          currentStep: 1, // Job creation quest is always Stage 1 - Claim Setup
          lastSaved: new Date().toISOString()
        });
      }
      onJobCreated();
    } else {
      const nextStage = currentStage + 1;
      setCurrentStage(nextStage);
      // Auto-save progress when moving to next stage
      if (currentJob) {
        updateJobProgress(currentJob.id, { 
          ...currentJob, 
          currentStep: 1, // Job creation quest is always Stage 1 - Claim Setup
          lastSaved: new Date().toISOString()
        });
      }
    }
  };

  const sendJobDataToSheet = async (jobData: JobProgress) => {
    try {
      toast.info('Sending job data to Google Sheet...');
      
      // Prepare data payload for the webhook
      const payload = {
        jobId: jobData.id,
        createdAt: jobData.createdAt,
        lastSaved: jobData.lastSaved,
        stage: jobData.stage || '🟩 Stage 1 – Claim Setup',
        subStage: jobData.subStage || 'Job Created',
        
        // Homeowner Information
        firstName: jobData.homeownerInfo?.firstName || '',
        lastName: jobData.homeownerInfo?.lastName || '',
        email: jobData.homeownerInfo?.email || '',
        phoneNumber: jobData.homeownerInfo?.phoneNumber || '',
        propertyAddress: jobData.homeownerInfo?.propertyAddress || '',
        city: jobData.homeownerInfo?.city || '',
        state: jobData.homeownerInfo?.state || '',
        zipCode: jobData.homeownerInfo?.zipCode || '',
        insuranceCompany: jobData.homeownerInfo?.insuranceCompany || '',
        roofAge: jobData.homeownerInfo?.roofAge || '',
        lastRoofAccess: jobData.homeownerInfo?.lastRoofAccess || '',
        yearsWithInsurer: jobData.homeownerInfo?.yearsWithInsurer || '',
        previousClaims: jobData.homeownerInfo?.previousClaims || false,
        previousClaimsDetails: jobData.homeownerInfo?.previousClaimsDetails || '',
        paidOutOfPocket: jobData.homeownerInfo?.paidOutOfPocket || false,
        paidOutOfPocketDetails: jobData.homeownerInfo?.paidOutOfPocketDetails || '',
        activeLeaks: jobData.homeownerInfo?.activeLeaks || false,
        leakRooms: jobData.homeownerInfo?.leakRooms || '',
        
        // Representative Information
        roofType: jobData.representativeInfo?.roofType || '',
        numberOfStories: jobData.representativeInfo?.numberOfStories || '',
        roofingLayers: jobData.representativeInfo?.roofingLayers || '',
        hailDamage: jobData.representativeInfo?.hailDamage || false,
        hailDamageDetails: jobData.representativeInfo?.hailDamageDetails || '',
        treeDamage: jobData.representativeInfo?.treeDamage || false,
        treeDamageDetails: jobData.representativeInfo?.treeDamageDetails || '',
        hvacDamage: jobData.representativeInfo?.hvacDamage || false,
        hvacDamageDetails: jobData.representativeInfo?.hvacDamageDetails || '',
        primaryRepName: jobData.representativeInfo?.primaryRepName || '',
        primaryRepEmail: jobData.representativeInfo?.primaryRepEmail || '',
        primaryRepPhone: jobData.representativeInfo?.primaryRepPhone || '',
        secondRepName: jobData.representativeInfo?.secondRepName || '',
        secondRepEmail: jobData.representativeInfo?.secondRepEmail || '',
        secondRepPhone: jobData.representativeInfo?.secondRepPhone || '',
        additionalNotes: jobData.representativeInfo?.additionalNotes || '',
        
        // Storm and Claim Information
        stormDate: jobData.stormDate || '',
        stormDescription: (jobData as any).stormDescription || '',
        claimNumber: (jobData as any).claimInfo?.claimNumber || '',
        adjusterMeetingDate: (jobData as any).claimInfo?.adjusterMeetingDate || '',
        adjusterFirstName: (jobData as any).claimInfo?.adjusterFirstName || '',
        adjusterLastName: (jobData as any).claimInfo?.adjusterLastName || '',
        adjusterPhone: (jobData as any).claimInfo?.adjusterPhone || '',
        adjusterExt: (jobData as any).claimInfo?.adjusterExt || '',
        adjusterEmail: (jobData as any).claimInfo?.adjusterEmail || '',
        ladderAssistPhone: (jobData as any).claimInfo?.ladderAssistPhone || '',
        insuranceEmail: (jobData as any).claimInfo?.insuranceEmail || '',
        insurancePortalLink: (jobData as any).claimInfo?.insurancePortalLink || '',
        
        // Cover Letter
        coverLetter: jobData.coverLetter || '',
        
        // Repairability Test
        repairabilityTestLink: jobData.repairabilityTestLink || '',
        
        // File Information
        mortgageCompany: jobData.mortgageCompany || '',
        contractorName: jobData.contractorName || '',
        
        // File uploads (just indicate presence, not full file data)
        hasMortgageAuthFile: !!jobData.mortgageAuthFile,
        mortgageAuthFileName: jobData.mortgageAuthFile?.filename || '',
        hasPolicyFile: !!jobData.policyFile,
        policyFileName: jobData.policyFile?.filename || '',
        hasCallRecording: !!jobData.callRecording,
        callTranscription: jobData.callRecording?.transcription || '',
        hasItelTestFile: !!jobData.itelTestFile,
        itelTestFileName: jobData.itelTestFile?.filename || '',
        hasItelTestFiles: !!(jobData.itelTestFiles && jobData.itelTestFiles.length > 0),
        itelTestFilesCount: jobData.itelTestFiles?.length || 0,
        hasHoverFiles: !!(jobData.hoverFiles && jobData.hoverFiles.length > 0),
        hoverFilesCount: jobData.hoverFiles?.length || 0,
        hasRoomScanFiles: !!(jobData.roomScanFiles && jobData.roomScanFiles.length > 0),
        roomScanFilesCount: jobData.roomScanFiles?.length || 0,
        hasPolycamFiles: !!(jobData.polycamFiles && jobData.polycamFiles.length > 0),
        polycamFilesCount: jobData.polycamFiles?.length || 0,
        hasMiscFiles: !!(jobData.miscFiles && jobData.miscFiles.length > 0),
        miscFilesCount: jobData.miscFiles?.length || 0,
        hasEstimateFiles: !!(jobData.estimateFiles && jobData.estimateFiles.length > 0),
        estimateFilesCount: jobData.estimateFiles?.length || 0,
        
        // Financial Information (if available)
        totalAmountCustomerPaying: jobData.financial?.totalAmountCustomerPaying || 0,
        exteriorTotal: jobData.financial?.exteriorTotal || 0,
        interiorTotal: jobData.financial?.interiorTotal || 0,
        supplement: jobData.financial?.supplement || 0,
        supplementItems: jobData.financial?.supplementItems || '',
        clientExtraCost: jobData.financial?.clientExtraCost || 0,
        extraCostItems: jobData.financial?.extraCostItems || '',
        firstPayment: jobData.financial?.firstPayment || 0,
        secondPayment: jobData.financial?.secondPayment || 0,
        thirdPayment: jobData.financial?.thirdPayment || 0,
        fourthPayment: jobData.financial?.fourthPayment || 0,
        companyLossesTotal: jobData.financial?.companyLossesTotal || 0,
        lossExplanation: jobData.financial?.lossExplanation || '',
        
        // Job Status Information
        currentStep: jobData.currentStep || 1,
        isComplete: jobData.isComplete || false,
        reportGenerated: jobData.reportGenerated || false,
        
        // Additional metadata
        photoCount: jobData.photos?.length || 0,
        exteriorPhotoCount: jobData.photos?.filter(p => p.category === 'exterior').length || 0,
        interiorPhotoCount: jobData.photos?.filter(p => p.category === 'interior').length || 0,
        photosWithArrows: jobData.photos?.filter(p => p.arrow).length || 0,
        hasRepSignature: !!jobData.representativeSignature,
        hasPaymentSignature: !!jobData.paymentSignature,
        
        // Timestamps for tracking
        submittedToZapier: new Date().toISOString(),
      };

      // Simulate successful job creation without webhook
      toast.success('Job created successfully! 📊');
      console.log('✅ Job data prepared for creation:', payload);
    } catch (error) {
      console.error('❌ Error preparing job data:', error);
      toast.error('Error creating job.');
    }
  };

  const handleBack = () => {
    if (currentStage > 1) {
      setCurrentStage(prev => prev - 1);
    }
  };

  const updateJobData = (updates: Partial<JobProgress>) => {
    if (currentJob) {
      const updatedJob = { ...currentJob, ...updates, lastSaved: new Date().toISOString() };
      setCurrentJob(updatedJob);
      // Auto-save to Projects immediately when data changes
      updateJobProgress(currentJob.id, updatedJob);
    }
  };

  const renderStageContent = () => {
    if (!currentJob) return <div>Loading...</div>;

    switch (currentStageData.component) {
      case 'homeowner':
        return (
          <HomeownerQuestions
            data={currentJob.homeownerInfo || {}}
            onChange={(updates) => updateJobData({ homeownerInfo: { ...currentJob.homeownerInfo, ...updates } })}
          />
        );
      case 'representative':
        return (
          <RepresentativeQuestions
            data={currentJob.representativeInfo || {}}
            onChange={(updates) => updateJobData({ representativeInfo: { ...currentJob.representativeInfo, ...updates } })}
          />
        );
      case 'storm-date':
        return (
          <StormDate
            stormDate={currentJob.stormDate || ''}
            onChange={(stormDate) => updateJobData({ stormDate })}
            stormDescription={(currentJob as any).stormDescription || ''}
            onDescriptionChange={(stormDescription) => updateJobData({ stormDescription } as any)}
          />
        );
      case 'claim-call':
        return (
          <ClaimCall
            claimInfo={(currentJob as any).claimInfo}
            onChange={(callRecording) => updateJobData({ callRecording })}
            onClaimInfoChange={(claimInfo) => updateJobData({ claimInfo } as any)}
          />
        );
      case 'cover-letter':
        return (
          <CoverLetter
            coverLetter={currentJob.coverLetter || ''}
            onChange={(coverLetter) => updateJobData({ coverLetter })}
          />
        );
      case 'preview':
        return (
          <JobPreview
            jobData={currentJob}
            onCreateJob={handleNext}
          />
        );
      default:
        return <div>Stage not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF0000]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FF0000]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative bg-black/90 backdrop-blur-xl border-b border-[#FF0000]/20 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={onCancel}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">{currentStageData.title}</h1>
                <p className="text-sm text-gray-400">Stage {currentStage} of {stages.length}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-[#FF0000]">
                <Trophy className="w-5 h-5" />
                <span className="font-semibold">+{xpEarned} XP</span>
              </div>
              <button
                onClick={handleSaveProgress}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  savedProgress 
                    ? 'bg-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/30' 
                    : 'text-gray-400 border border-gray-600 hover:border-[#FF0000]/50 hover:text-[#FF0000]'
                }`}
              >
                <Save className="w-4 h-4" />
                <span>{savedProgress ? 'Auto-Saved!' : 'Auto-Save On'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative bg-black/50 backdrop-blur-xl border-b border-[#FF0000]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Mission Progress</span>
            <span className="text-sm text-[#FF0000] font-semibold">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FF0000] to-[#C20F1F] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
        <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-4 sm:p-6 md:p-8 border border-[#FF0000]/20 overflow-hidden">
          {renderStageContent()}
        </div>
      </div>

      {/* Footer */}
      <div className="relative bg-black/90 backdrop-blur-xl border-t border-[#FF0000]/20 sticky bottom-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStage === 1}
              className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleSkip}
              className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-[#FF0000] transition-colors"
            >
              <SkipForward className="w-4 h-4" />
              <span>Skip Stage</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#FF0000] to-[#C20F1F] text-white rounded-xl hover:shadow-lg hover:shadow-[#FF0000]/25 transition-all duration-300 font-semibold transform hover:scale-105"
            >
              <span>Next Stage</span>
              {currentStage < stages.length && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};