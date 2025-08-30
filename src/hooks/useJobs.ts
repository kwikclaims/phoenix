import { useState, useEffect } from 'react';
import { Job, JobProgress, CompletedJob } from '../types/Job';
import { saveJobs, loadJobs, generateId } from '../utils/storage';

export const useJobs = (userId: string) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadedJobs = loadJobs().filter(job => job.userId === userId);
    setJobs(loadedJobs);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    if (!loading) {
      const allJobs = loadJobs();
      const otherUserJobs = allJobs.filter(job => job.userId !== userId);
      const userJobs = jobs;
      saveJobs([...otherUserJobs, ...userJobs]);
    }
  }, [jobs, loading, userId]);

  const createJobProgress = (): JobProgress => {
    const newJob: JobProgress = {
      id: generateId(),
      userId,
      createdAt: new Date().toISOString(),
      lastSaved: new Date().toISOString(),
      stage: '🟩 Stage 1 – Claim Setup',
      subStage: '',
      currentStep: 1,
      currentSubStage: '',
      homeownerInfo: {},
      representativeInfo: {},
      contractorInfo: {},
      stormDate: '',
      photos: [],
      coverLetter: '',
      repairabilityTestLink: '',
      isComplete: false,
      reportGenerated: false,
    };

    // Don't add to state immediately - return the job object
    // It will be added when the wizard completes or saves progress
    return newJob;
  };

  const updateJobProgress = (id: string, updates: Partial<JobProgress>): void => {
    setJobs(prev => {
      const existingJobIndex = prev.findIndex(job => job.id === id);
      
      if (existingJobIndex >= 0) {
        // Update existing job
        return prev.map(job => 
          job.id === id 
            ? { ...job, ...updates, lastSaved: new Date().toISOString() }
            : job
        );
      } else {
        // Job doesn't exist, add it (this handles the first save from the wizard)
        const newJob = {
          id,
          userId,
          createdAt: new Date().toISOString(),
          lastSaved: new Date().toISOString(),
          currentStep: 1,
          homeownerInfo: {},
          representativeInfo: {},
          contractorInfo: {},
          stormDate: '',
          photos: [],
          coverLetter: '',
          repairabilityTestLink: '',
          isComplete: false,
          reportGenerated: false,
          ...updates
        } as JobProgress;
        
        return [...prev, newJob];
      }
    });
  };

  const completeJob = (id: string, reportUrl: string): void => {
    setJobs(prev => prev.map(job => 
      job.id === id 
        ? { 
            ...job, 
            isComplete: true, 
            reportGenerated: true,
            completedAt: new Date().toISOString(),
            reportUrl 
          } as CompletedJob
        : job
    ));
  };

  const deleteJob = (id: string): void => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  const getJob = (id: string): Job | undefined => {
    return jobs.find(job => job.id === id);
  };

  const activeJobs = jobs.filter(job => !job.isComplete);
  const completedJobs = jobs.filter(job => job.isComplete) as CompletedJob[];
  const allJobs = jobs; // All jobs regardless of completion status

  return {
    jobs,
    activeJobs,
    completedJobs,
    allJobs,
    loading,
    createJobProgress,
    updateJobProgress,
    completeJob,
    deleteJob,
    getJob,
  };
};