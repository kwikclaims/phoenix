import React from 'react';
import { useNavigate } from 'react-router-dom';
import { JobProgress } from '../../types/Job';
import { JobFormWrapper } from './JobFormWrapper';
import { HomeownerQuestions } from './steps/HomeownerQuestions';
import { RepresentativeQuestions } from './steps/RepresentativeQuestions';
import { StormDate } from './steps/StormDate';
import { ClaimCall } from './steps/ClaimCall';
import { SignatureCapture } from './steps/SignatureCapture';
import { PhotoUpload } from './steps/PhotoUpload';
import { CoverLetter } from './steps/CoverLetter';
import { RepairabilityTest } from './steps/RepairabilityTest';
import { ItelTestUpload } from './steps/ItelTestUpload';
import { ReportReview } from './steps/ReportReview';

interface JobFormProps {
  job: JobProgress;
  onUpdate: (updates: Partial<JobProgress>) => void;
  onComplete: (reportUrl: string) => void;
  onBack?: () => void;
}

export const JobForm: React.FC<JobFormProps> = ({ job, onUpdate, onComplete, onBack }) => {
  const navigate = useNavigate();

  const steps = [
    { title: 'Homeowner Questions', component: 'homeowner' },
    { title: 'Representative Questions', component: 'representative' },
    { title: 'Storm Date', component: 'storm-date' },
    { title: 'Claim Call', component: 'claim-call' },
    { title: 'Representative Agreement', component: 'rep-signature' },
    { title: 'Direct Payment Agreement', component: 'payment-signature' },
    { title: 'Photo Upload', component: 'photos' },
    { title: 'Cover Letter', component: 'cover-letter' },
    { title: 'Repairability Test', component: 'repairability' },
    { title: 'ITEL Test Upload', component: 'itel-test' },
    { title: 'Report Review & Generation', component: 'review' },
  ];

  const currentStepData = steps[job.currentStep - 1];

  const handleSave = () => {
    onUpdate({ lastSaved: new Date().toISOString() });
  };

  const handleSkip = () => {
    const nextStep = Math.min(job.currentStep + 1, steps.length);
    onUpdate({ currentStep: nextStep });
  };

  const handleNext = () => {
    if (job.currentStep === steps.length) {
      // Generate report
      const reportUrl = `report-${job.id}.pdf`;
      onComplete(reportUrl);
      if (onBack) {
        onBack();
      } else {
        navigate('/');
      }
    } else {
      const nextStep = Math.min(job.currentStep + 1, steps.length);
      // If moving to the final step (Report Review), set to Stage 2, otherwise stay in Stage 1
      const jobStage = nextStep === steps.length ? 2 : 1;
      onUpdate({ currentStep: jobStage });
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/');
    }
  };

  const canProceed = () => {
    // Always allow proceeding since steps can be skipped
    return true;
  };

  const renderStepContent = () => {
    switch (currentStepData.component) {
      case 'homeowner':
        return (
          <HomeownerQuestions
            data={job.homeownerInfo}
            onChange={(updates) => onUpdate({ homeownerInfo: { ...job.homeownerInfo, ...updates } })}
          />
        );
      case 'representative':
        return (
          <RepresentativeQuestions
            data={job.representativeInfo}
            onChange={(updates) => onUpdate({ representativeInfo: { ...job.representativeInfo, ...updates } })}
          />
        );
      case 'storm-date':
        return (
          <StormDate
            stormDate={job.stormDate}
            onChange={(stormDate) => onUpdate({ stormDate })}
          />
        );
      case 'claim-call':
        return (
          <ClaimCall
            callRecording={job.callRecording}
            onChange={(callRecording) => onUpdate({ callRecording })} // This prop is still required by the interface, but will be removed from ClaimCall.tsx
          />
        );
      case 'rep-signature':
        return (
          <SignatureCapture
            title="Representative Agreement"
            description="Please review and sign the representative agreement. This authorizes us to act on your behalf in dealing with your insurance company regarding this claim."
            signature={job.representativeSignature}
            onChange={(representativeSignature) => onUpdate({ representativeSignature })}
          />
        );
      case 'payment-signature':
        return (
          <SignatureCapture
            title="Direct Payment Agreement"
            description="Please review and sign the direct payment agreement. This authorizes the insurance company to pay us directly for approved claim work."
            signature={job.paymentSignature}
            onChange={(paymentSignature) => onUpdate({ paymentSignature })}
          />
        );
      case 'photos':
        return (
          <PhotoUpload
            photos={job.photos}
            onChange={(photos) => onUpdate({ photos })}
          />
        );
      case 'cover-letter':
        return (
          <CoverLetter
            coverLetter={job.coverLetter}
            onChange={(coverLetter) => onUpdate({ coverLetter })}
          />
        );
      case 'repairability':
        return (
          <RepairabilityTest
            repairabilityTestLink={job.repairabilityTestLink}
            onChange={(repairabilityTestLink) => onUpdate({ repairabilityTestLink })}
          />
        );
      case 'itel-test':
        return (
          <ItelTestUpload
            itelTestFile={job.itelTestFile}
            onChange={(itelTestFile) => onUpdate({ itelTestFile })}
          />
        );
      case 'review':
        return (
          <ReportReview
            job={job}
            onGenerateReport={handleNext}
          />
        );
      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <JobFormWrapper
      job={job}
      onBack={handleBack}
      onSave={handleSave}
      onSkip={handleSkip}
      onNext={handleNext}
      canProceed={canProceed()}
      title={currentStepData.title}
      stepNumber={job.currentStep}
      totalSteps={steps.length}
    >
      {renderStepContent()}
    </JobFormWrapper>
  );
};